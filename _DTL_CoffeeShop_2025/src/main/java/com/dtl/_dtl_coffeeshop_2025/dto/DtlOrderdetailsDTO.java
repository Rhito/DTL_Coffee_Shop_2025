package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class DtlOrderdetailsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer orderDetailID;

    private Integer orderID;

    private Integer productID;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal discount;

    private BigDecimal subtotal;

}
