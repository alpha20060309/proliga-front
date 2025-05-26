import { Tabs, Tab } from '@mui/material'
import { styled } from '@mui/material'

export const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    style={{
      scrollSnapAlign: 'center',
    }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    borderRadius: '2px',
    backgroundColor: '#fff400',
  },
})

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(0),
    minWidth: 0,
    letterSpacing: 'var(--letter-spacing)',
    margin: theme.spacing(1, 0),
    padding: 0,
    overflow: 'unset',
    fontFamily: 'var(--font-sans)',
    color: 'var(--color-foreground)',
    '&.Mui-selected': {
      color: 'var(--color-accent-foreground)',
      backgroundColor: 'var(--color-secondary)',
      borderRadius: 'var(--radius-sm)',
    },
    '&.Mui-disabled': {
      color: 'var(--color-foreground)',
      opacity: 0.5,
    },
  })
)
