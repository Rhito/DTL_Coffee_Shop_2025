package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class DtlPromotionsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer promotionID;

    private String promotionName;

    private String description;

    private BigDecimal discountRate;

    private Date startDate;

    private Date endDate;

    private String status;

}
