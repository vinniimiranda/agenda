import React, { useEffect } from 'react'
import { Box, Drawer, IconButton, Grid, FormControl, InputLabel, OutlinedInput, useTheme, Select, MenuItem, Button, InputAdornment } from '@material-ui/core'
import { Close, Mail, Create, Phone, Check, CalendarToday, Business } from '@material-ui/icons'
import * as FA from 'react-icons/fa'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'

import { Insurance } from '..'
import { useForm, Controller } from 'react-hook-form'
import postRequest from '../../../requests/postRequest'
import { useDispatch } from 'react-redux'
import updateRequest from '../../../requests/updateRequest'
import { useResponsive } from '../../../hooks/useResponsive'

type Props = {
  open: boolean;
  handleClose: () => void;
  setReload: (state: any) => void;
  insurance?: Insurance;
}

const FormInsurance: React.FC<Props> = ({ open, handleClose, insurance, setReload }: Props) => {
  const theme = useTheme()
  const responsive = useResponsive(425)

  const dispatch = useDispatch()

  const { register, handleSubmit, setValue, getValues, control } = useForm()
  function onSubmit (data) {
    if (insurance) {
      updateRequest({ url: 'insurances', id: insurance.id, name: 'Convênio', data, setReload, dispatch })
    } else {
      postRequest({ url: 'insurances', name: 'Convênio', data, setReload, dispatch })
    }
  }

  useEffect(() => {
    if (insurance) {
      setValue('status', insurance.status)
    } else {
      setValue('status', true)
    }
  }, [open, insurance, setValue])

  React.useEffect(() => {
    register('status')
  }, [register])

  return <Box>
    <Drawer open={open} onClose={handleClose}>
      <Box width={responsive ? '85vw' : '60vw'} padding="1rem" display="flex" flexDirection="column">
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
                  <InputLabel required>Nome</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Create style={{
                      color: theme.palette.primary.main
                    }} /></InputAdornment>}
                    autoComplete="new-password"
                    label="Nome *"
                    color="primary"
                    name="name"
                    defaultValue={insurance?.name}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel required>CNPJ</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Business style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                    label="CNPJ  *"
                    color="primary"
                    name="document"
                    defaultValue={insurance?.document}
                    inputRef={register({ required: true })}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel required>Email</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Mail style={{
                      color: theme.palette.primary.main
                    }} /></InputAdornment>}
                    label="Email *"
                    color="primary"
                    name="email"
                    defaultValue={insurance?.email}
                    inputRef={register}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Telefone</InputLabel>
                  <OutlinedInput
                    startAdornment={<InputAdornment position="start"><Phone style={{
                      color: theme.palette.primary.main
                    }} /></InputAdornment>}
                    label="Telefone"
                    color="primary"
                    name="phone"
                    defaultValue={insurance?.phone}
                    inputRef={register}
                  />
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Valido até</InputLabel>
                  <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-BR">
                    <Controller
                      startAdornment={<InputAdornment position="start"><FA.FaTransgender style={{ fontSize: '1.5rem', color: theme.palette.primary.main }} /></InputAdornment>}
                      as={<DatePicker
                        label="Valido até"
                        variant="dialog"
                        value={getValues('valid_thru')}
                        inputVariant='outlined'
                        format='DD/MM/YYYY'
                        onError={() => null}
                        onChange={date => console.log('valid_thru', date?.toDate())}
                        TextFieldComponent={({ ...props }: any) => <OutlinedInput
                          {...props}
                          label="Valido até"
                          startAdornment={<InputAdornment position="start"><CalendarToday style={{
                            color: theme.palette.primary.main
                          }} /></InputAdornment>} />}
                      />}
                      name="valid_thru"
                      start
                      defaultValue={moment(insurance?.valid_thru).utcOffset(0)}
                      control={control}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel >Status</InputLabel>
                  <Select
                    startAdornment={<InputAdornment position="start"><Check style={{
                      color: theme.palette.primary.main
                    }} /></InputAdornment>}
                    label="Status" color="primary"
                    defaultValue={insurance?.status !== undefined ? insurance.status ? '1' : '0' : '1'}
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

export default FormInsurance
