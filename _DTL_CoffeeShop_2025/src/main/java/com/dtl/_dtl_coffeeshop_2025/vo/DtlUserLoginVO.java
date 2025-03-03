package com.dtl._dtl_coffeeshop_2025.vo;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DtlUserLoginVO {
    @NotBlank(message = "Username không được để trống")
    private String username;

    @NotBlank(message = "Password không được để trống")
    private String password;
}
