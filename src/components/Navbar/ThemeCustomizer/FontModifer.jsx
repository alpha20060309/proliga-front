import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const fonts = {
  // Sans-serif fonts
  Inter: 'Inter, sans-serif',
  Roboto: 'Roboto, sans-serif',
  'Open Sans': 'Open Sans, sans-serif',
  Poppins: 'Poppins, sans-serif',
  Montserrat: 'Montserrat, sans-serif',
  Outfit: 'Outfit, sans-serif',
  'Plus Jakarta Sans': 'Plus Jakarta Sans, sans-serif',
  'DM Sans': 'DM Sans, sans-serif',
  'IBM Plex Sans': 'IBM Plex Sans, sans-serif',
  Nunito: 'Nunito, sans-serif',

  // Serif fonts
  Merriweather: 'Merriweather, serif',
  'Playfair Display': 'Playfair Display, serif',
  Lora: 'Lora, serif',
  'Source Serif Pro': 'Source Serif Pro, serif',
  'Libre Baskerville': 'Libre Baskerville, serif',
  'Space Grotesk': 'Space Grotesk, serif',
  'PT Serif': 'PT Serif, serif',

  // Monospace fonts
  'JetBrains Mono': 'JetBrains Mono, monospace',
  'Fira Code': 'Fira Code, monospace',
  'Source Code Pro': 'Source Code Pro, monospace',
  'IBM Plex Mono': 'IBM Plex Mono, monospace',
  'Roboto Mono': 'Roboto Mono, monospace',
  'Space Mono': 'Space Mono, monospace',
}

const FontModifier = () => {
  const [selectedFont, setSelectedFont] = useState('Inter')

  useEffect(() => {
    // Update the font on the root element
    document.documentElement.style.setProperty(
      '--font-sans',
      fonts[selectedFont]
    )

    // Force update CSS variables
    document.body.style.fontFamily = fonts[selectedFont]

    // Store the selection in localStorage for persistence
    localStorage.setItem('selectedFont', selectedFont)
  }, [selectedFont])

  // Load saved font preference on initial render
  useEffect(() => {
    const savedFont = localStorage.getItem('selectedFont')
    if (savedFont && fonts[savedFont]) {
      setSelectedFont(savedFont)
    }
  }, [])

  const handleFontChange = (font) => {
    setSelectedFont(font)
  }

  return (
    <Card className="w-full">
      <CardHeader className="py-2">
        <CardTitle className="text-base">Global Font Modifier</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="mb-3">
          <Label
            htmlFor="font-select"
            className="text-foreground text-lg font-medium dark:text-white"
          >
            Select Website Font
          </Label>
          <Select value={selectedFont} onValueChange={handleFontChange}>
            <SelectTrigger id="font-select" className="mt-2">
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(fonts).map((fontName) => (
                <SelectItem key={fontName} value={fontName}>
                  {fontName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default FontModifier
