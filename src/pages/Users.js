import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getAllUsers } from "../requests"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chip from "@mui/material/Chip"
import { format } from "date-fns"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import SimpleBackdrop from "./BackDrop"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CssBaseline from "@mui/material/CssBaseline"

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const users = await getAllUsers()
    setUsers(users)
    setLoading(false)
  }

  useEffect(() => {
    getUsers()
  }, [])
  return { loading, users }
}

export const Users = () => {
  const navigate = useNavigate()
  const { loading, users } = useFetch()

  const chipColor = (data) => {
    if (data == 1) {
      return "success"
    } else {
      return "error"
    }
  }

  const chipText = (data) => {
    if (data == 1) {
      return "Patvirtintas"
    } else {
      return "Nepatvirtintas"
    }
  }

  console.log(users)
  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      {loading ? (
        <SimpleBackdrop />
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
            <Typography component="h1" variant="h5" mb={3}>
              DARBUOTOJAI
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Vardas</TableCell>
                    <TableCell>Pavardė</TableCell>
                    <TableCell>Pozicija</TableCell>
                    <TableCell>Pašto adresas</TableCell>
                    <TableCell>Ar Patvirtinta</TableCell>
                    <TableCell>Redaguoti</TableCell>
                    <TableCell>Statistika</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      onClick={() => {
                        navigate(`/users/${user.id}/activities`) // change this
                      }}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.first_name}
                      </TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={chipText(user.is_confirmed)}
                          color={chipColor(user.is_confirmed)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/users/${user.id}`)
                          }}
                        >
                          Redaguoti
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={(e) => {
                            e.stopPropagation()
                            navigate(`/users/${user.id}/statistics`)
                          }}
                        >
                          Statistika
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
    </Container>
  )
}
