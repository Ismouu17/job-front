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
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleInput = (value) => {
    setEmail(value)
  }
  const handleLogin = () => {
    console.log('Email', email)
    if (email == 'recruteur1@gmail.com') {
      console.log('ok recruiter')
      localStorage.setItem('token', 'fdsfFrdf659dff')
      localStorage.setItem('type', 'recruiter')
    } else if (email == 'postulant1@gmail.com') {
      localStorage.setItem('token', 'fdsfFrdf659dff')
      localStorage.setItem('type', 'applicant')
    } else if (email == 'admin1@gmail.com') {
      localStorage.setItem('token', 'fdsfFrdf659dff')
      localStorage.setItem('type', 'admin')
    }
    window.location.reload()
    navigate('/dashboard', { replace: true })
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
                        placeholder="Email"
                        autoComplete="username"
                        name="email"
                        onChange={(event) => handleInput(event.target.value)}
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
