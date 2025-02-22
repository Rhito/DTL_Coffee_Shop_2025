package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlUsersDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer userID;

    private String username;

    private String passwordHash;

    private String fullName;

    private String role;

    private String phoneNumber;

    private String email;

    private Date createdAt;

    private String status;

}
