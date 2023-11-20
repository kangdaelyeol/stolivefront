import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthService, DBService } from './service'

const REQUEST_URL = process.env.REACT_APP_BASE_URL

const dbService = new DBService(REQUEST_URL)
const authService = new AuthService(REQUEST_URL)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App DBService={dbService} AuthService={authService} />)
