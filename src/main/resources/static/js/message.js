async function sendMessage() {

    const chatId = localStorage.getItem('chatId');
    const content = document.getElementById('message-content').value;

    const sendedMessage = createMessage({role: 'user', content: content});
    const chatBox = document.getElementById('message-box');
    chatBox.appendChild(sendedMessage);

    const response = await fetch('/chat/' + chatId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content: content}),
    });
    const message = await response.json();
    const recievedMessage = createMessage(message);

    chatBox.appendChild(recievedMessage);

}

function createMessage(messageData) {
    const message = document.createElement('div');
    message.classList.add('comments');
    message.innerHTML = `
            <div class="comment-react">
                <button>
                    <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
                    </svg>
                </button>
                <hr>
                <span>14</span>
            </div>
                <div class="comment-container">
                    <div class="${messageData.role === 'user' ? 'user' : 'gpt'}">
                        <div class="user-pic">
                            <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                                <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                            </svg>
                        </div>
                        <div class="user-info">
                            <span>${messageData.role}</span>
                            <p>Wednesday, March 13th at 2:45pm</p>
                        </div>
                    </div>
                    <p class="comment-content" style="text-align: ${messageData.role === 'user' ? 'left' : 'right'}">
                        ${messageData.content}
                    </p>
                    
                </div>
        `;

    return message;
    
}

async function drawChat(chatId) {
    localStorage.setItem('chatId', chatId);

    try {
    const response = await fetch('/chat/' + chatId);
    const chat = await response.json();
    const messages = chat.messages;

    const chatBox = document.getElementById('message-box');
    chatBox.innerHTML = '';

    messages.forEach(messageData => {
        var message = document.createElement('div');
        message.classList.add('comments');
        message.innerHTML = `
            <div class="comment-react">
                <button>
                    <svg fill="none" viewBox="0 0 24 24" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M19.4626 3.99415C16.7809 2.34923 14.4404 3.01211 13.0344 4.06801C12.4578 4.50096 12.1696 4.71743 12 4.71743C11.8304 4.71743 11.5422 4.50096 10.9656 4.06801C9.55962 3.01211 7.21909 2.34923 4.53744 3.99415C1.01807 6.15294 0.221721 13.2749 8.33953 19.2834C9.88572 20.4278 10.6588 21 12 21C13.3412 21 14.1143 20.4278 15.6605 19.2834C23.7783 13.2749 22.9819 6.15294 19.4626 3.99415Z"></path>
                    </svg>
                </button>
                <hr>
                <span>14</span>
            </div>
                <div class="comment-container">
                    <div class="${messageData.role === 'user' ? 'user' : 'gpt'}">
                        <div class="user-pic">
                            <svg fill="none" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linejoin="round" fill="#707277" stroke-linecap="round" stroke-width="2" stroke="#707277" d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"></path>
                                <path stroke-width="2" fill="#707277" stroke="#707277" d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"></path>
                            </svg>
                        </div>
                        <div class="user-info">
                            <span>${messageData.role}</span>
                            <p>Wednesday, March 13th at 2:45pm</p>
                        </div>
                    </div>
                    <p class="comment-content" style="text-align: ${messageData.role === 'user' ? 'left' : 'right'}">
                        ${messageData.content}
                    </p>
                    
                </div>
        `;
        chatBox.appendChild(message);
    });
} catch (error) {
    console.error('Error:', error);
    }
}
