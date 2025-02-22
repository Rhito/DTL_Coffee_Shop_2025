package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlReservationsQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0; // Default to first page
    private int size = 10; // Default page size

    private Integer reservationID;

    private Integer customerID;

    private Integer tableID;

    private Date reservationDate;

    private Integer numberOfGuests;

    private String status;

    private String notes;

}
