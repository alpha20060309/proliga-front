import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fonts } from 'app/utils/fonts.util'

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
    <Card className="w-full rounded-[4px] bg-[#232323] text-[#fff]">
      <CardHeader className="py-2">
        <CardTitle className="text-base">Global Font Modifier</CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <div className="mb-3">
          <select
            id="font-select"
            value={selectedFont}
            onChange={(e) => handleFontChange(e.target.value)}
            className="mt-2 w-full rounded-[4px] border border-[#333] bg-[#1a1a1a] px-3 py-2 text-sm text-[#fff] focus:border-[#666] focus:outline-none"
          >
            {Object.keys(fonts).map((fontName) => (
              <option key={fontName} value={fontName}>
                {fontName}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}

export default FontModifier
