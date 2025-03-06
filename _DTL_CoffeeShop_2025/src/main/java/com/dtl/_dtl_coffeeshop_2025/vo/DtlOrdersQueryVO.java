package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlOrdersQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 1000;

    private Integer orderID;

    private Integer userID;

    private Date orderDate;

    private BigDecimal totalAmount;

    private String status;

    private String notes;

}
