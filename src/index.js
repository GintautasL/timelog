import { render } from "react-dom"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { Activities } from "./pages/Activities"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import * as Interceptors from "./interceptors"
import { MainLayout } from "./layouts/MainLayout"

const theme = createTheme()

const rootElement = document.getElementById("root")
render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<div>user dashboard</div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
)
