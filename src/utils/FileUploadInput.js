/* eslint-disable react/prop-types */
import { Button, Grid, LinearProgress, TextField } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import Axios from 'axios'
import React, { createContext, useContext, useState } from 'react'

const FileUploadInput = (props) => {
  const SetPopupContext = createContext({})
  const setPopup = useContext(SetPopupContext)

  const { uploadTo, identifier, handleInput } = props
  const [file, setFile] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const handleUpload = () => {
    const formData = new FormData()
    formData.append('file', file)
    Axios.post(uploadTo, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          Math.floor(Math.round((progressEvent.loaded * 100) / progressEvent.total)),
        )
      },
    })
      .then((response) => {
        console.log(response.data)
        handleInput(identifier, response.data.url)
        setPopup({
          open: true,
          severity: 'success',
          message: response.data.message,
        })
      })
      .catch((err) => {
        console.log(err.response)
        setPopup({
          open: true,
          severity: 'error',
          message: err.response.statusText,
          //   message: err.response.data
          //     ? err.response.data.message
          //     : err.response.statusText,
        })
      })
  }

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: '100%', height: '100%' }}
          >
            {props.icon}
            <input
              name="file"
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => {
                console.log('FILES', event.target.files)
                setUploadPercentage(0)
                setFile(event.target.files[0])
              }}

              // onChange={onChange}
              // onChange={
              //   (e) => {}
              //   //   setSource({ ...source, place_img: e.target.files[0] })
              // }
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={file ? file.name || '' : ''}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: '100%', height: '100%' }}
            onClick={() => handleUpload()}
            disabled={file ? false : true}
          >
            <CloudUpload />
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  )
}

export default FileUploadInput
