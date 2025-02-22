package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlPromotions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlPromotionsRepository extends JpaRepository<DtlPromotions, Integer>, JpaSpecificationExecutor<DtlPromotions> {

}