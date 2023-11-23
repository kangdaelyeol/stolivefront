import { useEffect, useState } from 'react'

const useGetRooms = (DBService, tempRoomData) => {
    const [roomData, setRoomData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // Room 받아오기
    useEffect(() => {
        setIsLoading(true)
        DBService.getRooms().then((result) => {
            if (!result || !result.length) {
                setRoomData(tempRoomData)
            } else {
                setRoomData([...result])
            }
            setIsLoading(false)
        })
    }, [refresh])

    return [roomData, isLoading, setRefresh]
}


export default useGetRooms