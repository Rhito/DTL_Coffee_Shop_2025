package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlProducts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;



public interface DtlProductsRepository extends JpaRepository<DtlProducts, Integer>, JpaSpecificationExecutor<DtlProducts> {
    Page<DtlProducts> findByProductNameContainingIgnoreCase(String productName, Pageable pageable);
}