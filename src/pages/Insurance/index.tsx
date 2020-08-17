import React from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableBody, useTheme, IconButton, CircularProgress } from '@material-ui/core'
import { Add, EditOutlined } from '@material-ui/icons'
import moment from 'moment'

import { StyledTableCell, StyledTableRow } from '../../components/DataTable'
import useRequest from '../../hooks/useRequest'

moment.locale('pt-BR')

type Insurance = {
  id: number;
  name: string;
  document: string;
  valid_thru: Date;
  status: boolean;
}

const Insurances: React.FC = () => {
  const theme = useTheme()
  const { loading, data: insurances } = useRequest<Insurance>({ url: 'insurances' })

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
                {insurances?.map(insurance => (
                  <StyledTableRow key={insurance.id} >
                    <StyledTableCell align="center" >{insurance.name}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.document}</StyledTableCell>
                    <StyledTableCell align="center" >{moment(insurance.valid_thru).format('DD/MM/YYYY')}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.status ? 'Ativo' : 'Inativo'}</StyledTableCell>
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

export default Insurances
