package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlOrders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlOrdersRepository extends JpaRepository<DtlOrders, Integer>, JpaSpecificationExecutor<DtlOrders> {

}