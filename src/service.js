class HttpReq {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    postFetchReq = async (reqURL, body, headers = {}) => {
        try {
            const result = await fetch(`${this.baseURL}/${reqURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : null,
            })
            const json = await result.json()
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }
}

export class DBService {
    constructor(baseURL) {
        this.baseURL = baseURL
        this.http = new HttpReq(baseURL)
    }

    getRooms = async () => {
        const rooms = await this.http.postFetchReq('search')
        console.log(rooms)
        return rooms
    }

    createRoom = async (data) => {
        const result = await this.http.postFetchReq('create', { data })
        console.log(result)
        return result
    }

    getRoomById = async (roomid) => {
        const result = await this.http.postFetchReq('roominfo', { roomid })
        return result
    }
}

export class MongoService {
    constructor(baseURL) {
        this.http = new HttpReq(baseURL)
    }

    createUser = async (data) => {
        const result = await this.http.postFetchReq('createuser', { data })
        return result
    }

    updateUser = async (data) => {
        const result = await this.http.postFetchReq('updateuser', { data })
    }

    deleteUser = async (data) => {
        const result = await this.http.postFetchReq('deleteuser', { data })
    }

    login = async (data) => {
        const result = await this.http.postFetchReq('login', { data })
        return result
    }
}

export class AuthService {
    constructor(baseURL) {
        this.http = new HttpReq(baseURL)
    }

    checkJWT = async (token) => {
        const result = await this.http.postFetchReq('checkjwt', '', {
            Authorization: `Bearer ${token}`,
        })
        return result
    }
}
