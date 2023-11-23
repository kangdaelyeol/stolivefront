import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
                        <LoggedInOnly
                            authService={AuthService}
                            setLogin={setLogin}
                        >
                            <Home login={login} DBService={DBService} />
                        </LoggedInOnly>
                    }
                    path="/home"
                />
                <Route
                    element={
                        <LoggedInOnly
                            authService={AuthService}
                            setLogin={setLogin}
                        >
                            <Room DBService={DBService} userData={login.data} />
                        </LoggedInOnly>
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
                            login={login}
                            setLogin={setLogin}
                        />
                    }
                    path="/signup"
                />
                <Route
                    path="/edit"
                    element={
                        <LoggedInOnly
                            authService={AuthService}
                            setLogin={setLogin}
                        >
                            <ProfileEdit
                                setLogin={setLogin}
                                DBService={DBService}
                                user={login.data}
                                AuthService={AuthService}
                            />
                        </LoggedInOnly>
                    }
                />
                <Route path="*" element={<RedirectoToLoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App

function LoggedInOnly({ children, authService, setLogin }) {
    const navigate = useNavigate()

    useEffect(() => {
        ;(async () => {
            const jwt = localStorage.getItem('JWT')

            if (!jwt) {
                navigate('/login')
                return
            }

            const res = await authService.checkJWT(jwt)
            console.log(res.data)
            if (!res.status) {
                navigate('/login')
                return
            }
            setLogin({ status: true, data: res.data })
        })()
    }, [])

    return children
}

function RedirectoToLoginPage() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/login')
    }, [])
}
