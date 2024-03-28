import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SkipBody from './components/Skips/SkipBody'
import Skip1 from './components/Skips/Skip1'
import Skip2 from './components/Skips/Skip2'
import Skip3 from './components/Skips/Skip3'
import Login from './components/Authenthication/Login'
import SignUp from './components/Authenthication/SignUp'
import SignIn from './components/Authenthication/SignIn'
import VerifyOtp from './components/Authenthication/VerifyOtp'
import OtpSuccess from './components/Authenthication/OtpSuccess'
import CreateProfile from './components/Authenthication/CreateProfile'
import PrivacySettings from './components/Authenthication/PrivacySettings'
import AddVechicles from './components/Authenthication/AddVechicles'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import { useSelector } from 'react-redux'
import MyVehicles from './components/Profile/MyVehicles'
import ProfilePrivacySettings from './components/Profile/ProfilePrivacySettings'
import Notification from './components/Profile/Notification'
import ProfileAddVehicle from './components/Profile/ProfileAddVehicle'


function App() {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <Routes>
        <Route path="/" element={<SkipBody />} >
          <Route path="" element={<Skip1 />} />
          <Route path="skip-2" element={<Skip2 />} />
          <Route path="skip-3" element={<Skip3 />} />
        </Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/Sign-Up" element={<SignUp />} ></Route>
        <Route path="/Sign-in" element={<SignIn />} ></Route>
        <Route
          path="/verify-otp"
          element={
            isAuthenticated ? (
              <VerifyOtp />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/otp-success"
          element={
            isAuthenticated ? (
              <OtpSuccess />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/create-profile"
          element={
            isAuthenticated ? (
              <CreateProfile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/privacy-settings"
          element={
            isAuthenticated ? (
              <PrivacySettings />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/add-vechicles"
          element={
            isAuthenticated ? (
              <AddVechicles />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/user-profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/my-vehicle"
          element={
            isAuthenticated ? (
              <MyVehicles />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/Profile-Privacy-Settings"
          element={
            isAuthenticated ? (
              <ProfilePrivacySettings />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/Profile-notification"
          element={
            isAuthenticated ? (
              <Notification />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/Profile-Add-Vehicle"
          element={
            isAuthenticated ? (
              <ProfileAddVehicle />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </>
  )
}

export default App
