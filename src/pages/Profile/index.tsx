import React, { useEffect } from 'react'
import { Box, Grid, FormControl, InputLabel, Input, FormControlLabel, Checkbox, useTheme, Button, FormHelperText } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import cep from 'cep-promise'
import { API } from '../../services/api'
import { enqueueSnackbar } from '../../store/modules/notifier/actions'
import { useDispatch } from 'react-redux'

interface IFormInput {
  user: {
    name: string;
    email: string;
  }
  document: string;
  birth_date: string;
  address?: {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  }
  contact?: {
    mobile: string;
    phone: string;
  }
}

const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { handleSubmit, setValue, getValues, control, errors } = useForm<IFormInput>()

  const numberRef = React.useRef()

  const onSubmit = (payload: IFormInput) => {
    API.put('/candidates/me', payload).then(({ data }) => {
      dispatch(enqueueSnackbar({
        message: 'Profile updated',
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'success'
        }
      }))
    })
  }

  useEffect(() => {
    async function loadProfile () {
      API.get('/candidates/me').then(({ data }: { data: IFormInput }) => {
        setValue('user.name', data.user.name)
        setValue('user.email', data.user.email)
        setValue('document', data.document)
        setValue('birth_date', data.birth_date)
        setValue('address.cep', data.address?.cep)
        setValue('address.street', data.address?.street)
        setValue('address.number', data.address?.number)
        setValue('address.neighborhood', data.address?.neighborhood)
        setValue('address.city', data.address?.city)
        setValue('address.state', data.address?.state)
        setValue('contact.mobile', data.contact?.mobile)
        setValue('contact.phone', data.contact?.phone)
      })
    }
    loadProfile()
    // eslint-disable-next-line
  }, [])

  const handleCepSearch = () => {
    const CEP: string = getValues('address.cep')

    cep(CEP).then(values => {
      // @ts-ignore
      numberRef.current.focus()

      setValue('address.street', values.street, { shouldDirty: false, shouldValidate: false })
      setValue('address.neighborhood', values.neighborhood, { shouldDirty: false, shouldValidate: false })
      setValue('address.city', values.city, { shouldDirty: false, shouldValidate: false })
      setValue('address.state', values.state, { shouldDirty: false, shouldValidate: false })
    })
  }

  return <Box display="flex" flexDirection="column">
    <Box>
      <h1
        style={{
          color: theme.palette.primary.main
        }}
      >
        Currículo
      </h1>
    </Box>
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column">
        <h2 style={{
          color: theme.palette.primary.main
        }}>Dados Pessoais</h2>

        <Grid container spacing={2}>
          <Grid item lg={3} md={4} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.user?.name} required htmlFor="user.name">Nome</InputLabel>
              <Controller
                as={<Input
                  id="user.name"
                  autoComplete="off"
                  error={!!errors.user?.name}
                />}
                name="user.name"
                control={control}
                defaultValue=""
                rules={{ required: true }}

              />
            </FormControl>
            {!!errors.user?.name && <FormHelperText>Campo obrigatório</FormHelperText>}
          </Grid>
          <Grid item lg={3} md={4} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="emal">E-mail</InputLabel>
              <Controller
                as={<Input
                  id="user.email"
                  autoComplete="off"
                  error={!!errors.user?.email}
                />}
                name="user.email"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={2} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.document} htmlFor="document">CPF</InputLabel>
              <Controller
                as={<Input
                  id="document"
                  autoComplete="off"
                  error={!!errors.document}
                />}
                name="document"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={3} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.birth_date} htmlFor="birth_date">Data de Nascimento</InputLabel>
              <Controller
                as={<Input
                  id="birth_date"
                  autoComplete="off"
                  error={!!errors.birth_date}
                />}
                name="birth_date"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" marginTop="3rem">
        <h2 style={{
          color: theme.palette.primary.main
        }}>Contato e Endereço</h2>
        <Grid container spacing={2}>
          <Grid item lg={1} md={1} xs={12}>
            <FormControl fullWidth variant="standard" >
              <InputLabel error={!!errors.address?.cep} required htmlFor="cep">CEP</InputLabel>
              <Controller
                render={({ onChange, value }) => <Input
                  id="address.cep"
                  autoComplete="off"
                  onChange={onChange}
                  value={value}
                  onBlur={handleCepSearch}
                  error={!!errors.address?.cep}
                />}
                name="address.cep"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={3} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.address?.street} required htmlFor="street">Logradouro</InputLabel>
              <Controller
                as={<Input
                  id="street"
                  autoComplete="off"
                  ref={numberRef}
                />} error={!!errors.address?.street}
                control={control}
                name="address.street"
                rules={{ required: true }}
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={1} md={1} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.address?.number} required htmlFor="number">Número</InputLabel>
              <Controller
                as={<Input
                  id="number"
                  autoComplete="off"
                  error={!!errors.address?.number}
                />}
                rules={{ required: true }}
                control={control}
                name="address.number"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={3} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.address?.neighborhood} required htmlFor="neighborhood">Bairro</InputLabel>
              <Controller
                as={<Input
                  error={!!errors.address?.neighborhood}
                  id="neighborhood"
                  autoComplete="off"
                />}
                rules={{ required: true }}
                control={control}
                name="address.neighborhood"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={3} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.address?.city} required htmlFor="city">Cidade</InputLabel>
              <Controller
                as={<Input
                  id="city"
                  error={!!errors.address?.city}
                  autoComplete="off"
                />}
                rules={{ required: true }}
                control={control}
                name="address.city"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={1} md={1} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.address?.state} required htmlFor="state">UF</InputLabel>
              <Controller
                as={<Input
                  id="state"
                  error={!!errors.address?.state}
                  autoComplete="off"
                />}
                rules={{ required: true }}
                control={control}
                name="address.state"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={2} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel error={!!errors.contact?.mobile} required htmlFor="mobile">Celular</InputLabel>
              <Controller
                as={<Input
                  id="mobile"
                  autoComplete="off"
                  error={!!errors.contact?.mobile}
                />}
                rules={{ required: true }}
                control={control}
                name="contact.mobile"
                defaultValue=""
              />
            </FormControl>
          </Grid>
          <Grid item lg={2} md={2} xs={12}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="phone">Telefone</InputLabel>
              <Controller
                as={<Input
                  id="phone"
                  autoComplete="off"
                />}
                control={control}
                name="contact.phone"
                defaultValue=""
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" flexDirection="column" marginTop="3rem">
        <h2 style={{
          color: theme.palette.primary.main
        }}>Skills</h2>
        <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel
              control={<Checkbox color={'primary'} checked name="rember" />}
              label="Javascript"
            />
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop="2rem">
        <Button size="large" type="submit" variant="contained" color="primary">
          Salvar
          {/* {!false ? <CircularProgress color="inherit" size="1.65rem" /> : "Salvar"} */}
        </Button>
      </Box>
    </form>
  </Box>
}

export default Profile
