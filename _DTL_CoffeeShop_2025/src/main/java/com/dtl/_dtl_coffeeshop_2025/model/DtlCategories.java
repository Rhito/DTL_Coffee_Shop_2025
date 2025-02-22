package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "dtl_categories")
public class DtlCategories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "CategoryID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryID;

    @Column(name = "CategoryName", nullable = false)
    private String categoryName;

    @Column(name = "Description")
    private String description;

    @Column(name = "CreatedAt")
    private Date createdAt;

    @Column(name = "Status")
    private String status = "Active";
    @Column(name = "parent_id", nullable = false)
    private Integer parentId;

}
