package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlProductsQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0; // Default to first page
    private int size = 10; // Default page size

    private Integer productID;

    private String productName;

    private Integer categoryID;

    private String description;

    private BigDecimal price;

    private String imageURL;

    private Date createdAt;

    private String status;

}
