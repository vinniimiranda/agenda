
import { withStyles, TableCell, Theme, createStyles, TableRow } from '@material-ui/core'
import { lighten, darken } from 'polished'

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
      borderBottom: 'none !important',
      '&:first-child': {
        borderTopLeftRadius: '.3rem',
        borderBottomLeftRadius: '.3rem'

      },
      '&:last-child': {
        borderTopRightRadius: '.3rem',
        borderBottomRightRadius: '.3rem'
      }

    },
    body: {

      fontSize: 14,

      borderBottom: 'none !important',

      '&:first-child': {
        borderTopLeftRadius: '.3rem',
        borderBottomLeftRadius: '.3rem'

      },
      '&:last-child': {
        borderTopRightRadius: '.3rem',
        borderBottomRightRadius: '.3rem'
      }

    }
  })
)(TableCell)

export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {

      backgroundColor: theme.palette.background.paper,

      '&:nth-of-type(odd)': {
        // backgroundColor: theme.palette.action.hover
      },
      '&:hover': {
        backgroundColor: theme.palette.type === 'dark' ? lighten('.10', theme.palette.background.paper) : darken('.10', theme.palette.background.paper),
        cursor: 'pointer'
      }

    }
  })
)(TableRow)
