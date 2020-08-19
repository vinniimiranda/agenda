import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableBody, useTheme, IconButton, CircularProgress, Select, MenuItem, TablePagination, InputAdornment } from '@material-ui/core'
import { Add, EditOutlined, Delete, Create, Check, FilterList } from '@material-ui/icons'
import { StyledTableCell, StyledTableRow } from '../../components/DataTable'
import { DebounceInput } from 'react-debounce-input'
import * as FA from 'react-icons/fa'

import FormDoctor from './Form'
import useRequest from '../../hooks/useRequest'
import { useDispatch } from 'react-redux'
import deleteRequest from '../../requests/deleteRequest'

export type Doctor = {
  id: number;
  name: string;
  email: string;
  gender: string;
  phone: string;
  document: string;
  status: boolean;
}

type Params = {
  page: number;
  limit: number;
  name?: string;
  email?: string;
  status?: boolean;
}

const Doctors: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [params, setParams] = useState<Params>({ page: 1, limit: 10 })
  const [open, setOpen] = useState(false)
  const [doctor, setDoctor] = useState<Doctor>()
  const { loading, total, data: doctors, reload, setReload } = useRequest<Doctor>({ url: 'doctors', params })

  function handleOpen () {
    setOpen(true)
  }
  function handleClose () {
    setOpen(false)
  }

  function handleAddDoctor () {
    setDoctor(undefined)
    handleOpen()
  }

  function handleEditDoctor (row: Doctor) {
    setDoctor(row)
    handleOpen()
  }

  function handleDeleteDoctor ({ id }: Doctor) {
    deleteRequest({ url: 'doctors', id, name: 'Doutor(a)', setReload, dispatch })
  }

  function handleSearch (key: string, value: string) {
    setParams({ ...params, [key]: value })
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
        }}>Doutores</h1>
      </Box>
      <Box>
        <Button startIcon={<Add />} color="primary" variant="contained" onClick={handleAddDoctor}>Adicionar</Button>
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
            onChange={({ target }) => handleSearch('name', target.value)}
            element={({ ...props }) => <OutlinedInput {...props} startAdornment={<InputAdornment position="start"><Create style={{
              color: theme.palette.primary.main
            }} /></InputAdornment>} label="Nome"></OutlinedInput>}
          />
        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >CRO</InputLabel>
          <DebounceInput
            minLength={5}
            debounceTimeout={300}
            onChange={({ target }) => handleSearch('document', target.value)}
            element={({ ...props }) =>
              <OutlinedInput
                {...props}
                placeholder="Filtar por CRO"
                startAdornment={<InputAdornment position="start"><FA.FaUserMd style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                label="CRO" />}
          />
        </FormControl>
      </Grid>

      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            placeholder="Filtar por Especialidade"
          >Especialidade</InputLabel>
          <Select
            startAdornment={<InputAdornment position="start"><FilterList style={{
              color: theme.palette.primary.main
            }} /></InputAdornment>}
            label="Especialidade" color="primary"
            placeholder="Filtar por Especialidade"
            defaultValue={''}
            value={params.status}
            displayEmpty
            onChange={(e) => handleSearch('status', e.target.value as string)}
          >
            <MenuItem value="">Selecionar</MenuItem>
            <MenuItem value="1">Ortodontia</MenuItem>
            <MenuItem value="0">Cirurgia</MenuItem>
          </Select>

        </FormControl>
      </Grid>
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            placeholder="Filtar por Status"
          >Status</InputLabel>
          <Select
            startAdornment={<InputAdornment position="start"><Check style={{
              color: theme.palette.primary.main
            }} /></InputAdornment>}
            label="Status" color="primary"
            placeholder="Filtar por Status"
            defaultValue={''}
            value={params.status}
            displayEmpty
            onChange={(e) => handleSearch('status', e.target.value as string)}
          >
            <MenuItem value="">Selecionar</MenuItem>
            <MenuItem value="1">Ativo</MenuItem>
            <MenuItem value="0">Inativo</MenuItem>
          </Select>

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
                  <StyledTableCell align="center" >CRO</StyledTableCell>
                  <StyledTableCell align="center" >Especialidade</StyledTableCell>
                  <StyledTableCell align="center" >E-mail</StyledTableCell>
                  <StyledTableCell align="center" >Status</StyledTableCell>
                  <StyledTableCell align="center" >Editar</StyledTableCell>
                  <StyledTableCell align="center" >Remover</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {doctors?.map(doctor => (
                  <StyledTableRow key={doctor.id} onDoubleClick={() => handleEditDoctor(doctor)}>
                    <StyledTableCell align="center" >{doctor.name}</StyledTableCell>
                    <StyledTableCell align="center" >{doctor.document}</StyledTableCell>
                    <StyledTableCell align="center" >Ortodontia</StyledTableCell>
                    <StyledTableCell align="center" >{doctor.email}</StyledTableCell>
                    <StyledTableCell align="center" >{doctor.status ? 'Ativo' : 'Inativo'}</StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton color="secondary" style={{ padding: '.25rem' }} onClick={() => handleEditDoctor(doctor)}>
                        <EditOutlined />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton style={{ padding: '.25rem', color: '#c33' }} onClick={() => handleDeleteDoctor(doctor)}>
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
    <FormDoctor open={open} handleClose={handleClose} doctor={doctor} setReload={setReload} />
  </Box>
}

export default Doctors
