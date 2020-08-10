import React, { useState } from 'react'

import { Route, Redirect } from 'react-router-dom'
import Nav, { NavResponsive } from '../components/Nav'
import { Box, Switch } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { useResponsive } from '../hooks/useResponsive'
import { useThemeUpdate, useTheme } from '../context/ThemeContext'
import { store } from '../store'

const DefaultLayout: React.FC = ({ children }) => {
  const responsive = useResponsive(425)
  const theme = useTheme()
  const toggleTheme = useThemeUpdate()

  const [isOpen, setIsOpen] = useState(false)

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
  }

  return (
    <Box display="flex">
      {!responsive && <Nav />}

      <Box padding={responsive ? '.5rem .75rem' : '1rem 2rem'} width="100%" marginLeft={responsive ? 0 : '8rem'}>
        {responsive && <NavResponsive isOpen={isOpen} handleClose={handleClose} />}
        <Box display="flex" marginBottom=".5rem" justifyContent={responsive ? 'space-between' : 'flex-end'}>
          {responsive && <Box>
            <Menu color="primary" style={{ fontSize: '1.75rem' }} onClick={handleOpen} />
          </Box>}
          <Switch checked={theme} color="primary" onChange={toggleTheme} size="medium" />
        </Box>
        {children}
      </Box>
    </Box>
  )
}
const AuthLayout: React.FC = ({ children }) => <>{children}</>

type Props = {
  component: React.FC;
  path: string;
  isPrivate?: boolean;
  exact?: boolean;
}

const RouteWrapper: React.FC<Props> = ({ component: Component, isPrivate = false, ...rest }) => {
  // @ts-ignore
  const { signed } = store.getState().auth

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }
  if (signed && !isPrivate) {
    return <Redirect to="/home" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route
      {...rest}
      component={(props: any) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

export default RouteWrapper
