package com.chatgptspring.service;

import com.chatgptspring.domain.Chat;
import com.chatgptspring.domain.Message;
import com.chatgptspring.repository.MessageRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dto.ChatDTO;
import dto.MessageDTO;
import io.netty.handler.codec.http.HttpResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageService {
    private final ChatService chatService;
    private final MessageRepository messageRepository;
    @Autowired
    private WebClient webClient;
    @Autowired
    private ObjectMapper objectMapper;

    public ChatDTO testMessageSend(Long chatId, String content) {
        Chat chat = chatService.FindChatById(chatId);
        Message message = new Message();
        message.setChat(chat);
        message.setRole("user");
        message.setContent(content);
        messageRepository.save(message);

        List<Message> messages = chat.getMessages();
        List<MessageDTO> messageDTOs = new ArrayList<>();

        // 이게 지금 아무것도 안들어가고 있는 것 같은데

        for (Message m : messages) {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setRole(m.getRole());
            messageDTO.setContent(m.getContent());
            messageDTOs.add(messageDTO);
        }

        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setMessages(messageDTOs);
//        chatDTO.setModel("gpt-3.5-turbo");
        chatDTO.setModel("gpt-4o");
        return chatDTO;
    }

//    public HttpResponseStatus SendMessageWithModel(Long chatId, String content)

    public Message SendMessage(Long chatId, String content) {
        Chat chat = chatService.FindChatById(chatId);
        Message message = new Message();
        message.setChat(chat);
        message.setRole("user");
        message.setContent(content);
        messageRepository.save(message);

        List<Message> messages = chat.getMessages();
        List<MessageDTO> messageDTOs = new ArrayList<>();
        for (Message m : messages) {
            MessageDTO messageDTO = new MessageDTO();
            messageDTO.setRole(m.getRole());
            messageDTO.setContent(m.getContent());
            messageDTOs.add(messageDTO);
        }

        ChatDTO chatDTO = new ChatDTO();
        chatDTO.setMessages(messageDTOs);
//        chatDTO.setModel("gpt-3.5-turbo");
        chatDTO.setModel("gpt-4o");

        try {
            String response = webClient.post()
                    .uri("https://api.openai.com/v1/chat/completions")
                    .bodyValue(chatDTO)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);
            String assistantContent = root.path("choices").get(0).path("message").path("content").asText();
            Integer totalTokens = root.path("usage").path("total_tokens").asInt();

            Message responseMessage = new Message();

            responseMessage.setChat(chat);
            responseMessage.setModel(chatDTO.getModel());
            responseMessage.setRole("assistant");
            responseMessage.setContent(assistantContent);
            responseMessage.setTokenCount(totalTokens);
            messageRepository.save(responseMessage);
            return responseMessage;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
