package com.dtl._dtl_coffeeshop_2025.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DtlPromotionsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer promotionID;

    private String promotionName;

    private String description;

    private BigDecimal discountRate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate startDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate endDate;

    private String status;

}
