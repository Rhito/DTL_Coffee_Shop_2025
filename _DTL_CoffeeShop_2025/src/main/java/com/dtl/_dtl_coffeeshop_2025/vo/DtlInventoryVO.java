package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import jakarta.validation.constraints.NotNull;

@Data
public class DtlInventoryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "inventoryID can not null")
    private Integer inventoryID;

    private Integer productID;

    @NotNull(message = "quantity can not null")
    private Integer quantity;

    private Date lastUpdated;

}
