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

import { getUserRequest, editUserRequest } from "../requests"

const useFetch = (id) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  const getUser = async () => {
    const user = await getUserRequest(id)
    setUser(user)
    setLoading(false)
  }

  useEffect(() => {
    getUser()
  }, [])
  return { loading, user }
}

const EditUserComponent = ({ user, id }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      position: user.position,
      is_confirmed: user.is_confirmed,
      email: user.email,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    const finalData = { ...data, email: null }
    await editUserRequest(finalData, id)
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
            REDAGUOTI DARBUOTOJO DUOMENIS
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      fullWidth
                      id="first_name"
                      label="Vardas"
                      name="first_name"
                      autoComplete="first_name"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      multiline
                      fullWidth
                      id="last_name"
                      label="Pavardė"
                      name="last_name"
                      autoComplete="last_name"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="email"
                      label="Pašto adresas"
                      name="email"
                      autoComplete="email"
                      InputProps={{
                        readOnly: true,
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name="position"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      id="position"
                      label="Pozicija"
                      name="position"
                      autoComplete="position"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
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

export const EditUser = () => {
  const { id } = useParams()
  const { loading, user } = useFetch(id)
  console.log(loading, user, id)

  return !loading ? (
    <EditUserComponent user={user} id={id} />
  ) : (
    <SimpleBackdrop />
  )
}
