package dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ChatDTO {
    private String model;
    private List<MessageDTO> messages;
}
