import React, { useEffect } from 'react'
import { Box, Drawer, IconButton, Grid, FormControl, InputLabel, OutlinedInput, useTheme, Select, MenuItem, Button, InputAdornment } from '@material-ui/core'
import { Close, Mail, Create, Phone, Check } from '@material-ui/icons'
import * as FA from 'react-icons/fa'
import { Doctor } from '..'
import { useForm } from 'react-hook-form'
import postRequest from '../../../requests/postRequest'
import { useDispatch } from 'react-redux'
import updateRequest from '../../../requests/updateRequest'

type Props = {
  open: boolean;
  handleClose: () => void;
  setReload: (state: any) => void;
  doctor?: Doctor;
}

const FormDoctor: React.FC<Props> = ({ open, handleClose, doctor, setReload }: Props) => {
  const theme = useTheme()
  const dispatch = useDispatch()

  const { register, handleSubmit, setValue } = useForm()
  function onSubmit (data) {
    if (doctor) {
      updateRequest({ url: 'doctors', id: doctor.id, name: 'Doutor(a)', data, setReload, dispatch })
    } else {
      postRequest({ url: 'doctors', name: 'Doutor(a)', data, setReload, dispatch })
    }
  }

  useEffect(() => {
    if (doctor) {
      setValue('gender', doctor.gender)
      setValue('status', doctor.status)
    } else {
      setValue('gender', 'F')
      setValue('status', true)
    }
  }, [open, doctor, setValue])

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
                    defaultValue={doctor?.name}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >CRM</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><FA.FaUserMd style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                    label="CRM"
                    color="primary"
                    name="document"
                    defaultValue={doctor?.document}
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
                    defaultValue={doctor?.email}
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
                    defaultValue={doctor?.phone}
                    inputRef={register}
                  />
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
                    defaultValue={doctor?.gender || 'F'}
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
                    defaultValue={doctor?.status !== undefined ? doctor.status ? '1' : '0' : '1'}
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

export default FormDoctor
