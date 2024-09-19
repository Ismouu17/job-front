/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { Button, Chip, Grid, Modal, Paper, Typography, makeStyles } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import { SetPopupContext } from '../../App'

import apiList from '../../utils/apiList'

const useStyles = makeStyles((theme) => ({
  body: {
    height: 'inherit',
  },
  statusBlock: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
  jobTileOuter: {
    padding: '30px',
    margin: '20px 0',
    boxSizing: 'border-box',
    width: '100%',
  },
  popupDialog: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const ApplicationTile = (props) => {
  const classes = useStyles()
  const { application } = props
  const setPopup = useContext(SetPopupContext)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(application.job.rating)

  const appliedOn = new Date(application.dateOfApplication)
  const joinedOn = new Date(application.dateOfJoining)

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating)
        console.log(response.data)
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: 'error',
          message: 'Error',
        })
      })
  }

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data)
        setPopup({
          open: true,
          severity: 'success',
          message: 'Note mis à jour avec succes',
        })
        fetchRating()
        setOpen(false)
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err)
        setPopup({
          open: true,
          severity: 'error',
          message: err.response.data.message,
        })
        fetchRating()
        setOpen(false)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [colorSet, setColoSet] = useState({
    applied: '#3454D1',
    shortlisted: '#DC851F',
    accepted: '#09BC8A',
    rejected: '#D1345B',
    deleted: '#B49A67',
    cancelled: '#FF8484',
    finished: '#4EA5D9',
  })

  return (
    <Paper className={classes.jobTileOuter} elevation={5}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{application.job.title}</Typography>
          </Grid>
          <Grid item>Posté par: {application.recruiter.name}</Grid>
          <Grid item>Rôle : {application.job.jobType}</Grid>
          <Grid item>Salaire : &#8355; {application.job.salary} par mois</Grid>
          <Grid item>
            Durée :{' '}
            {application.job.duration !== 0 ? `${application.job.duration} mois` : `Flexible`}
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: '2px' }} />
            ))}
          </Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          {application.status === 'accepted' || application.status === 'finished' ? (
            <Grid item>Rejoint le: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Paper
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
                color: '#ffffff',
              }}
            >
              {application.status}
            </Paper>
          </Grid>
          {application.status === 'accepted' || application.status === 'finished' ? (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.statusBlock}
                onClick={() => {
                  fetchRating()
                  setOpen(true)
                }}
              >
                Noter l'offre
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: '20px',
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minWidth: '30%',
            alignItems: 'center',
          }}
        >
          <Rating
            name="simple-controlled"
            style={{ marginBottom: '30px' }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue)
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: '10px 50px' }}
            onClick={() => changeRating()}
          >
            Soumettre
          </Button>
        </Paper>
      </Modal>
    </Paper>
  )
}

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setApplications(response.data)
      })
      .catch((err) => {
        // console.log(err.response);
        console.log(err.response.data)
        setPopup({
          open: true,
          severity: 'error',
          message: 'Error',
        })
      })
  }

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: '30px', minHeight: '93vh' }}
    >
      <Grid item>
        <Typography variant="h2">Candidatures</Typography>
      </Grid>
      <Grid
        container
        item
        xs
        direction="column"
        style={{ width: '100%' }}
        alignItems="stretch"
        justify="center"
      >
        {applications.length > 0 ? (
          applications.map((obj) => (
            <Grid item>
              <ApplicationTile application={obj} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: 'center' }}>
            Aucune candidature trouvée
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Applications
