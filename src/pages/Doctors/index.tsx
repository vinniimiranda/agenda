import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, createStyles, Theme, useTheme, IconButton, CircularProgress, Select, MenuItem } from '@material-ui/core'
import { Add, EditOutlined } from '@material-ui/icons'

const Doctors: React.FC = () => {
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
        }}>Doutores</h1>
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
          <InputLabel >CRM</InputLabel>
          <OutlinedInput label="CRM" />
        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Especialidade</InputLabel>
          <Select label="Especialidade">
            <MenuItem value={10}>Ortodontia</MenuItem>
            <MenuItem value={20}>Cirurgia</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    <Box display="flex" justifyContent="flex-end" margin="1rem 0">
      <Box margin="0 .5rem">
        <Button variant="contained" color="secondary">Limpar</Button>
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
                  <StyledTableCell align="center" >CRM</StyledTableCell>
                  <StyledTableCell align="center" >Especialidade</StyledTableCell>
                  <StyledTableCell align="center" >E-mail</StyledTableCell>
                  <StyledTableCell align="center" >Status</StyledTableCell>
                  <StyledTableCell align="center" >Editar</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {[1, 3, 2, 4, 6, 8, 10].map(app => (
                  <StyledTableRow key={app} >
                    <StyledTableCell align="center" >Dra. Daniela</StyledTableCell>
                    <StyledTableCell align="center" >600058-SP</StyledTableCell>
                    <StyledTableCell align="center" >Ortodontia</StyledTableCell>
                    <StyledTableCell align="center" >daniela@med-agenda.com.br</StyledTableCell>
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

export default Doctors
