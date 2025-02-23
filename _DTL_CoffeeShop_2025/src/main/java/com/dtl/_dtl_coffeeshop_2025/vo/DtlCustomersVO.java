package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

import jakarta.validation.constraints.NotNull;

@Data
public class DtlCustomersVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "customerID can not null")
    private Integer customerID;

    @NotNull(message = "fullName can not null")
    private String fullName;

    private String phoneNumber;

    private String email;

    private String address;

    private Date createdAt;

    private Date updatedAt;

}
