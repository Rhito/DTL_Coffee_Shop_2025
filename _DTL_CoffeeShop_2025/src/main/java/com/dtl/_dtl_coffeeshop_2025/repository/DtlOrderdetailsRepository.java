package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlOrderdetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlOrderdetailsRepository extends JpaRepository<DtlOrderdetails, Integer>, JpaSpecificationExecutor<DtlOrderdetails> {

}