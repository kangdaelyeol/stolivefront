const ROOM_LENGTH = 30

const tempRoomData = []

const categorys = ['스터디', '운동', '혼밥', '고민상담']
const subCategorys = ['1학년만', '2학년만', '3학년만', '4학년만']
const titles = [
    '정보보안기사 스터디',
    '하 진짜 힘들다',
    '뭐하지',
    '살기 힘드네여',
    '아무나 도와줘..',
    '어떵하카',
    '뭐먹카',
    '호리싯',
    '공부 할사람',
    '공부 그만 하는 법 아시는분?',
    '코딩 하기 싫어',
    '무사?',
]
const descriptions = [
    '열정적인 취미 공유 채팅방',
    '여행 애호가들을 위한 세계 탐험 채팅방',
    '책과 문학에 대한 깊은 대화를 나누는 채팅방',
    '영화 및 TV 시리즈 팬들을 위한 토론 채팅방',
    '음악과 악기에 대한 정보를 공유하는 채팅방',
    '건강과 피트니스에 관심있는 사람들의 채팅방',
    '기술 및 프로그래밍 노하우를 나누는 채팅방',
    '요리와 레시피를 공유하는 맛있는 채팅방',
    '게임과 e스포츠 팬들을 위한 채팅방',
    '펫과 동물 사랑을 나누는 채팅방',
    '열정적인 취미 공유 채팅방',
    '여행 애호가들을 위한 세계 탐험 채팅방',
    '책과 문학에 대한 깊은 대화를 나누는 채팅방',
    '영화 및 TV 시리즈 팬들을 위한 토론 채팅방',
    '음악과 악기에 대한 정보를 공유하는 채팅방',
    '건강과 피트니스에 관심있는 사람들의 채팅방',
    '기술 및 프로그래밍 노하우를 나누는 채팅방',
    '요리와 레시피를 공유하는 맛있는 채팅방',
    '게임과 e스포츠 팬들을 위한 채팅방',
    '펫과 동물 사랑을 나누는 채팅방',
    '스타트업과 창업에 관한 노하우를 공유하는 채팅방',
    '세계 여러 나라의 문화와 언어를 배우는 채팅방',
    '자기 계발과 목표 설정에 대한 아이디어를 나누는 채팅방',
    '영화 제작과 각본 쓰기에 대한 팁을 공유하는 채팅방',
    '수공예 및 DIY 프로젝트에 대한 아이디어 채팅방',
    '반려동물의 건강과 관리에 대한 정보를 공유하는 채팅방',
    '원예와 실내 정원 가꾸기에 대한 팁을 나누는 채팅방',
    '여행 사진과 경험을 공유하는 채팅방',
    '패션과 스타일링에 대한 조언을 나누는 채팅방',
    '커피와 차에 대한 깊은 지식을 공유하는 채팅방',
    '창작 글쓰기와 시나리오 작성에 대한 토론 채팅방',
    '과학과 기술의 최신 동향에 대해 논의하는 채팅방',
    '운동과 스포츠 활동에 대한 정보 교환 채팅방',
    '식물 기반 식생활과 요리 레시피를 공유하는 채팅방',
    '포토그래피 스킬과 기술을 공유하는 채팅방',
    '재테크와 개인 금융 관리에 대한 팁을 나누는 채팅방',
    '역사와 세계 사건에 대해 배우고 토론하는 채팅방',
    '비디오 게임과 게임 개발에 대한 토론 채팅방',
    '차량 유지 보수와 자동차에 대한 팁을 공유하는 채팅방',
    '예술과 창작 활동에 대한 영감을 나누는 채팅방',
]

for (let i = 0; i < ROOM_LENGTH; i++) {
    const cIndex = Math.floor(Math.random() * categorys.length)
    const sIndex = Math.floor(Math.random() * subCategorys.length)
    const tIndex = Math.floor(Math.random() * titles.length)
    const dIndex = Math.floor(Math.random() * descriptions.length)
    const users = {
        length: Math.floor(Math.random() * 30),
    }
    tempRoomData.push({
        title: titles[tIndex],
        category: categorys[cIndex],
        subCategory: [subCategorys[sIndex]],
        description: descriptions[dIndex],
        users,
        roomId: '',
    })
}

export default tempRoomData
