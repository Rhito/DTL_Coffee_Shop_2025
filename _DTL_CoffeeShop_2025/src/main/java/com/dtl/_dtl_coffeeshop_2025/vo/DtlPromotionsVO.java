package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;


@Data
public class DtlPromotionsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "promotionID can not null")
    private Integer promotionID;

    @NotNull(message = "promotionName can not null")
    private String promotionName;

    private String description;

    @NotNull(message = "discountRate can not null")
    private BigDecimal discountRate;

    private Date startDate;

    private Date endDate;

    private String status;

}
