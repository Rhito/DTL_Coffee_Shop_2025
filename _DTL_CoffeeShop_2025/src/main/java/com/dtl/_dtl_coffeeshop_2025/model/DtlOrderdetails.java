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
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Ensure auto-increment works properly
    @Column(name = "OrderDetailID", nullable = false, unique = true)
    private Integer orderDetailID;

    @Column(name = "OrderID", nullable = false)
    private Integer orderID;

    @Column(name = "ProductID", nullable = false)
    private Integer productID;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "UnitPrice", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "Subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;
}
