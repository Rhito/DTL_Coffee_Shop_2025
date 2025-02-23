package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "dtl_orderdetails")
public class DtlOrderdetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "OrderDetailID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderDetailID;

    @Column(name = "OrderID")
    private Integer orderID;

    @Column(name = "ProductID")
    private Integer productID;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "UnitPrice", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "Discount")
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "Subtotal")
    private BigDecimal subtotal = BigDecimal.ZERO;

}
