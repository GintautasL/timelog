import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Paper } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import Chip from "@mui/material/Chip"
import { useParams } from "react-router-dom"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"
import Stack from "@mui/material/Stack"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"

import { myActivityRequest, editMyActivity } from "../requests"

const useFetch = (id) => {
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState({})

  const getActivity = async () => {
    const activity = await myActivityRequest(id)
    setActivity(activity)
    setLoading(false)
  }

  useEffect(() => {
    getActivity()
  }, [])
  return { loading, activity }
}

export const EditActivity = () => {
  // entry
  const { id } = useParams()
  const { loading, activity } = useFetch(id)

  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: activity.date,
      timeSpent: activity.timeSpent,
      description: activity.description,
    },
  })
  const chipColor = () => {
    if (activity.is_confirmed == 1) {
      return "success"
    } else {
      return "error"
    }
  }

  const chipText = () => {
    if (activity.is_confirmed == 1) {
      return "Patvirtintas"
    } else {
      return "Nepatvirtintas"
    }
  }

  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54")) //date

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  const onSubmit = handleSubmit(async (data) => {
    await editMyActivity(data)
  })

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 1,
      }}
    >
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <Paper elevation={3} sx={{ padding: "24px" }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              MANO VEIKLA
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        defaultValue={activity.date}
                        autoComplete="given-date"
                        name="date"
                        required
                        fullWidth
                        id="date"
                        label="Data"
                        autoFocus
                        {...field}
                      />
                    )}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <DesktopDatePicker
                          label="Date desktop"
                          defaultValue={activity.date}
                          inputFormat="MM/dd/yyyy"
                          renderInput={(params) => <TextField {...params} />}
                          {...field}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="timeSpent"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        defaultValue={activity.timeSpent}
                        required
                        fullWidth
                        id="timeSpent"
                        label="Pradirbtas laikas"
                        name="timeSpent"
                        autoComplete="timeSpent"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        defaultValue={activity.description}
                        multiline
                        fullWidth
                        id="description"
                        label="Aprašymas"
                        name="description"
                        autoComplete="description"
                        InputProps={{
                          readOnly: true,
                        }}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4} sx={{ paddingLeft: 50 }}>
                  <Controller
                    name="is_confirmed"
                    control={control}
                    render={({ field }) => (
                      <Chip
                        label={chipText(activity.is_confirmed)}
                        size="50px"
                        sx={{
                          height: 54,
                          width: 128,
                          fontSize: 16,
                          ml: 8,
                        }}
                        color={chipColor(activity.is_confirmed)}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Button
                  type="submit"
                  justifyContent="left"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Patvirtinti pakeitimus
                </Button>
              </Grid>
            </Box>
          </Box>
        </Paper>
      )}
    </Container>
  )
}
