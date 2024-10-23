package dto;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDTO {
    private String role;
    private String content;
}
