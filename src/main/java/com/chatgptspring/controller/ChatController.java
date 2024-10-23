package com.chatgptspring.controller;

import com.chatgptspring.domain.Chat;
import com.chatgptspring.repository.ChatRepository;
import com.chatgptspring.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/chat")
    public Iterable<Chat> FindAllChats() {
        return chatService.FindAllChats();
    }

    @PostMapping("/chat/new")
    public void CreateChat() {
        chatService.CreateChat();
    }

    @GetMapping("/chat/{chatId}")
    public Chat FindChatById(@PathVariable Long chatId) {
        return chatService.FindChatById(chatId);
    }


}
