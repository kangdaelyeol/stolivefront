import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from './components/Room'
import Header from './components/Header'
import Home from './components/Home'

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Room />} path="/room" />
            </Routes>
        </BrowserRouter>
    )
}

export default App
