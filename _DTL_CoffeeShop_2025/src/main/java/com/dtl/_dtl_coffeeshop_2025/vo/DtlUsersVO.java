package com.dtl._dtl_coffeeshop_2025.vo;

import com.dtl._dtl_coffeeshop_2025.dto.DtlUsersDTO;
import com.dtl._dtl_coffeeshop_2025.model.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlUsersVO implements Serializable {
    private static final long serialVersionUID = 1L;

    //@NotNull(message = "userID can not null")
    private Integer userID;

    @NotNull(message = "username can not null")
    private String username;

    @NotNull(message = "passwordHash can not null")
    private String passwordHash;

    @NotNull(message = "fullName can not null")
    private String fullName;

    @NotNull(message = "role can not null")
    private UserRole role;

    private String phoneNumber;

    private String email;

    private String status;

    private Date createdAt;

    private Date updatedAt;


}
