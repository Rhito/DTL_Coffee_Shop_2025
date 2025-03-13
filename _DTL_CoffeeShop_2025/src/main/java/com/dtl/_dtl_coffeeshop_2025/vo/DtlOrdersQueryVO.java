package com.dtl._dtl_coffeeshop_2025.vo;


import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DtlOrdersQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 1000;

    private Integer orderID;

    private Integer userID;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime orderDate;

    private BigDecimal totalAmount;

    private String status;

    private String notes;

}
