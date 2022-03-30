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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

export const Activities = () => {
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
              {activities.map((activities) => (
                <TableRow
                  key={activities.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {activities.date}
                  </TableCell>
                  <TableCell align="right">{activities.timeSpent}</TableCell>
                  <TableCell align="right">{activities.created_at}</TableCell>
                  <TableCell align="right">{activities.description}</TableCell>
                  <TableCell align="right">{activities.is_confirmed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}
