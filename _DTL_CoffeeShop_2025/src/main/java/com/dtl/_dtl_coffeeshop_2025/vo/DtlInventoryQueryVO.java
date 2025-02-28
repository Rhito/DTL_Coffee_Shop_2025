package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlInventoryQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 10;

    private Integer inventoryID;

    private Integer productID;

    private Integer quantity;

    private Date createdAt;

    private Date updatedAt;

}
