package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import jakarta.validation.constraints.NotNull;

@Data
public class DtlProductsVO implements Serializable {
    private static final long serialVersionUID = 1L;

   // @NotNull(message = "productID can not null")
    private Integer productID;

    @NotNull(message = "productName can not null")
    private String productName;

    private Integer categoryID;

    private String description;

    @NotNull(message = "price can not null")
    private BigDecimal price;

    private String imageURL;

    private Date createdAt;

    private Date updatedAt;

    private String status;

}
