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

import { myProfileRequest, editMyProfile } from "../requests"

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({})

  const getProfile = async () => {
    const profile = await myProfileRequest()
    setProfile(profile)
    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])
  return { loading, profile }
}

const MyProfileComponent = ({ profile }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      position: profile.position,
    },
  })

  const chipColor = () => {
    if (profile.is_confirmed == 1) {
      return "success"
    } else {
      return "error"
    }
  }

  const chipText = () => {
    if (profile.is_confirmed == 1) {
      return "Patvirtintas"
    } else {
      return "Nepatvirtintas"
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const finalData = { ...data, email: null }
    console.log(finalData)
    await editMyProfile(finalData)
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
            MANO PROFILIS
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="Vardas"
                      autoFocus
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
                      required
                      fullWidth
                      id="lastName"
                      label="Pavardė"
                      name="lastName"
                      autoComplete="family-name"
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
                      label={chipText(profile.is_confirmed)}
                      size="50px"
                      sx={{
                        height: 54,
                        width: 128,
                        fontSize: 16,
                        ml: 8,
                      }}
                      color={chipColor(profile.is_confirmed)}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: "auto" }}
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

export const MyProfile = () => {
  const { loading, profile } = useFetch()
  console.log(loading, profile)

  return !loading ? <MyProfileComponent profile={profile} /> : "Loading..."
}
