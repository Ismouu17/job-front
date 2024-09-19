/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-const */
import { Button, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core'
import DescriptionIcon from '@material-ui/icons/Description'
import FaceIcon from '@material-ui/icons/Face'
import axios from 'axios'
import ChipInput from 'material-ui-chip-input'
import { useContext, useEffect, useState } from 'react'
import FileUploadInput from '../../../utils/FileUploadInput'

import { SetPopupContext } from '../../../App'

import apiList from '../../../utils/apiList'

const useStyles = makeStyles((theme) => ({
  body: {
    height: 'inherit',
  },
  inputBox: {
    width: '100%',
  },
  gridContent: {
    width: '100%',
  },
  popupDialog: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const MultifieldInput = (props) => {
  const classes = useStyles()
  const { education, setEducation } = props

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Nom de l'établissement #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].institutionName = event.target.value
                setEducation(newEdu)
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Date de début"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].startYear = event.target.value
                setEducation(newEdu)
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Date de fin"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education]
                newEdu[key].endYear = event.target.value
                setEducation(newEdu)
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: 'center' }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: '',
                startYear: '',
                endYear: '',
              },
            ])
          }
          className={classes.inputBox}
        >
          Ajouter une autre formation
        </Button>
      </Grid>
    </>
  )
}

const Profile = (props) => {
  const classes = useStyles()
  const setPopup = useContext(SetPopupContext)
  const [userData, setUserData] = useState()
  const [open, setOpen] = useState(false)

  const [profileDetails, setProfileDetails] = useState({
    name: '',
    education: [],
    skills: [],
    resume: '',
    profile: '',
  })

  const [education, setEducation] = useState([
    {
      institutionName: '',
      startYear: '',
      endYear: '',
    },
  ])

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    })
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setProfileDetails(response.data)
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : '',
              startYear: edu.startYear ? edu.startYear : '',
              endYear: edu.endYear ? edu.endYear : '',
            })),
          )
        }
      })
      .catch((err) => {
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: 'error',
          message: 'Error',
        })
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const editDetails = () => {
    setOpen(true)
  }

  const handleUpdate = () => {
    console.log(education)

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== '')
        .map((obj) => {
          if (obj['endYear'] === '') {
            delete obj['endYear']
          }
          return obj
        }),
    }

    axios
      .put(apiList.user, updatedDetails, {
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
        getData()
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: 'error',
          message: err.response.data.message,
        })
        console.log(err.response)
      })
    setOpen(false)
  }

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: '30px', minHeight: '93vh', width: '100%' }}
      >
        <Grid item>
          <Typography variant="h4">Mon Profil</Typography>
        </Grid>
        <Grid item className={classes.gridContent}>
          <Paper
            elevation={5}
            style={{
              padding: '20px',
              outline: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Grid container direction="column" alignItems="stretch" spacing={3} xs>
              <Grid item xs>
                <TextField
                  label="Nom"
                  value={profileDetails.name}
                  onChange={(event) => handleInput('name', event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <MultifieldInput education={education} setEducation={setEducation} />
              <Grid item xs>
                <ChipInput
                  className={classes.inputBox}
                  label="Compétences"
                  variant="outlined"
                  helperText="Appuyer sur entrer pour ajouter des compétences"
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = profileDetails.skills
                    skills.splice(index, 1)
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    })
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Attestation de compétences (CV...) (.pdf)"
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier={'resume'}
                />
              </Grid>
              <Grid item xs>
                <FileUploadInput
                  className={classes.inputBox}
                  label="Photo de profil (.jpg/.png)"
                  icon={<FaceIcon />}
                  uploadTo={apiList.uploadProfileImage}
                  handleInput={handleInput}
                  identifier={'profile'}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: '10px 50px',
                marginTop: '30px',
                color: 'black',
                background: 'linear-gradient(62deg, #adc4d4 0%, #bcb4c5 100%)',
              }}
              onClick={() => handleUpdate()}
            >
              Mettre à jour les détails
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Profile
