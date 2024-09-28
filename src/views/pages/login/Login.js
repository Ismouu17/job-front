import { cibMailRu, cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SetPopupContext } from '../../../App'

import axios from 'axios'
import apiList from '../../../utils/apiList'
import isAuth from '../../../utils/isAuth'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const setPopup = useContext(SetPopupContext)

  const [loggedin, setLoggedin] = useState(isAuth())

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  })

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: '',
    },
    password: {
      error: false,
      message: '',
    },
  })

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    })
  }
  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    })
  }

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error
    })
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('type', response.data.type)
          setLoggedin(isAuth())
          setPopup({
            open: true,
            severity: 'success',
            message: 'Connecté avec succes',
          })
          window.location.reload()
          navigate('/dashboard', { replace: true })
          console.log(response)
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: 'error',
            message: err.response.data.message,
          })
          console.log(err.response)
        })
    } else {
      setPopup({
        open: true,
        severity: 'error',
        message: 'Entrée invalide',
      })
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Connectez vous à votre compte</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibMailRu} />
                      </CInputGroupText>
                      <CFormInput
                        value={loginDetails.email}
                        placeholder="Email"
                        autoComplete="username"
                        name="email"
                        inputErrorHandler={inputErrorHandler}
                        handleInputError={handleInputError}
                        onChange={(event) => handleInput('email', event.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginDetails.password}
                        onChange={(event) => handleInput('password', event.target.value)}
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() => {
                            handleLogin()
                          }}
                        >
                          Connexion
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Mot de passe oublié?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Créer votre compte</h2>
                    <p>Créer votre compte dès aujourd hui pour profiter de nombreux avantages</p>
                    <CButton
                      color="primary"
                      onClick={() => {
                        console.log('-----------------------')
                        navigate('/register', { replace: true })
                      }}
                      className="mt-3"
                      active
                      tabIndex={-1}
                    >
                      Enregistrez vous maintenant!
                    </CButton>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
