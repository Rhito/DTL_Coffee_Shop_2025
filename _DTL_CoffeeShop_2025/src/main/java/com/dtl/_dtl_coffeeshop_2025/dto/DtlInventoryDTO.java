package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlInventoryDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer inventoryID;

    private Integer productID;

    private Integer quantity;

    private Date lastUpdated;

}
