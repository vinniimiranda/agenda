import React, { useState, useEffect } from 'react'
import { Box, Button, Grid, FormControl, InputLabel, OutlinedInput, TableContainer, Table, TableHead, TableRow, TableBody, useTheme, IconButton, CircularProgress, Select, MenuItem, TablePagination, InputAdornment } from '@material-ui/core'
import { Add, EditOutlined, Delete, Create, Check, Business, CalendarToday } from '@material-ui/icons'
import { StyledTableCell, StyledTableRow } from '../../components/DataTable'
import { DebounceInput } from 'react-debounce-input'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import FormInsurance from './Form'
import useRequest from '../../hooks/useRequest'
import { useDispatch } from 'react-redux'
import deleteRequest from '../../requests/deleteRequest'

export type Insurance = {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  valid_thru: string;
  status: boolean;
}

type Params = {
  page: number;
  limit: number;
  name?: string;
  valid_thru?: string;
  email?: string;
  status?: boolean;
}

const Insurances: React.FC = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const [params, setParams] = useState<Params>({ page: 1, limit: 10 })
  const [open, setOpen] = useState(false)
  const [insurance, setInsurance] = useState<Insurance>()
  const { loading, total, data: insurances, reload, setReload } = useRequest<Insurance>({ url: 'insurances', params })

  function handleOpen () {
    setOpen(true)
  }
  function handleClose () {
    setOpen(false)
  }

  function handleAddInsurance () {
    setInsurance(undefined)
    handleOpen()
  }

  function handleEditInsurance (row: Insurance) {
    setInsurance(row)
    handleOpen()
  }

  function handleDeleteInsurance ({ id }: Insurance) {
    deleteRequest({ url: 'insurances', id, name: 'Convênio', setReload, dispatch })
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
        }}>Convênios</h1>
      </Box>
      <Box>
        <Button startIcon={<Add />} color="primary" variant="contained" onClick={handleAddInsurance}>Adicionar</Button>
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
          <InputLabel >CNPJ</InputLabel>
          <DebounceInput
            minLength={5}
            debounceTimeout={300}
            onChange={({ target }) => handleSearch('document', target.value)}
            element={({ ...props }) =>
              <OutlinedInput
                {...props}
                placeholder="Filtar por CNPJ"
                startAdornment={<InputAdornment position="start"><Business style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                label="CNPJ" />}
          />
        </FormControl>
      </Grid>

      <Grid item lg={3} md={4} sm={6} xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel >Valido até</InputLabel>
          <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-BR">
            <DatePicker
              label="Valido até"
              variant="dialog"
              value={params.valid_thru}
              inputVariant='outlined'
              format='DD/MM/YYYY'
              onError={() => null}
              onChange={date => handleSearch('valid_thru', date?.toDate() as any || '')}
              TextFieldComponent={({ ...props }: any) => <OutlinedInput
                {...props}
                label="Valido até"
                startAdornment={<InputAdornment position="start"><CalendarToday style={{
                  color: theme.palette.primary.main
                }} /></InputAdornment>} />}

            />
          </MuiPickersUtilsProvider>
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
                  <StyledTableCell align="center" >CNPJ</StyledTableCell>
                  <StyledTableCell align="center" >E-mail</StyledTableCell>
                  <StyledTableCell align="center" >Telefone</StyledTableCell>
                  <StyledTableCell align="center" >Validade</StyledTableCell>
                  <StyledTableCell align="center" >Status</StyledTableCell>
                  <StyledTableCell align="center" >Editar</StyledTableCell>
                  <StyledTableCell align="center" >Remover</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {insurances?.map(insurance => (
                  <StyledTableRow key={insurance.id} onDoubleClick={() => handleEditInsurance(insurance)}>
                    <StyledTableCell align="center" >{insurance.name}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.document}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.email}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.phone}</StyledTableCell>
                    <StyledTableCell align="center" >{moment(insurance.valid_thru).utcOffset(0).format('DD/MM/YYYY')}</StyledTableCell>
                    <StyledTableCell align="center" >{insurance.status ? 'Ativo' : 'Inativo'}</StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton color="secondary" style={{ padding: '.25rem' }} onClick={() => handleEditInsurance(insurance)}>
                        <EditOutlined />
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      <IconButton style={{ padding: '.25rem', color: '#c33' }} onClick={() => handleDeleteInsurance(insurance)}>
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
    <FormInsurance open={open} handleClose={handleClose} insurance={insurance} setReload={setReload} />
  </Box>
}

export default Insurances
