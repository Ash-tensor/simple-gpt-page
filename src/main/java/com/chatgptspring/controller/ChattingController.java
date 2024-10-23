package com.chatgptspring.controller;

import com.chatgptspring.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@RequiredArgsConstructor
@Controller
public class ChattingController {
    private final ChatService chatService;

    @GetMapping("/chatpage")
    public String modelController(Model model) {
        model.addAttribute("chats", chatService.FindAllChats());
        return "chatting";
    }
}
