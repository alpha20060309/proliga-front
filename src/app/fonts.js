import {
  Inter,
  Roboto,
  Open_Sans,
  Poppins,
  Montserrat,
  DM_Sans,
  IBM_Plex_Sans,
  Nunito,
  Merriweather,
  Playfair_Display,
  Lora,
  Source_Serif_4,
  Libre_Baskerville,
  Space_Grotesk,
  PT_Serif,
  JetBrains_Mono,
  IBM_Plex_Mono,
  Roboto_Mono,
  Space_Mono,
  Outfit,
  Lato,
  Barlow
} from 'next/font/google';

// Load fonts with subsets
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const plusJakartaSans = Poppins({ // Using Poppins as fallback
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

export const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export const sourceSerifPro = Source_Serif_4({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-serif-pro',
});

export const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-serif',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const firaMono = JetBrains_Mono({ // Using JetBrains as fallback
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const sourceCodePro = Source_Serif_4({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-code-pro',
});

export const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-mono',
});

export const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-barlow',
});

// Combine all font variables for use in layout
export const fontVariables = [
  inter.variable,
  roboto.variable,
  openSans.variable,
  poppins.variable,
  montserrat.variable,
  outfit.variable,
  plusJakartaSans.variable,
  dmSans.variable,
  ibmPlexSans.variable,
  nunito.variable,
  merriweather.variable,
  playfairDisplay.variable,
  lora.variable,
  sourceSerifPro.variable,
  libreBaskerville.variable,
  spaceGrotesk.variable,
  ptSerif.variable,
  jetbrainsMono.variable,
  firaMono.variable,
  sourceCodePro.variable,
  ibmPlexMono.variable,
  robotoMono.variable,
  spaceMono.variable,
  lato.variable,
  barlow.variable,
].join(' '); 