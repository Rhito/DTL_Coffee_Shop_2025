package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlOrdersDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer orderID;

    private Integer customerID;

    private Integer userID;

    private Date orderDate;

    private BigDecimal totalAmount;

    private String status;

    private String notes;

}
