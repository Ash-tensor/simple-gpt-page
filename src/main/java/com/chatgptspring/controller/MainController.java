package com.chatgptspring.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Setter @Getter
public class MainController {
    @GetMapping("/")
    public String index() {
        return "main";
    }


}
