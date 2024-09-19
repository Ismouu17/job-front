/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ token, children }) {
  if (token != null) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}
export default ProtectedRoute
