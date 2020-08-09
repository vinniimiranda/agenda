import React, { lazy, Suspense } from 'react'
import Route from './Route'
import { Switch } from 'react-router'
import Loader from '../components/Loader'

const SignIn = lazy(() => import('../pages/SignIn'))
const Profile = lazy(() => import('../pages/Profile'))

export default function Routes () {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path='/' exact component={props => <SignIn {...props} />} />
        <Route path='/profile' exact component={props => <Profile {...props} />} isPrivate />
      </Switch>
    </Suspense>
  )
}
