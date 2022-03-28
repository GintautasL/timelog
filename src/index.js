import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import {Login} from "./pages/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const rootElement = document.getElementById("root");
render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 not found</div>} />
        
      </Routes>
    </BrowserRouter>
  </ThemeProvider>,
  rootElement
);