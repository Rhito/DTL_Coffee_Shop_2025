package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlOrdersDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlOrdersService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/orders")
public class DtlOrdersController {

    @Autowired
    private DtlOrdersService dtlOrdersService;

    @PostMapping
    @PreAuthorize("hasAuthority('CUSTOMER')")
    // Chỉ khách hàng có thể đặt hàng
    public String save(@Valid @RequestBody DtlOrdersVO vO) {
        return dtlOrdersService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể xóa đơn hàng
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlOrdersService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể cập nhật đơn hàng
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlOrdersUpdateVO vO) {
        dtlOrdersService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // ADMIN, STAFF & CUSTOMER có thể xem chi tiết đơn hàng
    public DtlOrdersDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlOrdersService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể xem danh sách đơn hàng
    public Page<DtlOrdersDTO> query(@Valid DtlOrdersQueryVO vO) {
        return dtlOrdersService.query(vO);
    }
}
