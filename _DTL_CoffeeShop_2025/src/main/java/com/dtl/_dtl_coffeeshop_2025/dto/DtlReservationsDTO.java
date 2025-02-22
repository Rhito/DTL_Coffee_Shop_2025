package com.dtl._dtl_coffeeshop_2025.dto;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlReservationsDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer reservationID;

    private Integer customerID;

    private Integer tableID;

    private Date reservationDate;

    private Integer numberOfGuests;

    private String status;

    private String notes;

}
