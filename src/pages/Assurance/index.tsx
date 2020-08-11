import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, createStyles, Theme, useTheme, IconButton, CircularProgress } from '@material-ui/core'
import { Add, EditOutlined } from '@material-ui/icons'

// import { Container } from './styles';

const Assurance: React.FC = () => {
  const theme = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500)
  }, [])

  const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
      head: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        borderBottom: 'none !important'
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

  const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
      root: {

        backgroundColor: theme.palette.background.paper,

        '&:nth-of-type(odd)': {
          // backgroundColor: theme.palette.action.hover
        },
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          cursor: 'pointer',
          '& td': {
            color: '#fff'
          }
        }

      }
    })
  )(TableRow)

  return <Box display="flex" flexDirection="column" padding="2rem 0">
    <Box display="flex" justifyContent="space-between" alignItems="center" >
      <Box>
        <h1 style={{
          color: theme.palette.primary.main
        }}>Convênios</h1>
      </Box>
      <Box>
        <Button startIcon={<Add />} color="primary" variant="contained">Adicionar</Button>
      </Box>
    </Box>
    <Grid container spacing={1}>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Nome</InputLabel>
          <OutlinedInput label="Nome" />
        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >CNPJ</InputLabel>
          <OutlinedInput label="CNPJ" />
        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Valido até</InputLabel>
          <OutlinedInput label="Valido até" />
        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Status</InputLabel>
          <OutlinedInput label="Status" />
        </FormControl>
      </Grid>
    </Grid>
    <Box display="flex" justifyContent="flex-end" margin="1rem 0">
      <Box margin="0 .5rem">
        <Button variant="contained" color="secondary"> Limpar</Button>
      </Box>
      <Box margin="0 0 0 .5rem">
        <Button color="primary" variant="contained">Pesquisar</Button>
      </Box>
    </Box>
    <Grid container>
      <Grid item xs={12}>
        {loading ? (<Box display="flex" justifyContent="center" alignItems="center" height="65vh">
          <CircularProgress color="primary" size="5rem" />
        </Box>) : (<Box width="100%">
          <TableContainer >
            <Table aria-label="caption table" style={{
              borderCollapse: 'separate',
              borderSpacing: '0 1rem',
              border: '0',
              borderColor: 'transparent',
              borderBottom: 'none !important',
              boxShadow: '0px 4px 20px rgba(0,0,0,.10)'
            }
            } >
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" >Nome</StyledTableCell>
                  <StyledTableCell align="center" >CNPJ</StyledTableCell>
                  <StyledTableCell align="center" >Válido até</StyledTableCell>
                  <StyledTableCell align="center" >Status</StyledTableCell>
                  <StyledTableCell align="center" >Editar</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {[1, 3, 2, 4, 6, 8, 10].map(app => (
                  <StyledTableRow key={app} >
                    <StyledTableCell align="center" >Allianz</StyledTableCell>
                    <StyledTableCell align="center" >3060909066040</StyledTableCell>
                    <StyledTableCell align="center" >11/08/2020</StyledTableCell>
                    <StyledTableCell align="center" >Ativo</StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton color="secondary" style={{ padding: '.25rem' }}>
                        <EditOutlined />
                      </IconButton>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>)}
      </Grid>
    </Grid>
  </Box>
}

export default Assurance
