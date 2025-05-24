import { Tab } from '@mui/material'
import { styled } from '@mui/material'
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(0),
    minWidth: 0,
    letterSpacing: 0.5,
    margin: theme.spacing(1, 0),
    padding: 0,
    overflow: 'unset',
    color: 'var(--color-foreground)',
    opacity: 0.7,
    '&.Mui-selected': {
      color: 'var(--color-foreground)',
      backgroundColor: 'var(--color-foreground)',
      opacity: 0.1,
      borderRadius: 'var(--radius-sm)',
      scrollSnapAlign: 'center',
    },
    '&.Mui-disabled': {
      color: 'var(--color-foreground)',
      opacity: 0.5,
    },
  })
)

export default StyledTab
