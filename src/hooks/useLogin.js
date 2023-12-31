import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../service'

const REQUEST_URL = process.env.REACT_APP_BASE_URL
const authService = new AuthService(REQUEST_URL)

const useLogin = (setLogin, path) => {
    const navigate = useNavigate()
    useEffect(() => {
        ;(async () => {
            const jwt = localStorage.getItem('JWT')
            if (!jwt) {
                return navigate('/login')
            }
            
            const res = await authService.checkJWT(jwt)
            console.log(res.data)
            if (!res.status) {
                navigate('/login')
                return setLogin({ status: false })
            }
            setLogin({ status: true, data: res.data })
            navigate(path)
        })()
    }, [])
}

export default useLogin
