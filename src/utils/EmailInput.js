/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core'
import React from 'react'

const EmailInput = (props) => {
  const { label, value, onChange, inputErrorHandler, handleInputError, required, className } = props

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={inputErrorHandler.email.message}
      onBlur={(event) => {
        if (event.target.value === '') {
          if (required) {
            handleInputError('email', true, 'Email obligatoire')
          } else {
            handleInputError('email', false, '')
          }
        } else {
          const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (re.test(String(event.target.value).toLowerCase())) {
            handleInputError('email', false, '')
          } else {
            handleInputError('email', true, "Le format de l'email est incorrect")
          }
        }
      }}
      error={inputErrorHandler.email.error}
      className={className}
    />
  )
}

export default EmailInput
