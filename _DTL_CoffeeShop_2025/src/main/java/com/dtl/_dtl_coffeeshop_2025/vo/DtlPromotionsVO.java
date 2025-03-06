package com.dtl._dtl_coffeeshop_2025.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DtlPromotionsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    //@NotNull(message = "promotionID can not null")
    private Integer promotionID;

    @NotNull(message = "promotionName can not null")
    private String promotionName;

    private String description;

    @NotNull(message = "discountRate can not null")
    private BigDecimal discountRate;

    @NotNull(message = "startDate can not null")
    private LocalDate startDate;

    @NotNull(message = "endDate can not null")
    private LocalDate endDate;

    private String status;

}
