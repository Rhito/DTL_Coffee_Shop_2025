package com.dtl._dtl_coffeeshop_2025.vo;


import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlCategoriesVO implements Serializable {
    private static final long serialVersionUID = 1L;

    //@NotNull(message = "categoryID can not null")
    private Integer categoryID;

   @NotNull(message = "categoryName can not null")
    private String categoryName;

    private String description;

    private Date createdAt;

    private Date updatedAt;

    private String status;

}
