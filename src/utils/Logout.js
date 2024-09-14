/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { SetPopupContext } from '../App'

const Logout = (props) => {
  const setPopup = useContext(SetPopupContext)
  useEffect(() => {
    console.log("use -----------------------------------")
    localStorage.removeItem('token')
    localStorage.removeItem('type')
    setPopup({
      open: true,
      severity: 'success',
      message: 'Deconnexion réussie',
    })
  }, [])
  return <Navigate to="/login" />
}

export default Logout
