import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from './components/roomSection/Room'
import Header from './components/Header'
import Home from './components/homeSection/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const App = ({ DBService }) => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<Home DBService={DBService} />} path="/" />
                <Route
                    element={<Room DBService={DBService} />}
                    path="/room/:id"
                />
                <Route element={<Login />} path="/login" />
                <Route element={<Signup />} path="/signup" />
            </Routes>
        </BrowserRouter>
    )
}

export default App
