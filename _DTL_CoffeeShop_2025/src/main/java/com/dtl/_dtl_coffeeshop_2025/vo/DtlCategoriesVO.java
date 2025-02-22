package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;
import java.io.Serializable;
import java.util.Date;
import jakarta.validation.constraints.*;

@Data
public class DtlCategoriesVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "categoryID cannot be null")
    private Integer categoryID;

    @NotBlank(message = "categoryName cannot be blank")
    private String categoryName;

    private String description;

    @PastOrPresent(message = "createdAt must be in the past or present")
    private Date createdAt;

    private CategoryStatus status;

    public enum CategoryStatus {
        ACTIVE, INACTIVE, DELETED
    }
}
