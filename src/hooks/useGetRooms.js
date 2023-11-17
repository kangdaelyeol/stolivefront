import { useEffect, useState } from 'react'

const tempRoomData = [
  {
      title: '정보보안기사 스터디',
      description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
      people: 3,
      category: '스터디',
      subCategory: ['자격증', '공부'],
      roomId: 'R_123456',
  },
  {
      title: '정보보안기사 스터디',
      description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
      people: 3,
      category: '스터디',
      subCategory: ['자격증', '공부'],
      roomId: 'R_1234567',
  },
  {
      title: '정보보안기사 스터디',
      description: '같이 정보보안기사 공부하는 방입니다.\n함께 공부해요!',
      people: 3,
      category: '스터디',
      subCategory: ['자격증', '공부'],
      roomId: 'R_123458',
  },
]

const useGetRooms = (DBService) => {
    const [roomData, setRoomData] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    // Room 받아오기
    useEffect(() => {
        setIsLoading(true)
        DBService.getRooms().then((result) => {
            if (!result) {
                setRoomData(tempRoomData)
                setIsLoading(false)
            } else {
                setRoomData([...result])
                setIsLoading(false)
            }
        })
    }, [refresh])

    return [roomData, isLoading, setRefresh]
}


export default useGetRooms