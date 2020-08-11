import React from 'react'
import { Box, Button, Grid, FormControl, InputLabel, Switch, CircularProgress, FormHelperText, OutlinedInput } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

import { useResponsive } from '../../hooks/useResponsive'
import Logo from '../../components/Logo'
import SignInBG from '../../components/SignInBG'
import { useThemeUpdate, useTheme as useThemeDarkMode } from '../../context/ThemeContext'

import { useDispatch, useSelector } from 'react-redux'
import { signInRequest } from '../../store/modules/auth/actions'
import { RootState } from '../../types/state'
import { useForm } from 'react-hook-form'

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const dispatch = useDispatch()

  const responsive = useResponsive(768)
  const theme = useTheme()
  const darkMode = useThemeDarkMode()
  const toggleTheme = useThemeUpdate()

  const { register, handleSubmit, errors } = useForm<IFormInput>()

  const onSubmit = (data: IFormInput) => {
    const { email, password } = data
    dispatch(signInRequest(email, password))
  }

  const { loading } = useSelector((state: RootState) => state.auth)

  return (
    <Box display="grid" gridTemplateColumns={responsive ? '1fr' : '4fr 350px'} height="100vh">
      <Box flex={1} padding="4rem" style={{
        display: responsive ? 'none' : 'flex'
      }} flexDirection="column" justifyContent="space-between" flexWrap="wrap" >
        <Box display="flex" flexDirection="column" alignItems="center" paddingRight="4rem" >
          <Box display="flex" alignItems="center">
            <Logo color={theme.palette.primary.main} />

          </Box>
          <h2 style={{
            color: theme.palette.primary.main,
            fontSize: '2rem',
            fontWeight: 'normal',
            margin: 0,
            marginTop: '1rem'
          }}>Organize seu consultório com horários e agendas</h2>

        </Box>
        <Box width="100%">
          <SignInBG />
        </Box>
        <Box display="flex" justifyContent="center">
          <h2 style={{
            color: theme.palette.primary.main,
            fontWeight: 'normal',
            margin: 0
            // marginTop: '1rem'
          }}>
            Todos direitos reservados &copy; 2020
          </h2>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="flex-end" marginRight="2rem">
          <Switch checked={darkMode} color="primary" onChange={toggleTheme} size="medium" />
        </Box>

        <Box justifyContent="center"

          maxWidth={responsive ? '100%' : '20rem'} padding="1rem 2rem" display="flex" flexDirection="column" height="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{
              boxShadow: responsive ? theme.palette.type === 'dark' ? '0px 4px 15px rgba(90,90,90,.1)' : '0px 4px 15px rgba(0,0,0,.1)' : '',
              backgroundColor: responsive ? theme.palette.background.paper : theme.palette.background.default,
              padding: responsive ? '2rem .5rem' : '',
              borderRadius: '.5rem'
            }}

            >
              {/* <Grid item md={12} xs={12}>
                <Box display="flex" justifyContent="center">
                  <Logo color={theme.palette.primary.main} />
                </Box>
              </Grid> */}

              <Grid item md={12} xs={12}>
                <h1 style={{ textAlign: 'center', color: theme.palette.primary.main }}>LOGIN</h1>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel variant="outlined" error={!!errors.email} required htmlFor="email">E-mail</InputLabel>
                  <OutlinedInput error={!!errors.email}
                    autoFocus
                    id="email"
                    autoComplete="off"
                    autoCapitalize="off"
                    name="email"
                    inputProps={{ autoCapitalize: 'off' }}
                    inputRef={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                    label="Email *"
                  />
                  {!!errors.email && <FormHelperText>{
                    errors.email.type === 'pattern' ? 'Digite um e-mail válido' : 'Campo obrigatório'
                  }</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel variant="outlined" error={!!errors.password} required htmlFor="password">Senha</InputLabel>
                  <OutlinedInput error={!!errors.password}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    label="Senha *"
                    inputProps={{ autoCapitalize: 'off' }}
                    inputRef={register({ required: true })}
                  />
                  {!!errors.password && <FormHelperText>{
                    errors.password.type === 'pattern' ? 'Digite um e-mail válido' : 'Campo obrigatório'
                  }</FormHelperText>}
                </FormControl>
              </Grid>

              {/* <Grid item md={12} xs={12}>
                <FormControlLabel
                  control={<Checkbox color={'primary'} checked name="rember" />}
                  label="Lembrar de mim?"
                />
              </Grid> */}

              <Grid item md={12} xs={12}>
                <Button size="large" type="submit" fullWidth variant="contained" color="primary">
                  {loading ? <CircularProgress color="inherit" size="1.65rem" /> : 'Entrar'}
                </Button>
              </Grid>
              {/* <Grid item md={12} xs={12}>
                <Link style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }} component="a"
                  variant="body2"> Esqueceu sua sennha?</Link>
              </Grid>
              <Grid item md={12} xs={12}>
                <Link onClick={() => history.push('/signup')} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }} component="a"
                  variant="body1">Criar conta</Link>
              </Grid> */}
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignIn
