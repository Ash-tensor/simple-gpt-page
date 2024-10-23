package com.chatgptspring.controller;

import com.chatgptspring.domain.Message;
import com.chatgptspring.service.ChatService;
import com.chatgptspring.service.MessageService;
import dto.ChatDTO;
import dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
public class MessageController {
    private final ChatService chatService;
    private final MessageService messageService;

//    @PostMapping("/chat/{chatId}/{message}")
//    public Message CreateMessage(@PathVariable Long chatId, @PathVariable String message) {
//        return messageService.SendMessage(chatId, message);
//    }

    @PostMapping("/chat/{chatId}")
    public Message CreateMessage(@PathVariable Long chatId, @RequestBody MessageDTO messageDTO) {
        String messageContent = messageDTO.getContent();
        return messageService.SendMessage(chatId, messageContent);
    }

    @GetMapping("/chat/test/{chatId}/{message}")
    public ChatDTO TestMessage(@PathVariable Long chatId, @PathVariable String message) {
        return messageService.testMessageSend(chatId, message);
    }
}
