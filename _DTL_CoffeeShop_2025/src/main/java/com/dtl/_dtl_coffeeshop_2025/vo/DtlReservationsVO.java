package com.dtl._dtl_coffeeshop_2025.vo;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlReservationsVO implements Serializable {
    private static final long serialVersionUID = 1L;

    @NotNull(message = "reservationID can not null")
    private Integer reservationID;

    private Integer customerID;

    private Integer tableID;

    @NotNull(message = "reservationDate can not null")
    private Date reservationDate;

    @NotNull(message = "numberOfGuests can not null")
    private Integer numberOfGuests;

    private String status;

    private String notes;

}
