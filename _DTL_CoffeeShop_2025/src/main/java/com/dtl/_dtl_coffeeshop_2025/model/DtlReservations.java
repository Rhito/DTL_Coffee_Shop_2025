package com.dtl._dtl_coffeeshop_2025.model;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "dtl_reservations")
public class DtlReservations implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "ReservationID", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reservationID;

    @Column(name = "CustomerID")
    private Integer customerID;

    @Column(name = "TableID")
    private Integer tableID;

    @Column(name = "ReservationDate", nullable = false)
    private LocalDateTime reservationDate = LocalDateTime.now();

    @Column(name = "NumberOfGuests", nullable = false)
    private Integer numberOfGuests;

    @Column(name = "Status")
    private String status = "Confirmed";

    @Column(name = "Notes")
    private String notes;

}
