import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import { getUsersActivitiesRequest } from "../requests"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chip from "@mui/material/Chip"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import SimpleBackdrop from "./BackDrop"

const useFetch = (id) => {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])

  const getActivities = async () => {
    const activities = await getUsersActivitiesRequest(id)
    setActivities(activities)
    setLoading(false)
  }

  useEffect(() => {
    getActivities()
  }, [])
  return { loading, activities }
}

const UsersActivitiesComponent = ({ activities, id }) => {
  const navigate = useNavigate()

  const chipColor = (data) => {
    if (data == 1) {
      return "success"
    } else {
      return "error"
    }
  }

  const chipText = (data) => {
    if (data == 1) {
      return "Patvirtinta"
    } else {
      return "Nepatvirtinta"
    }
  }

  console.log(activities)
  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Pradirbtas laikas</TableCell>
              <TableCell>Kada sukurtas</TableCell>
              <TableCell>Aprašymas</TableCell>
              <TableCell>Ar Patvirtinta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow
                key={activity.id}
                hover
                onClick={() => {
                  navigate(`/activities/${activity.id}`)
                }}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {format(new Date(activity?.date), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{activity.timeSpent}</TableCell>
                <TableCell>{activity.created_at}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {activity.description}
                </TableCell>
                <TableCell>
                  <Chip
                    label={chipText(activity.is_confirmed)}
                    color={chipColor(activity.is_confirmed)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export const UsersActivities = () => {
  const { id } = useParams()
  const { loading, activities } = useFetch(id)
  console.log(loading, activities, id)

  return !loading ? (
    <UsersActivitiesComponent activities={activities} id={id} />
  ) : (
    <SimpleBackdrop />
  )
}