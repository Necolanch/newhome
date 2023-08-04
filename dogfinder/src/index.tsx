import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './pages/Login';
import { Search } from './pages/Search';
import { AuthService } from './services/auth/authService';
import { APIGateway } from './services/APIGateway';
import { ResponseHandler } from './services/ResponseHandler';

const apiGateway = new APIGateway();
const authGateway = new AuthService(apiGateway);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login authGateway={authGateway} />
  },
  {
    path: "/search",
    element: <Search />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();