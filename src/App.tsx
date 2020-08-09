import React from 'react'

import './config/ReactotronConfig'
import './App.css'
import ThemeProvider from './context/ThemeContext'

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'

import { store, persistor } from './store'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SnackbarProvider >
          <ThemeProvider />
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
