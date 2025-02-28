package com.dtl._dtl_coffeeshop_2025.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlInventoryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    //@NotNull(message = "inventoryID can not null")
    private Integer inventoryID;

    private Integer productID;

    @NotNull(message = "quantity can not null")
    private Integer quantity;

    private Date createdAt;

    private Date updatedAt;

}
