package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlReservations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlReservationsRepository extends JpaRepository<DtlReservations, Integer>, JpaSpecificationExecutor<DtlReservations> {

}