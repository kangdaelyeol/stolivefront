import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from './components/roomSection/Room'
import Header from './components/headerSection/Header'
import Home from './components/homeSection/Home'
import Login from './components/Login'
import Signup from './components/Signup'

const App = ({ DBService, MongoService, AuthService }) => {
    const [login, setLogin] = useState({ status: false })

    return (
        <BrowserRouter>
            <Header login={login} />
            <Routes>
                <Route
                    element={
                        <Home
                            login={login}
                            setLogin={setLogin}
                            DBService={DBService}
                        />
                    }
                    path="/home"
                />
                <Route
                    element={
                        <Room
                        login={login}
                        setLogin={setLogin}
                        DBService={DBService}
                        />
                    }
                    path="/room/:id"
                />
                <Route
                    element={
                        <Login
                            login={login}
                            setLogin={setLogin}
                            MongoService={MongoService}
                            AuthService={AuthService}
                        />
                    }
                    path="/login"
                />
                <Route
                    element={
                        <Signup
                            MongoService={MongoService}
                            login={login}
                            setLogin={setLogin}
                        />
                    }
                    path="/signup"
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
