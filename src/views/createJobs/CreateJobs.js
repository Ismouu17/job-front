/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
import { Button, Grid, MenuItem, Paper, TextField, Typography, makeStyles } from '@material-ui/core'
import axios from 'axios'
import ChipInput from 'material-ui-chip-input'
import { useContext, useState } from 'react'

import { SetPopupContext } from '../../App'

import apiList from '../../utils/apiList'

const useStyles = makeStyles((theme) => ({
  body: {
    height: 'inherit',
  },
  inputBox: {
    width: '100%',
  },
  popupDialog: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: "30px",
  },
}))

const CreateJobs = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)

  const [jobDetails, setJobDetails] = useState({
    title: '',
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().substr(0, 16),
    skillsets: [],
    jobType: 'Temps plein',
    duration: 0,
    salary: 0,
  })

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    })
  }

  const handleUpdate = () => {
    console.log(jobDetails)
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: 'success',
          message: response.data.message,
        })
        setJobDetails({
          title: '',
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: 'Temps plein',
          duration: 0,
          salary: 0,
        })
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: 'error',
          message: err.response.data.message,
        })
        console.log(err.response)
      })
  }

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: '30px', minHeight: '93vh', width: '100%', border: '1px solid #B9B8C8' }}
      >
        <Grid item>
          <Typography variant="h3">Ajouter une offre</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper
              style={{
                padding: '20px',
                outline: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Grid container direction="column" alignItems="stretch" spacing={3}>
                <Grid item>
                  <TextField
                    label="Title"
                    value={jobDetails.title}
                    onChange={(event) => handleInput('title', event.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Compétences"
                    variant="outlined"
                    helperText="Appuyer sur Entrer pour ajouter une compétence"
                    value={jobDetails.skillsets}
                    onAdd={(chip) =>
                      setJobDetails({
                        ...jobDetails,
                        skillsets: [...jobDetails.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = jobDetails.skillsets
                      skillsets.splice(index, 1)
                      setJobDetails({
                        ...jobDetails,
                        skillsets: skillsets,
                      })
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Type d'offre"
                    variant="outlined"
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput('jobType', event.target.value)
                    }}
                    fullWidth
                  >
                    <MenuItem value="Full Time">Temps plein</MenuItem>
                    <MenuItem value="Part Time">Temps partiel</MenuItem>
                    <MenuItem value="Work From Home">Travail à domicile</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    label="Durée"
                    variant="outlined"
                    value={jobDetails.duration}
                    onChange={(event) => {
                      handleInput('duration', event.target.value)
                    }}
                    fullWidth
                  >
                    <MenuItem value={0}>Flexible</MenuItem>
                    <MenuItem value={1}>1 Month</MenuItem>
                    <MenuItem value={2}>2 Months</MenuItem>
                    <MenuItem value={3}>3 Months</MenuItem>
                    <MenuItem value={4}>4 Months</MenuItem>
                    <MenuItem value={5}>5 Months</MenuItem>
                    <MenuItem value={6}>6 Months</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Salaire"
                    type="number"
                    variant="outlined"
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput('salary', event.target.value)
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Date limite de candidature"
                    type="datetime-local"
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput('deadline', event.target.value)
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Nombre maximum de candidats"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxApplicants}
                    onChange={(event) => {
                      handleInput('maxApplicants', event.target.value)
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Postes disponibles"
                    type="number"
                    variant="outlined"
                    value={jobDetails.maxPositions}
                    onChange={(event) => {
                      handleInput('maxPositions', event.target.value)
                    }}
                    InputProps={{ inputProps: { min: 1 } }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: '25%',
                  padding: '10px 50px',
                  marginTop: '30px',
                  color: 'black',
                  background: '#3399FF',
                }}
                onClick={() => handleUpdate()}
              >
                Créer l'offre
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CreateJobs
