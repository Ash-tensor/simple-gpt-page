function createNewChat() {
    // Ajax POST 요청으로 새 채팅 생성
    fetch('/chat/new', {
        method: 'POST'
    }).then(response => {
        if (response.ok) {
            // 새 채팅이 생성되면 채팅 목록을 다시 불러오는 함수 호출
            updateChatList();
        }
    }).catch(error => console.error('Error:', error));
}

// 채팅 목록을 새로 불러오는 함수
function updateChatList() {
    fetch('/chat')  // 채팅 목록을 불러올 API 엔드포인트
        .then(response => response.json())  // JSON 응답을 파싱
        .then(data => {
            const chatList = document.getElementById('chatList');
            chatList.innerHTML = '';  // 기존 채팅 목록 초기화

            // 불러온 데이터를 바탕으로 채팅 목록을 다시 렌더링
            data.forEach(chat => {
                const li = document.createElement('li');
                li.classList.add('nav-item');
                li.style.padding = '5px';

                li.innerHTML = `
                    <a href="#" class="nav-link active" aria-current="page">
                        <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
                        채팅 ${chat.id}
                    </a>
                `;
                chatList.appendChild(li);  // 새로 만든 항목을 목록에 추가
            });
        }).catch(error => console.error('Error:', error));
}