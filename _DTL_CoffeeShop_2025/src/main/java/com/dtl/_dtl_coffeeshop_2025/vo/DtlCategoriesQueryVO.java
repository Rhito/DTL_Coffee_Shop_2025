package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlCategoriesQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 10;

    private Integer categoryID;

    private String categoryName;

    private String description;

    private Date createdAt;

    private Date updatedAt;

    private String status;

}
