package com.dtl._dtl_coffeeshop_2025.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;


@Data
public class DtlOrderdetailsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "orderDetailID can not null")
    private Integer orderDetailID;

    private Integer orderID;

    private Integer productID;

    @NotNull(message = "quantity can not null")
    private Integer quantity;

    @NotNull(message = "unitPrice can not null")
    private BigDecimal unitPrice;

    private BigDecimal discount;

    private BigDecimal subtotal;

}
