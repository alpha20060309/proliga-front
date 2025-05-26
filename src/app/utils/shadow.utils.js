export const SHADOW_KEYS = [
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y',
]

export const DEFAULT_VALUES = {
  'shadow-color': '0, 0%, 30%',
  'shadow-opacity': '0.08',
  'shadow-blur': '3px',
  'shadow-spread': '0px',
  'shadow-offset-x': '0px',
  'shadow-offset-y': '1px',
}

export const UNITS = {
  'shadow-blur': 'px',
  'shadow-spread': 'px',
  'shadow-offset-x': 'px',
  'shadow-offset-y': 'px',
}

export const SHADOW_VARIANTS = [
  { name: '2xs', multiplier: 0.5 },
  { name: 'xs', multiplier: 0.75 },
  { name: 'sm', multiplier: 1 },
  { name: '', multiplier: 1.25 },
  { name: 'md', multiplier: 1.5 },
  { name: 'lg', multiplier: 2 },
  { name: 'xl', multiplier: 2.5 },
  { name: '2xl', multiplier: 3 },
]


export const hexToHsl = (hex) => {
  const [r, g, b] =
    hex.length === 4
      ? [hex[1] + hex[1], hex[2] + hex[2], hex[3] + hex[3]].map(
        (x) => parseInt(x, 16) / 255
      )
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(
        (x) => parseInt(x, 16) / 255
      )
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  const l = (max + min) / 2
  const s =
    max === min
      ? 0
      : l > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min)
  const h =
    max === min
      ? 0
      : max === r
        ? ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60
        : max === g
          ? ((b - r) / (max - min) + 2) * 60
          : ((r - g) / (max - min) + 4) * 60
  return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}

export const updateShadows = (values) => {
  const {
    'shadow-offset-x': x,
    'shadow-offset-y': y,
    'shadow-blur': blur,
    'shadow-spread': spread,
    'shadow-color': color,
    'shadow-opacity': opacity,
  } = Object.fromEntries(
    Object.entries(DEFAULT_VALUES).map(([k, v]) => [k, values[k] || v])
  )

  SHADOW_VARIANTS.forEach(({ name, multiplier }) => {
    const varName = `--shadow${name ? '-' + name : ''}`

    // Apply multiplier to numeric values
    const xNum = parseFloat(x)
    const yNum = parseFloat(y)
    const blurNum = parseFloat(blur)
    const spreadNum = parseFloat(spread)
    const opacityNum = parseFloat(opacity)

    // Round to 2 decimal places
    const roundToTwo = (num) => Math.round(num * 100) / 100

    const finalX = `${roundToTwo(xNum * multiplier)}px`
    const finalY = `${roundToTwo(yNum * multiplier)}px`
    const finalBlur = `${roundToTwo(blurNum * multiplier)}px`
    const finalSpread = `${roundToTwo(spreadNum * multiplier)}px`
    // Opacity can be more precise, but rounding if desired:
    // const finalOpacity = roundToTwo(Math.max(0, Math.min(1, opacityNum * multiplier))) 
    const finalOpacity = Math.max(0, Math.min(1, opacityNum * multiplier))


    const base = `${finalX} ${finalY} ${finalBlur} ${finalSpread}`

    document.documentElement.style.setProperty(
      varName,
      `${base} hsla(${color}, ${finalOpacity})`
    )
  })
}