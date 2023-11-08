export class dbService {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    getRooms = async () => {
        try {
            const result = await fetch(`${this.baseURL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const json = await result.json()
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }

    createRoom = async (data) => {
        try {
            const result = await fetch(`${this.baseURL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  data
                })
            })
            const json = await result.json()
            console.log(json)
            return json
        } catch (e) {
            console.log(e)
            return false
        }
    }
}
