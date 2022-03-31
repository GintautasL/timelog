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
import { format } from "date-fns"
import Switch from "@mui/material/Switch"
import Tooltip from "@mui/material/Tooltip"
import SimpleBackdrop from "./BackDrop"

import { adminActivityRequest, adminEditActivity } from "../requests"

const useFetch = (id) => {
  const [loading, setLoading] = useState(true)
  const [activity, setActivity] = useState({})

  const getActivity = async () => {
    const activity = await adminActivityRequest(id)
    setActivity(activity)
    setLoading(false)
  }

  useEffect(() => {
    getActivity()
  }, [])
  return { loading, activity }
}

const AdminEditActivityComponent = ({ activity, id }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: new Date(activity.date),
      timeSpent: activity.timeSpent,
      description: activity.description,
      is_confirmed: activity.is_confirmed,
    },
  })
  console.log(new Date(activity.date))

  const onSubmit = handleSubmit(async (data) => {
    const finalData = { ...data, date: format(data.date, "yyyy-MM-dd") }
    await adminEditActivity(finalData, id, activity.user_id)
  })

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 1,
      }}
    >
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
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DesktopDatePicker
                        label="Psirinkti datą"
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
                      multiline
                      fullWidth
                      id="description"
                      label="Aprašymas"
                      name="description"
                      autoComplete="description"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  label="patvirtinti"
                  name="is_confirmed"
                  control={control}
                  render={({ field }) => (
                    <Tooltip title="Patvirtinti">
                      <Switch
                        onChange={(e) => field.onChange(e.target.checked)}
                        checked={Boolean(field.value)}
                        color="success"
                        sx={{
                          ml: 2,
                          mt: 1,
                        }}
                        {...field}
                      />
                    </Tooltip>
                  )}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Patvirtinti pakeitimus
              </Button>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export const AdminEditActivity = () => {
  const { id } = useParams()
  const { loading, activity } = useFetch(id)
  console.log(loading, activity, id)

  return !loading ? (
    <AdminEditActivityComponent activity={activity} id={id} />
  ) : (
    <SimpleBackdrop />
  )
}
