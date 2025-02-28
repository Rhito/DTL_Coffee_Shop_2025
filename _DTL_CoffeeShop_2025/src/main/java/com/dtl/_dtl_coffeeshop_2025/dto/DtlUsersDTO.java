package com.dtl._dtl_coffeeshop_2025.dto;

import com.dtl._dtl_coffeeshop_2025.model.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtlUsersDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private Date expirationTime;

    private Integer userID;
    private String username;
    private String fullName;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private String phoneNumber;
    private String email;
    private String address;
    private String password;
    private Date createdAt;
    private Date updatedAt;
    private String status;

    private List<DtlUsersDTO> users;
}
