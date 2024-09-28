/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prefer-const */
import { CCol, CContainer, CRow } from '@coreui/react'
import { Button, Grid, MenuItem, TextField, Typography, makeStyles } from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import FaceIcon from '@material-ui/icons/Face'
import axios from 'axios'
import ChipInput from 'material-ui-chip-input'
import { useContext, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { Navigate, useNavigate } from 'react-router-dom'

import EmailInput from '../../../utils/EmailInput'
import FileUploadInput from '../../../utils/FileUploadInput'
import PasswordInput from '../../../utils/PasswordInput'

import { SetPopupContext } from '../../../App'
import apiList from '../../../utils/apiList'
import isAuth from '../../../utils/isAuth'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '60px 60px',
  },
  inputBox: {
    width: '600px',
  },
  submitButton: {
    width: '400px',
  },
}))

const MultifieldInput = (props) => {
  const classes = useStyles()
  const { education, setEducation } = props

  return (
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Grid item xs={6}>
            <TextField
              label={`Formations #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].institutionName = event.target.value
                setEducation(newEdu)
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Année de debut"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].startYear = parseInt(event.target.value)
                setEducation(newEdu)
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Année de fin"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].endYear = parseInt(event.target.value)
                setEducation(newEdu)
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: '',
                startYear: 0,
                endYear: 0,
              },
            ])
          }
          className={classes.inputBox}
        >
          Ajoutez d'autres formations
        </Button>
      </Grid>
    </>
  )
}

const Signup = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const setPopup = useContext(SetPopupContext)

  const [loggedin, setLoggedin] = useState(isAuth())

  const [signupDetails, setSignupDetails] = useState({
    type: 'applicant',
    email: '',
    password: '',
    name: '',
    education: [],
    skills: [],
    resume: '',
    profile: '',
    rating: 0,
    bio: '',
    contactNumber: '',
  })

  const [phone, setPhone] = useState('')

  const [education, setEducation] = useState([
    {
      institutionName: '',
      startYear: 0,
      endYear: 0,
    },
  ])

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: '',
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: '',
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: '',
    },
  })
  const [tmpErrorHandler, setTpmErrorHandler] = useState({})

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    })
  }

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    })
  }

  const handleLogin = () => {
    //const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} est obligatoire`,
        }
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj]
      }
    })

    console.log(education)

    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== '')
        .map((obj) => {
          if (obj['endYear'] === 0) {
            delete obj['endYear']
          }
          return obj
        }),
    }

    setSignupDetails(updatedDetails)

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error
    })

    if (verified) {
      console.log('SIGNUP DETAILS :', signupDetails)
      axios
        .post(apiList.signup, updatedDetails)
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
      setInputErrorHandler(tmpErrorHandler)
      setPopup({
        open: true,
        severity: 'error',
        message: 'Saisie invalide',
      })
    }
  }

  const handleLoginRecruiter = () => {
    //const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} est obligatoire`,
        }
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj]
      }
    })

    let updatedDetails = {
      ...signupDetails,
    }
    if (phone !== '') {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      }
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: '',
      }
    }

    setSignupDetails(updatedDetails)

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error
    })

    console.log(updatedDetails)

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
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
      setInputErrorHandler(tmpErrorHandler)
      setPopup({
        open: true,
        severity: 'error',
        message: 'Saisie invalide',
      })
    }
  }

  return loggedin ? (
    <Navigate to="/" />
  ) : (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <Grid container direction="column" spacing={4} alignItems="center">
              <Grid item>
                <Typography variant="h4" component="h2">
                  Créez votre compte
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  select
                  label="Vous êtes?"
                  variant="outlined"
                  className={classes.inputBox}
                  value={signupDetails.type}
                  onChange={(event) => {
                    handleInput('type', event.target.value)
                  }}
                >
                  <MenuItem value="applicant">Demandeur d'emploi</MenuItem>
                  <MenuItem value="recruiter">Recruteur</MenuItem>
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Votre nom"
                  value={signupDetails.name}
                  onChange={(event) => handleInput('name', event.target.value)}
                  className={classes.inputBox}
                  error={inputErrorHandler.name.error}
                  helperText={inputErrorHandler.name.message}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      handleInputError('name', true, 'Le nom est obligatoire')
                    } else {
                      handleInputError('name', false, '')
                    }
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <EmailInput
                  label="Votre adresse Email"
                  value={signupDetails.email}
                  onChange={(event) => handleInput('email', event.target.value)}
                  inputErrorHandler={inputErrorHandler}
                  handleInputError={handleInputError}
                  className={classes.inputBox}
                  required={true}
                />
              </Grid>
              <Grid item>
                <PasswordInput
                  label="Votre mot de passe"
                  value={signupDetails.password}
                  onChange={(event) => handleInput('password', event.target.value)}
                  className={classes.inputBox}
                  error={inputErrorHandler.password.error}
                  helperText={inputErrorHandler.password.message}
                  onBlur={(event) => {
                    if (event.target.value === '') {
                      handleInputError('password', true, 'Le mot de passe est obligatoire')
                    } else {
                      handleInputError('password', false, '')
                    }
                  }}
                />
              </Grid>
              {signupDetails.type === 'applicant' ? (
                <>
                  <MultifieldInput education={education} setEducation={setEducation} />
                  <Grid item>
                    <ChipInput
                      className={classes.inputBox}
                      label="Vos compétences"
                      variant="outlined"
                      helperText="Appuyer sur la touche entrée pour ajouter des compétences"
                      onChange={(chips) => setSignupDetails({ ...signupDetails, skills: chips })}
                    />
                  </Grid>
                  <Grid item>
                    <FileUploadInput
                      className={classes.inputBox}
                      label="Attestation de compétence (CV...) (.pdf)"
                      icon={<DescriptionIcon />}
                      uploadTo={apiList.uploadResume}
                      handleInput={handleInput}
                      identifier={'resume'}
                    />
                  </Grid>
                  <Grid item>
                    <FileUploadInput
                      className={classes.inputBox}
                      label="Photo de profil (.jpg/.png)"
                      icon={<FaceIcon />}
                      uploadTo={apiList.uploadProfileImage}
                      handleInput={handleInput}
                      identifier={'profile'}
                    />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item style={{ width: '100%' }}>
                    <TextField
                      label="Votre biographie (upto 250 words)"
                      multiline
                      rows={8}
                      style={{ width: '100%' }}
                      variant="outlined"
                      value={signupDetails.bio}
                      onChange={(event) => {
                        if (
                          event.target.value.split(' ').filter(function (n) {
                            return n != ''
                          }).length <= 250
                        ) {
                          handleInput('bio', event.target.value)
                        }
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <PhoneInput
                      country={'in'}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                    />
                  </Grid>
                </>
              )}

              <Grid item container className={classes.inputBox}>
                <Grid item xs={6}>
                  <Button
                    style={{ width: '250px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      signupDetails.type === 'applicant' ? handleLogin() : handleLoginRecruiter()
                    }}
                    className={classes.submitButton}
                  >
                    S'inscrire
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Button
                    style={{ width: '250px', background: '#F9B115', color: 'black' }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      navigate('/login', { replace: true })
                    }}
                    className={classes.submitButton}
                  >
                    Se connecter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Signup
