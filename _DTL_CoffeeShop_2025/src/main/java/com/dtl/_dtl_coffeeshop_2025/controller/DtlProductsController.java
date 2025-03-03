package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlProductsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlProductsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/products")
public class DtlProductsController {

    @Autowired
    private DtlProductsService dtlProductsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể thêm sản phẩm
    public String save(@Valid @RequestBody DtlProductsVO vO) {
        return dtlProductsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    // Chỉ ADMIN có thể xóa sản phẩm
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlProductsService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể cập nhật sản phẩm
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlProductsUpdateVO vO) {
        dtlProductsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả các vai trò (ADMIN, STAFF, CUSTOMER) đều có thể xem chi tiết sản phẩm
    public DtlProductsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlProductsService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả các vai trò đều có thể xem danh sách sản phẩm
    public Page<DtlProductsDTO> query(@Valid DtlProductsQueryVO vO) {
        return dtlProductsService.query(vO);
    }
}
