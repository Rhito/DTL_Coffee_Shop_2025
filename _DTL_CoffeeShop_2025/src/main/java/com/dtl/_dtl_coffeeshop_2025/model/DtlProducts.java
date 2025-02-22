package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_products")
public class DtlProducts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ProductID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;

    @Column(name = "ProductName", nullable = false)
    private String productName;
    @Column(name = "category_id", nullable = false)
    private Integer categoryId;

    @Column(name = "CategoryID")
    private Integer categoryID;

    @Column(name = "Description")
    private String description;

    @Column(name = "Price", nullable = false)
    private BigDecimal price;

    @Column(name = "ImageURL")
    private String imageURL;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "Status")
    private String status = "Active";

}
