import { Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material'

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    slotProps={{
      indicator: {
        ...props.slotProps?.indicator,
        style: {
          ...props.slotProps?.indicator?.style,
          backgroundColor: 'var(--color-primary)',
        },
      },
    }}
  />
))({})

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    minWidth: 0,
    letterSpacing: 'var(--letter-spacing)',
    padding: 0,
    overflow: 'unset',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-foreground)',
    '&.Mui-selected': {
      backgroundColor: 'rgb(from var(--color-foreground) r g b / 0.1)',
      borderRadius: 'var(--radius-sm)',
    },
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  })
)
