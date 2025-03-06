package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlReservationsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlReservationsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/reservations")
public class DtlReservationsController {

    @Autowired
    private DtlReservationsService dtlReservationsService;

    @PostMapping
    @PreAuthorize("hasAuthority('CUSTOMER')")
    // Chỉ CUSTOMER có thể đặt chỗ mới
    public String save(@Valid @RequestBody DtlReservationsVO vO) {
        return dtlReservationsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')")
    // Chỉ ADMIN & EMPLOYEE có thể xóa đặt chỗ
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlReservationsService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')")
    // Chỉ ADMIN & EMPLOYEE có thể cập nhật đặt chỗ
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlReservationsUpdateVO vO) {
        dtlReservationsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE') or hasAuthority('CUSTOMER')")
    // Tất cả các vai trò có thể xem chi tiết đặt chỗ
    public DtlReservationsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlReservationsService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE') or hasAuthority('CUSTOMER')")
    // - ADMIN & EMPLOYEE có thể xem tất cả đặt chỗ
    // - CUSTOMER chỉ có thể xem đặt chỗ của chính mình
    public Page<DtlReservationsDTO> query(@Valid DtlReservationsQueryVO vO) {
        return dtlReservationsService.query(vO);
    }
}
