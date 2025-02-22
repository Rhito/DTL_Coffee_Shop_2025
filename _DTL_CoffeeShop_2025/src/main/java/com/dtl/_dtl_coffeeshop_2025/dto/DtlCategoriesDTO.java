package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlCategoriesDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer categoryID;

    private String categoryName;

    private String description;

    private Date createdAt;

    private String status;

}
