import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Container from "@mui/material/Container"
import {
  getUsersStatisticsRequest,
  adminDeleteActivity,
  myActivityRequest,
} from "../requests"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Chip from "@mui/material/Chip"
import { format } from "date-fns"
import { useParams } from "react-router-dom"
import SimpleBackdrop from "./BackDrop"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui"
import { AppRegistrationOutlined } from "@mui/icons-material"

const useFetch = (id, query) => {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])

  const getActivities = async () => {
    const activities = await getUsersStatisticsRequest(id, query)
    setActivities(activities)
    setLoading(false)
  }

  useEffect(() => {
    getActivities()
  }, [])
  return { loading, activities }
}

const zeroPad = (num, places) => String(num).padStart(places, "0")

const getMonthDaysObject = (year, month) => {
  const final = {}
  for (let i = 1; i <= 31; i++) {
    const date = `${zeroPad(month, 2)}-${zeroPad(i, 2)}`
    final[date] = { date: date, timeSpent: 0 }
  }
  return final
}

const getProcessedActivities = (activities, year, month) => {
  const final = getMonthDaysObject(year, month)
  activities.forEach((activity) => {
    const formatedActivityDate = format(new Date(activity?.date), "MM-dd")
    if (final[formatedActivityDate]) {
      final[formatedActivityDate].timeSpent += activity.timeSpent
    }
  })
  return Object.values(final)
}

const UserStatisticsComponent = ({ activities, id }) => {
  const navigate = useNavigate()

  activities.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
  console.log("activities")
  console.log(activities)

  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      <Paper>
        <Chart data={activities}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis max={30}></ValueAxis>
          <BarSeries valueField="timeSpent" argumentField="date" />
          <Title text="Statistics" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const UserStatistics = () => {
  const { id } = useParams()
  const { loading, activities } = useFetch(id, { year: 2022, month: 4 })
  console.log(loading, activities, id)

  //   activities.map((activity) => {
  //     ;(data.date = format(new Date(activity?.date), "yyyy-MM-dd")),
  //       (data.timeSpent = myActivityRequest.timeSpent)
  //   })

  return !loading ? (
    <UserStatisticsComponent
      activities={getProcessedActivities(activities, 2022, 4)}
      id={id}
    />
  ) : (
    <SimpleBackdrop />
  )
}
