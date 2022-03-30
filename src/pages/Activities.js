import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getMyActivities } from "../requests"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chip from "@mui/material/Chip"

const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])

  const getActivities = async () => {
    const activities = await getMyActivities()
    setActivities(activities)
    setLoading(false)
  }

  useEffect(() => {
    getActivities()
  }, [])
  return { loading, activities }
}

export const Activities = () => {
  const navigate = useNavigate()
  const { loading, activities } = useFetch()

  console.log(activities)
  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      {loading ? (
        <h2>loading...</h2>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell align="right">Pradirbtas laikas</TableCell>
                <TableCell align="right">Kada sukurtas</TableCell>
                <TableCell align="right">Aprašymas</TableCell>
                <TableCell align="right">Patvirtinta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => (
                <TableRow
                  key={activity.id}
                  hover
                  onClick={() => {
                    navigate(`/activity/${activity.id}`)
                  }}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {activity.date}
                  </TableCell>
                  <TableCell align="right">{activity.timeSpent}</TableCell>
                  <TableCell align="right">{activity.created_at}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      maxWidth: 100,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {activity.description}
                  </TableCell>
                  <TableCell align="right">
                    <Chip label="primary" color="primary" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
