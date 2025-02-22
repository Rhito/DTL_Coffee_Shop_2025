package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DtlCategoriesRepository extends JpaRepository<DtlCategories, Integer>, JpaSpecificationExecutor<DtlCategories> {

}