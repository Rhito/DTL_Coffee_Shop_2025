package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DtlPromotionsQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 1000;

    private Integer promotionID;

    private String promotionName;

    private String description;

    private BigDecimal discountRate;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

}
