package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlPromotionsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlPromotionsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/promotions")
public class DtlPromotionsController {

    @Autowired
    private DtlPromotionsService dtlPromotionsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể thêm khuyến mãi
    public String save(@Valid @RequestBody DtlPromotionsVO vO) {
        return dtlPromotionsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    // Chỉ ADMIN có thể xóa khuyến mãi
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlPromotionsService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể cập nhật khuyến mãi
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlPromotionsUpdateVO vO) {
        dtlPromotionsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả các vai trò (ADMIN, STAFF, CUSTOMER) đều có thể xem chi tiết khuyến mãi
    public DtlPromotionsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlPromotionsService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả các vai trò đều có thể xem danh sách khuyến mãi
    public Page<DtlPromotionsDTO> query(@Valid DtlPromotionsQueryVO vO) {
        return dtlPromotionsService.query(vO);
    }
}
