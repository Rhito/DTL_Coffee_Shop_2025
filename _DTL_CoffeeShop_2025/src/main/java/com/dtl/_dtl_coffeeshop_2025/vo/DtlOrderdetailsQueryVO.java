package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class DtlOrderdetailsQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0; // Default to first page
    private int size = 10; // Default page size

    private Integer orderDetailID;

    private Integer orderID;

    private Integer productID;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal subtotal;

}
