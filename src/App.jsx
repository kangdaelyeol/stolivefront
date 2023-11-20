import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Room from './components/roomSection/Room'
import Header from './components/headerSection/Header'
import Home from './components/homeSection/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import ProfileEdit from './components/ProfileEdit'

const App = ({ DBService, AuthService }) => {
    const [login, setLogin] = useState({ status: false })
    return (
        <BrowserRouter>
            <Header login={login} setLogin={setLogin} />
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
                            DBService={DBService}
                            AuthService={AuthService}
                        />
                    }
                    path="/login"
                />
                <Route
                    element={
                        <Signup
                            DBService={DBService}
                            setLogin={setLogin}
                        />
                    }
                    path="/signup"
                />
                <Route
                    path="/edit"
                    element={
                        <ProfileEdit
                            setLogin={setLogin}
                            DBService={DBService}
                            user={login.data}
                            AuthService={AuthService}
                        />
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
