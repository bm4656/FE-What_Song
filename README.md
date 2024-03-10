# 🎧 What Song (왓송)
> '지금 무슨 노래 들으세요? '
> 음악 특화 소셜 네트워크 서비스 What Song 입니다.

<div  align="center">
  <img width="40%" alt="ww" src="https://github.com/DY-WhatSong/FE-What_Song/assets/65716445/f6ddf0c1-bf50-4749-a27f-90fd57ce7fab">
</div>
</br>


## **🥳 what-song**


🎧 누구나 가지고 있는 자신만의 뮤직 플레이리스트 

💡 내 취향을 공유하면서 새로운 노래들도 쉽게 찾고

✍️ 공부하면서 같이 들으며 Study With Me 

🔎 Youtube API로 보다 다양한 음악 풀 

🙆‍♀️ 음악으로 자신을 표현할 수도 있어요!



## **🤩 주요 기능**

🏠 **MUSIC ROOM**
1. 뮤직룸 생성하기
2. 원하는 노래 검색해서 나만의 플레이리스트 만들기
3. 다른 사람과 실시간으로 같이 듣고 다른 사람의 요청 곡 받기
4. 하트 인터랙션으로 마음 표현하기

🔖 **MUSIC STORY**
1. 뮤직 스토리 생성하기
2. 표현하고 싶은 노래 검색 후 구간 선택하기
3. 뮤직 스토리 공유하고 친구들의 스토리 구경하기


## **🛠️ Skills &Tools**
<img width="948" alt="image" src="https://github.com/DY-WhatSong/FE-What_Song/assets/65716445/691aaf3d-266c-4417-95a2-5de8c9d56cf7">

**메인**: React, TypeScript, Next.js

**스타일**: tailwindCSS

**상태 관리**: react-query, jotai

**웹 소켓**: stomp.js, sock.js

**기타**: youtube api

### 💡 **배포 상태**
**메인**: [whatsong.vercel.app](https://whatsong.vercel.app/)

시연 영상: [youtube](https://www.youtube.com/watch?v=wz1cIz1ydNo)

## **🌱 Git**

### Branch
**Git-flow**
- `master (main)`: 바로 product로 release(배포)할 수 있는 브랜치
- `dev (develop)`: product로 release할 준비가 된 가장 안정적인 브랜치로 개발이 완료된 상태라면 **master** 브랜치로 merge
- `feature`: 새로운 기능을 추가할 때 사용하는 브랜치로 **dev** 브랜치에서 분기하여 진행되며, 개발이 완료된 기능은 **dev** 브랜치로 merge
  - **브랜치명 컨벤션** : `feat/{pageName}-{featureName}`

### Commit

| "feat: ~ " | 새로운 기능 추가 |
| --- | --- |
| "fix: ~ " | 버그 수정 |
| "docs" ~ " : | 문서 수정 |
| "style: ~ " | 코드 포맷팅 (코드 변경이 없는 경우) |
| "design: ~ " | CSS 등 사용자 UI 디자인 변경 |
| “refactor: ~” | 코드 리팩토링 |
| “test: ~” | 테스트 코드, 리팩토링 테스트 코드 추가 |
| “chore: ~” | 빌드,패키지 관련 수정 |
| "bug:" ~ "  | 버그에 대한 커밋 |
| "stories: ~" | 스토리북 관련 커밋 |