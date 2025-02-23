package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_inventory")
public class DtlInventory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "InventoryID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventoryID;

    @Column(name = "ProductID")
    private Integer productID;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "LastUpdated")
    private Date lastUpdated = new Date();

}
