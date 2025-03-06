package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlProductsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer productID;

    private String productName;

    private Integer categoryID;

    private String description;

    private BigDecimal price;

    private String imageURL;

    private Date createdAt;

    private Date updatedAt;

    private String status;

}
