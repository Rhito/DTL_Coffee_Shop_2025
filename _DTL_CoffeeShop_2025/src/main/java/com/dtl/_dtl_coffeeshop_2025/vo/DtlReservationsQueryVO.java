package com.dtl._dtl_coffeeshop_2025.vo;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class DtlReservationsQueryVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private int page = 0;
    private int size = 1000;

    private Integer reservationID;

    private Integer customerID;

    private Integer tableID;

    private Date reservationDate;

    private Integer numberOfGuests;

    private String status;

    private String notes;

}
