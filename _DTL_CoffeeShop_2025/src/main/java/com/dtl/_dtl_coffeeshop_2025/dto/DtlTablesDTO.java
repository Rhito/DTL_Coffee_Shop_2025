package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlTablesDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer tableID;

    private String tableName;

    private Integer capacity;

    private String status;

    private Date createdAt;

    private Date updatedAt;

}
