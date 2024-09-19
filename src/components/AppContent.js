import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PrivateRoute from '../prIvateRoute'
import isAuth, { userType } from '../utils/isAuth'
// routes config
import routes from '../routes'
import Dashboard from '../views/dashboard/Dashboard'
import RecruiterProfile from '../views/profile/Profile'
import Profile from '../views/profile/applicant/Profile'

const AppContent = () => {
  console.log('I auth', isAuth())
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}
          <Route
            path="/"
            element={<Navigate to={isAuth() != '' ? 'dashboard' : 'login'} replace />}
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute token={isAuth()}>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={userType() == 'recruiter' ? <RecruiterProfile /> : <Profile />}
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
