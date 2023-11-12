import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from './components/roomSection/Room'
import Header from './components/Header'
import Home from './components/homeSection/Home'

const App = ({ DBService }) => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<Home DBService={DBService} />} path="/" />
                <Route element={<Room />} path="/room/:id" />
            </Routes>
        </BrowserRouter>
    )
}

export default App
