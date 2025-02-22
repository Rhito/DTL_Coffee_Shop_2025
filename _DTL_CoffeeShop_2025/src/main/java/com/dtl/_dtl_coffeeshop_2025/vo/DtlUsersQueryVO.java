package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlUsersQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0; // Default to first page
    private int size = 10; // Default page size

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
