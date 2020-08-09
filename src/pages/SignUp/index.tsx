import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Grid, FormControl, InputLabel, Input, Link, Switch, RadioGroup, FormControlLabel, Radio, CircularProgress, FormHelperText } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import { useResponsive } from '../../hooks/useResponsive'
import Logo from '../../components/Logo'
import SignUpBG from '../../components/SignUpBG'
import { useThemeUpdate, useTheme as useThemeDarkMode } from '../../context/ThemeContext'
import history from '../../services/history'
import { signUpRequest } from '../../store/modules/auth/actions'

// eslint-disable-next-line
import { RootState } from '../../types/state'

interface IFormInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

const SignUp: React.FC = () => {
  const dispatch = useDispatch()

  const responsive = useResponsive(425)
  const theme = useTheme()
  const darkMode = useThemeDarkMode()
  const toggleTheme = useThemeUpdate()

  const { loading } = useSelector((state: RootState) => state.auth)

  const { register, handleSubmit, errors } = useForm<IFormInput>()
  const onSubmit = (data: IFormInput) => {
    dispatch(signUpRequest(data))
  }

  return (
    <Box display="flex" height="100vh">
      <Box bgcolor={theme.palette.primary.main} flex={1} padding="4rem" style={{
        display: responsive ? 'none' : 'flex'
      }} flexDirection="column" justifyContent="space-between" flexWrap="wrap" >
        <Box display="flex" flexDirection="column" alignItems="flex-end" paddingRight="4rem" >
          <Box display="flex" alignItems="center">
            <Logo color={theme.palette.background.default} />
            <h1 style={{
              fontSize: '2.5rem',
              color: theme.palette.background.default,
              margin: 0,
              marginLeft: '1rem'
            }}>SEU JOB</h1>
          </Box>
          <h2 style={{
            color: theme.palette.background.default,
            fontSize: '2rem',
            fontWeight: 'normal',
            margin: 0,
            marginTop: '1rem'
          }}>Encontre a vaga perfeita para você!</h2>

        </Box>
        <Box width="100%">

          <SignUpBG />
        </Box>
        <Box display="flex" justifyContent="center">
          <h2 style={{
            color: theme.palette.background.default,
            fontWeight: 'normal',
            margin: 0
            // marginTop: '1rem'
          }}>
            Todos direitos reservados &copy; 2020
          </h2>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" >
        <Box display="flex" justifyContent="flex-end">
          <Switch checked={darkMode} color="primary" onChange={toggleTheme} size="medium" />
        </Box>

        <Box justifyContent="center"
          boxShadow={theme.palette.type === 'dark' ? '0px 20px 15px rgba(90,90,90,.1)' : '0px 20px 15px rgba(0,0,0,.1)'}
          maxWidth={responsive ? '100%' : '20rem'} padding="1rem 2rem" display="flex" flexDirection="column" height="100%">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} style={{
              boxShadow: responsive ? theme.palette.type === 'dark' ? '0px 4px 15px rgba(90,90,90,.1)' : '0px 4px 15px rgba(0,0,0,.1)' : '',
              backgroundColor: responsive ? theme.palette.background.paper : theme.palette.background.default,
              padding: responsive ? '2rem .5rem' : '',
              borderRadius: '.5rem'
            }
            }
            >
              <Grid item md={12} xs={12}>
                <Box display="flex" justifyContent="center">
                  <Logo color={theme.palette.primary.main} />
                </Box>
              </Grid>
              <Grid item md={12} xs={12}>
                <h1 style={{ textAlign: 'center', color: theme.palette.primary.main }}>CADASTRO</h1>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel required error={!!errors.name} htmlFor="name">Nome</InputLabel>
                  <Input
                    autoFocus
                    id="name"
                    name="name"
                    autoComplete="off"
                    error={!!errors.name}
                    inputRef={register({ required: true, pattern: /^([a-z']{2,25}\s?)+$/i })}

                  />
                  {!!errors.name && <FormHelperText>{
                    errors.name.type === 'pattern' ? 'Digite um nome válido' : 'Campo obrigatório'
                  }</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel required error={!!errors.email} htmlFor="email">E-mail</InputLabel>
                  <Input
                    id="email"
                    name="email"
                    autoComplete="off"
                    error={!!errors.email}
                    inputProps={{ autoCapitalize: 'off' }}
                    inputRef={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                  />
                  {!!errors.email && <FormHelperText>{
                    errors.email.type === 'pattern' ? 'Digite um e-mail válido' : 'Campo obrigatório'
                  }</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth variant="standard">
                  <InputLabel required htmlFor="password"
                    error={!!errors.password}
                  >Senha</InputLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    name="password"
                    inputProps={{ autoCapitalize: 'off' }}
                    error={!!errors.password}
                    inputRef={register({ required: true })}
                  />
                  {!!errors.password && <FormHelperText>{
                    errors.password.type === 'pattern' ? 'Digite um e-mail válido' : 'Campo obrigatório'
                  }</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={12} xs={12}>
                <FormControl fullWidth component="div">
                  <RadioGroup
                    defaultValue="candidate"
                    aria-label="Role"
                    name="role"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      flex: 1

                    }}>
                    <FormControlLabel value="candidate" labelPlacement="end" control={<Radio name="role" inputRef={register({ required: true })} color="primary" />} label="Candidato" />
                    <FormControlLabel value="recruiter" labelPlacement="end" control={<Radio name="role" inputRef={register({ required: true })} color="primary" />} label="Recrutador" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center" >
                  <span style={{ fontSize: '1.1rem', textAlign: 'center' }}>
                    Ao se cadastrar você concorda com os <Link onClick={() => alert('mostra termos')} component="a" variant="body1">Termos de Serviço.</Link>
                  </span>
                </Box>

              </Grid>

              <Grid item md={12} xs={12}>
                <Button type="submit" size="large" fullWidth variant="contained" color="primary">
                  {loading ? <CircularProgress color="inherit" size="1.65rem" /> : 'Cadastrar'}
                </Button>
              </Grid>

              <Grid item md={12} xs={12}>
                <Link onClick={() => history.push('/')} style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', width: '100%' }} component="button"
                  variant="body1">Já tem uma conta?</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default SignUp
