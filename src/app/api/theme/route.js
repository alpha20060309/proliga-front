import { NextResponse } from "next/server";
import { kebabCase, isEmpty } from "lodash";
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

// Helper function to convert various case styles to kebab-case using lodash
function convertToKebabCase(key) {
  if (key.includes('-') && key.toLowerCase() === key) {
    return key;
  }
  return kebabCase(key);
}

function generateThemeCssVariables(themeConfigPart, themeType) {
  let cssString = "";

  if (!isEmpty(themeConfigPart?.colors)) {
    for (const [key, value] of Object.entries(themeConfigPart.colors)) {
      cssString += `  --${convertToKebabCase(key)}: ${value};\n`;
    }
  }

  if (!isEmpty(themeConfigPart?.global)) {
    const { borderRadius, letterSpacing, spacing } = themeConfigPart.global;
    if (borderRadius !== undefined) {
      cssString += `  --radius: ${borderRadius}rem;\n`;
    }
    if (letterSpacing !== undefined) {
      cssString += `  --letter-spacing: ${letterSpacing}em;\n`;
    }
    if (spacing !== undefined) {
      cssString += `  --spacing: ${spacing}rem;\n`;
    }
  }
  if (!isEmpty(themeConfigPart?.shadows)) {
    cssString += `  --shadow-blur: ${themeConfigPart.shadows["shadow-blur"]};\n`;
    cssString += `  --shadow-color: ${themeConfigPart.shadows["shadow-color"]};\n`;
    cssString += `  --shadow-spread: ${themeConfigPart.shadows["shadow-spread"]};\n`;
    cssString += `  --shadow-opacity: ${themeConfigPart.shadows["shadow-opacity"]};\n`;
    cssString += `  --shadow-offset-x: ${themeConfigPart.shadows["shadow-offset-x"]};\n`;
    cssString += `  --shadow-offset-y: ${themeConfigPart.shadows["shadow-offset-y"]};\n`;
  }

  if (!isEmpty(themeConfigPart?.font)) {
    cssString += `  --font-sans: ${themeConfigPart.font};\n`;
  }

  if (isEmpty(cssString)) return "";

  const selector = themeType === "dark" ? ":root.dark" : ":root";
  return `${selector} {\n${cssString}}\n`;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const lightThemeData = body.light_theme;
    const darkThemeData = body.dark_theme;

    let combinedCss = "";

    if (!isEmpty(lightThemeData)) {
      combinedCss += generateThemeCssVariables(lightThemeData, "light");
    }

    if (!isEmpty(darkThemeData)) {
      if (!isEmpty(combinedCss)) {
        combinedCss += "\n";
      }
      combinedCss += generateThemeCssVariables(darkThemeData, "dark");
    }

    if (isEmpty(combinedCss)) {
      return NextResponse.json(
        { error: "No theme data found in request to generate CSS" },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-undef
    const themeCssPath = path.join(process.cwd(), 'static', 'theme', 'ALL.css');
    await writeFile(themeCssPath, combinedCss, { flag: 'w' });

    return new Response(combinedCss, {
      status: 200,
      headers: {
        "Content-Type": "text/css",
      },
    });

  } catch (error) {
    console.error("Error processing theme transformation request:", error);
    return NextResponse.json(
      { error: "Invalid JSON payload or an unexpected server error occurred." },
      { status: error instanceof SyntaxError ? 400 : 500 }
    );
  }
}
