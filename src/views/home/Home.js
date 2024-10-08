/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  Slider,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import FilterListIcon from '@material-ui/icons/FilterList'
import SearchIcon from '@material-ui/icons/Search'
import Rating from '@material-ui/lab/Rating'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import { SetPopupContext } from '../../App'

import apiList from '../../utils/apiList'
import { userType } from '../../utils/isAuth'

const useStyles = makeStyles((theme) => ({
  body: {
    height: 'inherit',
  },
  button: {
    width: '100%',
    height: '100%',
    background: '#4875B4',
  },
  jobTileOuter: {
    padding: '30px',
    margin: '20px 0',
    boxSizing: 'border-box',
    width: '95%',
  },
  popupDialog: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const JobTile = (props) => {
  const classes = useStyles()
  const { job } = props
  const setPopup = useContext(SetPopupContext)

  const [open, setOpen] = useState(false)
  const [sop, setSop] = useState('')

  const handleClose = () => {
    setOpen(false)
    setSop('')
  }

  const handleApply = () => {
    console.log(job._id)
    console.log(sop)
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: 'success',
          message: response.data.message,
        })
        handleClose()
      })
      .catch((err) => {
        console.log(err.response)
        setPopup({
          open: true,
          severity: 'error',
          message: err.response.data.message,
        })
        handleClose()
      })
  }

  const deadline = new Date(job.deadline).toLocaleDateString()

  return (
    <Paper className={classes.jobTileOuter} elevation={5}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{job.title}</Typography>
          </Grid>
          <Grid item>
            <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
          </Grid>
          <Grid item>Type : {job.jobType}</Grid>
          <Grid item>Salaire : &#8355; {job.salary} par mois</Grid>
          <Grid item>Durée : {job.duration !== 0 ? `${job.duration} month` : `Flexible`}</Grid>
          <Grid item>Posté par : {job.recruiter.name}</Grid>
          <Grid item>Date limite de candidature : {deadline}</Grid>

          <Grid item>
            {job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: '2px' }} />
            ))}
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(true)
            }}
            disabled={userType() === 'recruiter'}
          >
            Postuler
          </Button>
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
            minWidth: '50%',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Déclaration d'intention (Jusqu'à 250 mots)"
            multiline
            rows={8}
            style={{ width: '100%', marginBottom: '30px' }}
            variant="outlined"
            value={sop}
            onChange={(event) => {
              if (
                event.target.value.split(' ').filter(function (n) {
                  return n != ''
                }).length <= 250
              ) {
                setSop(event.target.value)
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: '10px 50px' }}
            onClick={() => handleApply()}
          >
            Soumettre
          </Button>
        </Paper>
      </Modal>
    </Paper>
  )
}

const FilterPopup = (props) => {
  const classes = useStyles()
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props
  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Paper
        style={{
          padding: '50px',
          outline: 'none',
          minWidth: '50%',
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Type de l'offre
            </Grid>
            <Grid
              container
              item
              xs={9}
              justify="space-around"
              // alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="fullTime"
                      checked={searchOptions.jobType.fullTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        })
                      }}
                    />
                  }
                  label="Temps plein"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="partTime"
                      checked={searchOptions.jobType.partTime}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        })
                      }}
                    />
                  }
                  label="Temps partiel"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wfh"
                      checked={searchOptions.jobType.wfh}
                      onChange={(event) => {
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            [event.target.name]: event.target.checked,
                          },
                        })
                      }}
                    />
                  }
                  label="Travail à domicile"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Salaire
            </Grid>
            <Grid item xs={9}>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => {
                  return value * (100000 / 100)
                }}
                marks={[
                  { value: 0, label: '0' },
                  { value: 100, label: '100000' },
                ]}
                value={searchOptions.salary}
                onChange={(event, value) =>
                  setSearchOptions({
                    ...searchOptions,
                    salary: value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Durée
            </Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Durée"
                variant="outlined"
                fullWidth
                value={searchOptions.duration}
                onChange={(event) =>
                  setSearchOptions({
                    ...searchOptions,
                    duration: event.target.value,
                  })
                }
              >
                <MenuItem value="0">Tout</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={3}>
              Filtre
            </Grid>
            <Grid item container direction="row" xs={9}>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
              >
                <Grid item>
                  <Checkbox
                    name="salary"
                    checked={searchOptions.sort.salary.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="salary"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="salary">
                    <Typography>Salaire</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.salary.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            desc: !searchOptions.sort.salary.desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort.salary.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
              >
                <Grid item>
                  <Checkbox
                    name="duration"
                    checked={searchOptions.sort.duration.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="duration"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="duration">
                    <Typography>Durée</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.duration.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            desc: !searchOptions.sort.duration.desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort.duration.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs={4}
                justify="space-around"
                alignItems="center"
                style={{ border: '1px solid #D1D1D1', borderRadius: '5px' }}
              >
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort.rating.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    id="rating"
                  />
                </Grid>
                <Grid item>
                  <label htmlFor="rating">
                    <Typography>Notes</Typography>
                  </label>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.rating.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            desc: !searchOptions.sort.rating.desc,
                          },
                        },
                      })
                    }}
                  >
                    {searchOptions.sort.rating.desc ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{
                padding: '10px 50px',
                color: 'black',
                background: 'linear-gradient(62deg, #adc4d4 0%, #bcb4c5 100%)',
              }}
              onClick={() => getData()}
            >
              Appliquer
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}

const Home = (props) => {
  const [jobs, setJobs] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)
  const [searchOptions, setSearchOptions] =
    useState(
    {
      query: '',
      jobType: {
        fullTime: false,
        partTime: false,
        wfh: false,
      },
      salary: [0, 100],
      duration: '0',
      sort: {
        salary: {
          status: false,
          desc: false,
        },
        duration: {
          status: false,
          desc: false,
        },
        rating: {
          status: false,
          desc: false,
        },
      },
    })

  const setPopup = useContext(SetPopupContext)
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    let searchParams = []
    if (searchOptions.query !== '') {
      searchParams = [...searchParams, `q=${searchOptions.query}`]
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`]
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`]
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`]
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [...searchParams, `salaryMin=${searchOptions.salary[0] * 1000}`]
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [...searchParams, `salaryMax=${searchOptions.salary[1] * 1000}`]
    }
    if (searchOptions.duration != '0') {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`]
    }

    let asc = [],
      desc = []

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj]
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`]
        } else {
          asc = [...asc, `asc=${obj}`]
        }
      }
    })
    searchParams = [...searchParams, ...asc, ...desc]
    const queryString = searchParams.join('&')
    console.log(queryString)
    let address = apiList.jobs
    if (queryString !== '') {
      address = `${address}?${queryString}`
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        setJobs(
          response.data.filter((obj) => {
            const today = new Date()
            const deadline = new Date(obj.deadline)
            return deadline > today
          }),
        )
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

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: '30px', minHeight: '93vh' }}
      >
        <Grid item container direction="column" justify="center" alignItems="center">

          <Grid item xs>
            <TextField
              label="Rechercher une offre"
              value={searchOptions.query}
              onChange={(event) =>
                setSearchOptions({
                  ...searchOptions,
                  query: event.target.value,
                })
              }
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  getData()
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => getData()}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: '500px' }}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setFilterOpen(true)}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container item xs direction="row" alignItems="stretch" justify="center">
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return <JobTile job={job} />
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              Aucunce offre trouvée
            </Typography>
          )}
        </Grid>
      </Grid>
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData()
          setFilterOpen(false)
        }}
      />
    </>
  )
}

export default Home
