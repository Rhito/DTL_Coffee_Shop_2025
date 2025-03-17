package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlProducts;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DtlProductsRepository extends JpaRepository<DtlProducts, Integer> {

    Page<DtlProducts> findByProductNameContainingIgnoreCase(String productName, Pageable pageable);

    @Query("SELECT p FROM DtlProducts p WHERE " +
            "(:productName IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :productName, '%'))) " +
            "AND (:categoryIds IS NULL OR p.categoryID IN :categoryIds) " +
            "AND (:minPrice IS NULL OR p.price >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<DtlProducts> findByFilters(
            @Param("productName") String productName,
            @Param("categoryIds") List<Integer> categoryIds,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);
}