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
import DatePicker from "@mui/lab/DatePicker"
import { TextField } from "@mui/material"
import Grid from "@mui/material/Grid"

const useFetch = (id, date) => {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])
  const query = { year: date.getFullYear(), month: date.getMonth() + 1 }

  const getActivities = async () => {
    const activities = await getUsersStatisticsRequest(id, query)
    setActivities(activities)
    setLoading(false)
  }

  useEffect(() => {
    getActivities()
  }, [date])
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
  activities?.forEach((activity) => {
    const formatedActivityDate = format(new Date(activity?.date), "MM-dd")
    if (final[formatedActivityDate]) {
      final[formatedActivityDate].timeSpent += activity.timeSpent
    }
  })
  return Object.values(final)
}

const UserStatisticsComponent = ({ activities, id, value, setValue }) => {
  const navigate = useNavigate()

  activities.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })
  console.log("activities")
  console.log(activities)
  console.log("value")
  //console.log(value.getFullYear())
  //console.log(value.getMonth())

  return (
    <Container maxWidth="xl" sx={{ marginTop: 3 }}>
      <Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} ml={2}>
            <DatePicker
              views={["month", "year"]}
              label="Year and Month"
              minDate={new Date("2022-01-01")}
              maxDate={new Date("2033-06-01")}
              value={value}
              onChange={(newValue) => {
                setValue(newValue)
              }}
              renderInput={(params) => (
                <TextField {...params} helperText={null} />
              )}
            />
          </Grid>
        </Grid>
        <Chart data={activities}>
          <ArgumentAxis></ArgumentAxis>
          <ValueAxis max={30}></ValueAxis>
          <BarSeries valueField="timeSpent" argumentField="date" />
          <Title text="Darbuotojo statistika" />
        </Chart>
      </Paper>
    </Container>
  )
}

export const UserStatistics = () => {
  const { id } = useParams()
  const [value, setValue] = useState(new Date()) //date
  const { loading, activities } = useFetch(id, value)
  console.log(loading, activities, id, value)
  console.log("test")

  return !loading ? (
    <UserStatisticsComponent
      activities={getProcessedActivities(
        activities,
        value.getFullYear(),
        value.getMonth() + 1
      )}
      id={id}
      value={value}
      setValue={setValue}
    />
  ) : (
    <SimpleBackdrop />
  )
}
