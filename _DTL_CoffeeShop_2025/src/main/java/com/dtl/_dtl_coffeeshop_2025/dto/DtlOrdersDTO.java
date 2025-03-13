package com.dtl._dtl_coffeeshop_2025.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DtlOrdersDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer orderID;

    private Integer userID;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private Date orderDate;
    private BigDecimal totalAmount;

    private String status;

    private String notes;

}
