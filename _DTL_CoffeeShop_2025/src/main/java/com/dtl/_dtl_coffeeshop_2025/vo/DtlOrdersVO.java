package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlOrdersVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0; // Default to first page
    private int size = 10; // Default page size

    @NotNull(message = "orderID can not null")
    private Integer orderID;

    private Integer customerID;

    private Integer userID;

    private Date orderDate;

    @NotNull(message = "totalAmount can not null")
    private BigDecimal totalAmount;

    private String status;

    private String notes;

}
