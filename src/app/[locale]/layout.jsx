import "../globals.css";
import "react-phone-number-input/style.css";
import { cn } from "lib/utils";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "components/ui/sonner";
import { fontVariables } from "../fonts";
import { auth } from "app/auth";
import Navbar from "shared/Navbar";
import Footer from "shared/Footer";
import initTranslations from "lib/i18n";
import RootProvider from "providers/Root.provider";
import TranslationsProvider from "providers/Translations.provider";
export { generateMetadata, viewport } from "./metadata";
import { GoogleAnalytics } from "@next/third-parties/google";
import { YandexMetricaProvider } from "next-yandex-metrica";
import { signOut } from "next-auth/react";
import { DELETION_PREFIX } from "utils/config.global";

export default async function RootLayout({ children, params }) {
  const session = await auth();
  const { locale } = await params;
  const { resources } = await initTranslations(locale);
  const userId = session?.user?.id;

  // eslint-disable-next-line no-undef
  const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL;
  let themePath;

  if (session?.user?.user_theme_id && userId) {
    themePath = `/user/${userId}/user.css`;
  } else if (session?.user?.theme_id) {
    themePath = `/theme/${session.user.theme_id}.css`;
  } else {
    themePath = `/theme/ALL.css`;
  }
  const themeURL = `${staticBaseUrl}${themePath}`;

  const userPhone = session?.user?.phone || "";
  if (userPhone && userPhone.startsWith(DELETION_PREFIX)) {
    await signOut({ redirect: true });
  }
  return (
    <>
      <Toaster />
      <ViewTransitions>
        <html lang={locale} dir={"ltr"} suppressHydrationWarning>
          <head>
            <link rel="stylesheet" href={themeURL} />
          </head>
          <body
            className={cn(
              "bg-background text-foreground min-h-svh scroll-smooth font-sans antialiased lg:min-h-screen",
              fontVariables,
            )}
          >
            <YandexMetricaProvider
              // eslint-disable-next-line no-undef
              tagID={process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || ""}
              initParameters={{
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                ecommerce: "dataLayer",
                webvisor: true,
              }}
              router="app"
            >
              <TranslationsProvider locale={locale} resources={resources}>
                <RootProvider>
                  <Navbar />
                  {children}
                  <Footer />
                </RootProvider>
              </TranslationsProvider>
            </YandexMetricaProvider>
          </body>
          <GoogleAnalytics
            // eslint-disable-next-line no-undef
            gaId={process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ""}
          />
        </html>
      </ViewTransitions>
    </>
  );
}
