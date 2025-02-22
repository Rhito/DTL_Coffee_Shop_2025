package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlCustomers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlCustomersRepository extends JpaRepository<DtlCustomers, Integer>, JpaSpecificationExecutor<DtlCustomers> {

}