package com.dtl._dtl_coffeeshop_2025.vo;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class DtlTablesVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "tableID can not null")
    private Integer tableID;

    @NotNull(message = "tableName can not null")
    private String tableName;

    @NotNull(message = "capacity can not null")
    private Integer capacity;

    private String status;

}
