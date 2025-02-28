package com.dtl._dtl_coffeeshop_2025.repository;

import com.dtl._dtl_coffeeshop_2025.model.DtlUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DtlUsersRepository extends JpaRepository<DtlUsers, Integer>, JpaSpecificationExecutor<DtlUsers> {
    Optional<DtlUsers> findByUsernameOrEmail(String username, String email);
}