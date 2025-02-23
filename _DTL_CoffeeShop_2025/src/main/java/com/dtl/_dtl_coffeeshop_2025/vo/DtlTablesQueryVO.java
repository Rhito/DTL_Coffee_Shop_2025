package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;

@Data
public class DtlTablesQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page  = 0;
    private int size = 10;

    private Integer tableID;

    private String tableName;

    private Integer capacity;

    private String status;

}
