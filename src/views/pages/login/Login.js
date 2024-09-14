/* eslint-disable react/react-in-jsx-scope */
import { Button, Grid, Paper, Typography, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'

import { SetPopupContext } from '../../../App'
import EmailInput from '../../../utils/EmailInput'
import PasswordInput from '../../../utils/PasswordInput'

import apiList from '../../../utils/apiList'
import isAuth from '../../../utils/isAuth'

const useStyles = makeStyles((theme) => ({
  body: {
    padding: '315px 50px',
    background: '#E0E0E0',
  },
  inputBox: {
    width: '400px',
  },
  submitButton: {
    width: '300px',
  },
}))

const Login = (props) => {
  const classes = useStyles()
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
          window.location.reload()
          setPopup({
            open: true,
            severity: 'success',
            message: 'Connecté avec succes',
          })
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

  return loggedin ? (
    <Navigate to="/dashboard" />
  ) : (
    <Paper elevation={0} className={classes.body}>
      <Grid
        container
        direction="column"
        spacing={4}
        alignItems="center"
        style={{ background: '#E0E0E0', alignContent: 'center' }}
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            Se connecter
          </Typography>
        </Grid>
        <Grid item>
          <EmailInput
            label="Votre Email"
            value={loginDetails.email}
            onChange={(event) => handleInput('email', event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Votre mot de passe"
            value={loginDetails.password}
            onChange={(event) => handleInput('password', event.target.value)}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <Button
            style={{ background: 'linear-gradient(62deg, #adc4d4 0%, #bcb4c5 100%)' }}
            variant="contained"
            onClick={() => handleLogin()}
            className={classes.submitButton}
          >
            Connexion
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Login
