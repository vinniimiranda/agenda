import React, { useEffect } from 'react'
import { Box, Drawer, IconButton, Grid, FormControl, InputLabel, OutlinedInput, useTheme, Select, MenuItem, Button, InputAdornment } from '@material-ui/core'
import { Close, Mail, Create, Phone, Check, CalendarToday } from '@material-ui/icons'
import * as FA from 'react-icons/fa'
import { Patient } from '..'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import postRequest from '../../../requests/postRequest'
import { useDispatch } from 'react-redux'
import updateRequest from '../../../requests/updateRequest'

type Props = {
  open: boolean;
  handleClose: () => void;
  setReload: (state: any) => void;
  patient?: Patient;
}

const FormPatient: React.FC<Props> = ({ open, handleClose, patient, setReload }: Props) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const { register, handleSubmit, setValue, getValues, control } = useForm()
  function onSubmit (data) {
    if (patient) {
      updateRequest({ url: 'patients', id: patient.id, name: 'Paciente', data, setReload, dispatch })
    } else {
      postRequest({ url: 'patients', name: 'Paciente', data, setReload, dispatch })
    }
  }

  useEffect(() => {
    if (patient) {
      setValue('gender', patient.gender)
      setValue('status', patient.status)
      setValue('birth_date', moment(patient.birth_date).utcOffset(0))
    } else {
      setValue('gender', 'F')
      setValue('status', true)
      setValue('birth_date', moment())
    }
  }, [open, patient, setValue])

  React.useEffect(() => {
    register('gender', { required: true })
    register('status')
  }, [register])

  return <Box>
    <Drawer open={open} onClose={handleClose}>
      <Box width={theme.spacing(100)} padding="1rem" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" marginBottom="1rem">
          <IconButton
            onClick={handleClose}
          >
            <Close color="action" />
          </IconButton>
        </Box>
        <Box width="100%" >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Nome</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Create color="primary" /></InputAdornment>}
                    label="Nome"
                    color="primary"
                    name="name"
                    defaultValue={patient?.name}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >CPF</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><FA.FaUser style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                    label="CPF"
                    color="primary"
                    name="document"
                    defaultValue={patient?.document}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Email</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Mail color="primary" /></InputAdornment>}
                    label="Email"
                    color="primary"
                    name="email"
                    defaultValue={patient?.email}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Telefone</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Phone color="primary" /></InputAdornment>}
                    label="Telefone"
                    color="primary"
                    name="phone"
                    defaultValue={patient?.phone}
                    inputRef={register}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Data de Nascimento</InputLabel>
                  <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-BR">
                    <Controller
                      startAdornment={<InputAdornment position="start"><FA.FaTransgender style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                      as={<DatePicker
                        label="Data de Nascimento"
                        variant="dialog"
                        value={getValues('birth_date')}
                        inputVariant='outlined'
                        format='DD/MM/YYYY'
                        onError={() => null}
                        onChange={date => console.log('birth_date', date?.toDate())}
                        TextFieldComponent={({ ...props }: any) => <OutlinedInput
                          {...props}
                          label="Data de Nascimento"
                          startAdornment={<InputAdornment position="start"><CalendarToday color="primary" /></InputAdornment>} />}
                      />}
                      name="birth_date"
                      start
                      defaultValue={moment(patient?.birth_date).utcOffset(0)}
                      control={control}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Sexo</InputLabel>
                  <Select
                    startAdornment={<InputAdornment position="start"><FA.FaTransgender style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                    label="Sexo"
                    color="primary"
                    name="gender"
                    defaultValue={patient?.gender || 'F'}
                    onChange={(e) => setValue('gender', e.target.value as any)}
                  >
                    <MenuItem value="F">Feminimo</MenuItem>
                    <MenuItem value="M">Masculino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Status</InputLabel>
                  <Select
                    startAdornment={<InputAdornment position="start"><Check color="primary" /></InputAdornment>}
                    label="Status" color="primary"
                    defaultValue={patient?.status !== undefined ? patient.status ? '1' : '0' : '1'}
                    onChange={(e) => setValue('status', Boolean(parseInt(e.target.value as string)))}
                  >
                    <MenuItem value="1">Ativo</MenuItem>
                    <MenuItem value="0">Inativo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <Box display="flex" justifyContent="flex-end" margin="1rem .5rem">
                  <Button color="primary" type="submit" variant="contained">Salvar</Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Drawer>
  </Box>
}

export default FormPatient
