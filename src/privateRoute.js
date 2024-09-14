/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ token, children }) {
  if (token == null) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default PrivateRoute
