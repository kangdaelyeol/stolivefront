class HttpReq {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    postFetchReq = async (reqURL, body) => {
        try {
            const result = await fetch(`${this.baseURL}/${reqURL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
        const result = await this.http.postFetchReq('roominfo',{roomid})
        return result;
    }
}

export class MongoService {
    constructor(baseURL) {
        this.http = new HttpReq(baseURL)
    }
    
    createUser = async (data) => {
        const result = await this.http.postFetchReq('createuser', {data})
        return result
    }

    updateUser = async (data) => {
        const result = await this.http.postFetchReq("updateuser", {data})
    }

    deleteUser = async (data) => {
        const result = await this.http.postFetchReq("deleteuser", {data})
    }
}