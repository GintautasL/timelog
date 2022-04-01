import { render } from "react-dom"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Activities } from "./pages/Activities"
import { EditActivity } from "./pages/EditActivity"
import { AdminEditActivity } from "./pages/AdminEditActivity"
import { EditUser } from "./pages/EditUser"
import { CreateActivity } from "./pages/CreateActivity"
import { UsersActivities } from "./pages/UsersActivities"
import { UserStatistics } from "./pages/UserStatistics"
import { MyProfile } from "./pages/MyProfile"
import { Users } from "./pages/Users"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as Interceptors from "./interceptors"
import { MainLayout } from "./layouts/MainLayout"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { PrivateRoute } from "./components/Routes/PrivateRoute"
import { AdminRoute } from "./components/Routes/AdminRoute"

const theme = createTheme()

const rootElement = document.getElementById("root")
render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<PrivateRoute />}>
              <Route path="/user" element={<MyProfile />} />
            </Route>
            <Route path="/users" element={<AdminRoute />}>
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/activities" element={<PrivateRoute />}>
              <Route path="/activities" element={<Activities />} />
            </Route>
            <Route path="/activity" element={<PrivateRoute />}>
              <Route path="/activity" element={<CreateActivity />} />
            </Route>
            <Route path="/activity/:id" element={<PrivateRoute />}>
              <Route path="/activity/:id" element={<EditActivity />} />
            </Route>
            <Route path="/users/:id" element={<AdminRoute />}>
              <Route path="/users/:id" element={<EditUser />} />
            </Route>
            <Route path="/users/:id/statistics" element={<AdminRoute />}>
              <Route
                path="/users/:id/statistics"
                element={<UserStatistics />}
              />
            </Route>
            <Route path="/users/:id/activities" element={<AdminRoute />}>
              <Route
                path="/users/:id/activities"
                element={<UsersActivities />}
              />
            </Route>
            <Route path="/activities/:id" element={<AdminRoute />}>
              <Route path="/activities/:id" element={<AdminEditActivity />} />
            </Route>
            <Route path="*" element={<div>404 not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </ThemeProvider>,
  rootElement
)
