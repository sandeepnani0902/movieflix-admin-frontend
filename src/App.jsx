
import { Router,Routes, Route,NavLink,Link, Navigate } from 'react-router-dom'
import './App.css'
import {Suspense, lazy, useState } from 'react'
import ProtectedRoute from './components/forms/ProtectedRoute'
const Login = lazy( () => import('./components/forms/Login'))
const Register = lazy( () => import('./components/forms/Register'))
const Dashboard = lazy(()=> import('./components/Dashboard/Dashboard'))
const DashboardHome =lazy(()=>import('./components/pages/DashboardHome')) ;
const Movies = lazy(()=> import('./components/pages/Movies/Movies'));
const Genre = lazy (()=>import('./components/pages/Genre'));
const WebSeries =lazy(()=>import('./components/pages/Webseries/WebSeries'));
const ProfileSettings = lazy(()=>import('./components/pages/profile/ProfileSettings'));
const Languages = lazy(()=>import('./components/pages/Languages')) 
// const Viewrofile = lazy(()=>import('./components/Dashboard/Dropdownpages/Viewprofile'));
// const  Editprofile =  './components/Dashboard/Dropdownpages/Editprofile';
// import Username from './components/Dashboard/Dropdownpages/Username'


function App() {
  const [profile, setProfile] = useState(null)

 
  return (
    <div className='app'>
        <Suspense fallback={<div>loading..</div>}>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register setProfile={setProfile} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="languages" element={<Languages />} />
                <Route path="movies" element={<Movies />} />
                <Route path="genre" element={<Genre />} />
                <Route path="webseries" element={<WebSeries />} />
                <Route path="profilesettings" element={<ProfileSettings />} />
            </Route>
      </Routes> 
      </Suspense>
    </div>
  )
}

export default App
