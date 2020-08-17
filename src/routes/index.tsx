
import React, { lazy, Suspense } from 'react'
import Route from './Route'
import { Switch } from 'react-router'
import Loader from '../components/Loader'

const SignIn = lazy(() => import('../pages/SignIn'))
const Profile = lazy(() => import('../pages/Profile'))
const Home = lazy(() => import('../pages/Home'))
const Schedule = lazy(() => import('../pages/Schedule'))
const Insurance = lazy(() => import('../pages/Insurance'))
const Doctors = lazy(() => import('../pages/Doctors'))
const Patients = lazy(() => import('../pages/Patients'))

export default function Routes () {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path='/' exact component={props => <SignIn {...props} />} />
        <Route path='/profile' exact component={props => <Profile {...props} />} isPrivate />
        <Route path='/home' exact component={props => <Home {...props} />} isPrivate />
        <Route path='/schedule' exact component={props => <Schedule {...props} />} isPrivate />
        <Route path='/insurances' exact component={props => <Insurance {...props} />} isPrivate />
        <Route path='/doctors' exact component={props => <Doctors {...props} />} isPrivate />
        <Route path='/patients' exact component={props => <Patients {...props} />} isPrivate />
      </Switch>
    </Suspense>
  )
}
