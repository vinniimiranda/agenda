
import { persistStore } from 'redux-persist'

import createSagaMiddleware from 'redux-saga'
import createStore from './createStore'
import persistReducers from './persistReducers'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'

const sagaMonitor =
  process.env.NODE_ENV === 'development'

    ? console.tron.createSagaMonitor()
    : null

const sageMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = [sageMiddleware]

const store = createStore(persistReducers(rootReducer), middlewares)

const persistor = persistStore(store)

sageMiddleware.run(rootSaga)

export { store, persistor }
