import React, { createContext, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, ThemeProvider as ThemeMUIProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Router } from 'react-router'
import Routes from '../routes/index'
import history from '../services/history'
import Notifier from '../components/Notifier'

const ThemeContext = createContext(false)
const ThemeUpdateContext = createContext(() => { })

const ThemeProvider: React.FC = ({ children }) => {
  const lightMode = Boolean(localStorage.getItem('lightMode'))

  const [darkTheme, setDarkTheme] = useState(!lightMode)

  function toggleTheme () {
    setDarkTheme(prevDarkTheme => {
      const favicon = window.document.querySelector('#favicon') as HTMLLinkElement
      if (prevDarkTheme) {
        favicon.setAttribute('href', 'favicon_light.png')
        localStorage.setItem('lightMode', 'true')
      } else {
        favicon.setAttribute('href', 'favicon.png')
        localStorage.removeItem('lightMode')
      }
      return !prevDarkTheme
    })
  }

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkTheme ? 'dark' : 'light',
          primary: {
            main: darkTheme ? '#F80057' : '#4E90DD',
            contrastText: '#fff'

          },
          secondary: {
            main: darkTheme ? '#00BFA6' : '#4caf50',
            contrastText: '#fff'
          },
          background: {
            default: darkTheme ? '#000014' : '#fafafa',
            paper: darkTheme ? '#111128' : '#fff'
          },
          text: {
            primary: darkTheme ? '#FFF' : '#333',
            secondary: darkTheme ? '#FFF' : '#333'
          }
        }
      }),
    [darkTheme]
  )

  return <ThemeContext.Provider value={darkTheme}>
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeMUIProvider theme={theme}>
        <CssBaseline />
        <Notifier />
        <Router history={history}>
          <Routes />
        </Router>
      </ThemeMUIProvider>
      {children}
    </ThemeUpdateContext.Provider>
  </ThemeContext.Provider>
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export function useTheme () {
  return useContext(ThemeContext)
}

export function useThemeUpdate () {
  return useContext(ThemeUpdateContext)
}

export default ThemeProvider
