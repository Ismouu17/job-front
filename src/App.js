import { CSpinner, useColorModes } from '@coreui/react'
import React, { Suspense, createContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './protectedRoute'
import './scss/style.scss'
import Logout from './utils/Logout'
import MessagePopup from './utils/MessagePopup'

import isAuth from './utils/isAuth'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export const SetPopupContext = createContext({})

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }
    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [popup, setPopup] = useState({
    open: false,
    severity: '',
    message: '',
  })

  return (
    <HashRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={
                <ProtectedRoute token={isAuth()}>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/logout" name="Log out" element={<Logout />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
        </Suspense>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </HashRouter>
  )
}

export default App
