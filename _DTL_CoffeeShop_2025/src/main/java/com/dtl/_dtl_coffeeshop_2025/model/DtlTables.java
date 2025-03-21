package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_tables")
public class DtlTables implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "TableID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tableID;

    @Column(name = "TableName", nullable = false)
    private String tableName;

    @Column(name = "Capacity", nullable = false)
    private Integer capacity;

    @Column(name = "Status")
    private String status = "Available";

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", updatable = false)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt = new Date();

}
