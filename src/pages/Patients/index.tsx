import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableBody, useTheme, IconButton, CircularProgress, TablePagination, InputAdornment } from '@material-ui/core'
import { Add, EditOutlined, Delete, Create } from '@material-ui/icons'
import { StyledTableCell, StyledTableRow } from '../../components/DataTable'

import FormPatient from './Form'
import useRequest from '../../hooks/useRequest'
import deleteRequest from '../../requests/deleteRequest'
import { useDispatch } from 'react-redux'
import { DebounceInput } from 'react-debounce-input'

export type Patient = {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  birth_date: string;
  document: string;
  status: boolean;
}
type Params = {
  page: number;
  limit: number;
  name?: string;
}

const Patients: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [params, setParams] = useState<Params>({ page: 1, limit: 10 })
  const [open, setOpen] = useState(false)
  const [patient, setPatient] = useState<Patient>()

  const { loading, data: patients, setReload, reload, total } = useRequest<Patient>({ url: 'patients', params })

  function handleOpen () {
    setOpen(true)
  }
  function handleClose () {
    setOpen(false)
  }

  function handleAddPatient () {
    setPatient(undefined)
    handleOpen()
  }

  function handleEditPatient (row: Patient) {
    setPatient(row)
    handleOpen()
  }

  function handleDeletePatient ({ id }: Patient) {
    deleteRequest({ url: 'patients', id, name: 'Paciente', setReload, dispatch })
  }

  function handleNameSearch (name: string) {
    setParams({ ...params, name })
  }

  function handleChangePage (page: number) {
    setParams({ ...params, page: page + 1 })
  }
  function handleChangeLimit (limit: number) {
    setParams({ ...params, limit })
  }

  useEffect(handleClose, [reload])

  return <Box display="flex" flexDirection="column" padding="2rem 0">
    <Box display="flex" justifyContent="space-between" alignItems="center" >
      <Box>
        <h1 style={{
          color: theme.palette.primary.main
        }}>Pacientes</h1>
      </Box>
      <Box>
        <Button startIcon={<Add />} color="primary" variant="contained" onClick={handleAddPatient}>Adicionar</Button>
      </Box>
    </Box>
    <Grid container spacing={1}>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Nome</InputLabel>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            placeholder="Filtar por nome"
            onChange={({ target }) => handleNameSearch(target.value)}
            element={({ ...props }) => <OutlinedInput
              {...props}
              startAdornment={<InputAdornment position="start"><Create color="primary" /></InputAdornment>}
              label="Nome"
              color="primary"
              name="name"
            />}
          />

        </FormControl>
      </Grid>

    </Grid>
    {/* <Box display="flex" justifyContent="flex-end" margin="1rem 0">
      <Box margin="0 .5rem">
        <Button variant="contained" color="secondary">Limpar</Button>
      </Box>
      <Box margin="0 0 0 .5rem">
        <Button color="primary" variant="contained">Pesquisar</Button>
      </Box>
    </Box> */}
    <Grid container>
      <Grid item xs={12}>
        {loading ? (<Box display="flex" justifyContent="center" alignItems="center" height="60vh">
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
                  <StyledTableCell align="center" >E-mail</StyledTableCell>
                  <StyledTableCell align="center" >Telefone</StyledTableCell>
                  <StyledTableCell align="center" >Convênio</StyledTableCell>
                  <StyledTableCell align="center" >Status</StyledTableCell>
                  <StyledTableCell align="center" >Editar</StyledTableCell>
                  <StyledTableCell align="center" >Remover</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {patients?.map(patient => (
                  <StyledTableRow key={patient.id} onDoubleClick={() => handleEditPatient(patient)} >
                    <StyledTableCell align="center" >{patient.name}</StyledTableCell>
                    <StyledTableCell align="center" >{patient.email}</StyledTableCell>
                    <StyledTableCell align="center" >{patient.phone}</StyledTableCell>
                    <StyledTableCell align="center" >Allianz</StyledTableCell>
                    <StyledTableCell align="center" >{patient.status ? 'Ativo' : 'Inativo'}</StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton color="secondary" style={{ padding: '.25rem' }} onClick={() => handleEditPatient(patient)}>
                        <EditOutlined />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton style={{ padding: '.25rem', color: '#c33' }} onClick={() => handleDeletePatient(patient)}>
                        <Delete />
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
    <TablePagination
      page={params.page - 1}
      count={total}
      rowsPerPage={params.limit}
      onChangePage={(_, page) => handleChangePage(page)}
      rowsPerPageOptions={[10, 20]}
      onChangeRowsPerPage={({ target }) => handleChangeLimit(Number(target.value))}
      labelDisplayedRows={({ from, to, count }) => `${from} de ${to} de ${count !== -1 ? count : to} registros`}
      labelRowsPerPage="Linhas por página"
      component="div" ></TablePagination>
    <FormPatient open={open} handleClose={handleClose} patient={patient} setReload={setReload} />
  </Box>
}

export default Patients
