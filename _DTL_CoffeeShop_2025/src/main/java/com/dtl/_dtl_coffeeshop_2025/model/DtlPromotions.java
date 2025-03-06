package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @Column(name = "EndDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;

    @Column(name = "Status")
    private String status = "Active";
}