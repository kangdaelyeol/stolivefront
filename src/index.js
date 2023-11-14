import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { DBService } from './service'

const REQUEST_URL = 'http://localhost:8000'

const roomDBService = new DBService(REQUEST_URL)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App DBService={roomDBService} />)