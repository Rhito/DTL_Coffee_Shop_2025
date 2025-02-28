package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_orders")
public class DtlOrders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "OrderID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderID;

    @Column(name = "CustomerID")
    private Integer customerID;

    @Column(name = "UserID")
    private Integer userID;

    @Column(name = "OrderDate")
    private Date orderDate;

    @Column(name = "TotalAmount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "Status")
    private String status = "Pending";

    @Column(name = "Notes")
    private String notes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", updatable = false)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt = new Date();

}
