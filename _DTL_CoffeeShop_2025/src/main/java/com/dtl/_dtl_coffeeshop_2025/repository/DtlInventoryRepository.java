package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlInventoryRepository extends JpaRepository<DtlInventory, Integer>, JpaSpecificationExecutor<DtlInventory> {

}