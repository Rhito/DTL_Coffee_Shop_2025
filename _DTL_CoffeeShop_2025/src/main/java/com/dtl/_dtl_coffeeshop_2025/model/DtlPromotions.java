package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_promotions")
public class DtlPromotions implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "PromotionID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer promotionID;

    @Column(name = "PromotionName", nullable = false)
    private String promotionName;

    @Column(name = "Description")
    private String description;

    @Column(name = "DiscountRate", nullable = false)
    private BigDecimal discountRate;

    @Column(name = "StartDate")
    private Date startDate;

    @Column(name = "EndDate")
    private Date endDate;

    @Column(name = "Status")
    private String status = "Active";

}
