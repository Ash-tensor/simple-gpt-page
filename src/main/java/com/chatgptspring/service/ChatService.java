package com.chatgptspring.service;

import com.chatgptspring.domain.Chat;
import com.chatgptspring.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChatService {
    private final ChatRepository chatRepository;
    public Chat CreateChat() {
        Chat chat = new Chat();
        chatRepository.save(chat);
        return chat;
    }

    public Iterable<Chat> FindAllChats() {
        return chatRepository.findAll();
    }

    public void DeleteChat(Long chatId) {
        chatRepository.deleteById(chatId);
    }

    public Chat FindChatById(Long chatId) {
        return chatRepository.findById(chatId).orElse(null);
    }

}
