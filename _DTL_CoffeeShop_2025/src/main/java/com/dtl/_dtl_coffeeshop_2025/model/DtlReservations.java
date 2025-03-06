package com.dtl._dtl_coffeeshop_2025.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

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

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reservationDate", nullable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime reservationDate;

    @Column(name = "NumberOfGuests", nullable = false)
    private Integer numberOfGuests;

    @Column(name = "Status")
    private String status = "Confirmed";

    @Column(name = "Notes")
    private String notes;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createdAt", updatable = false)
    private Date createdAt = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "UpdatedAt")
    private Date updatedAt = new Date();

}
