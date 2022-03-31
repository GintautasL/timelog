import { render } from "react-dom"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Activities } from "./pages/Activities"
import { EditActivity } from "./pages/EditActivity"
import { EditUser } from "./pages/EditUser"
import { CreateActivity } from "./pages/CreateActivity"
import { MyProfile } from "./pages/MyProfile"
import { Users } from "./pages/Users"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as Interceptors from "./interceptors"
import { MainLayout } from "./layouts/MainLayout"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"

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
            <Route path="/user" element={<MyProfile />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/activity" element={<CreateActivity />} />
            <Route path="/activity/:id" element={<EditActivity />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="*" element={<div>404 not found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </ThemeProvider>,
  rootElement
)
