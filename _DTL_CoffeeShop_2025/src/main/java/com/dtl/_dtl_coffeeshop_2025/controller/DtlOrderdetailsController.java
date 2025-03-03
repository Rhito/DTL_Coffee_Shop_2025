package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlOrderdetailsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlOrderdetailsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/orderdetails")
public class DtlOrderdetailsController {

    @Autowired
    private DtlOrderdetailsService dtlOrderdetailsService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả người dùng có thể tạo đơn hàng
    public String save(@Valid @RequestBody DtlOrderdetailsVO vO) {
        return dtlOrderdetailsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể xóa đơn hàng
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlOrderdetailsService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể cập nhật đơn hàng
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlOrderdetailsUpdateVO vO) {
        dtlOrderdetailsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')")
    // Tất cả người dùng có thể xem chi tiết đơn hàng
    public DtlOrderdetailsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlOrderdetailsService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')")
    // Chỉ ADMIN & STAFF có thể xem danh sách đơn hàng
    public Page<DtlOrderdetailsDTO> query(@Valid DtlOrderdetailsQueryVO vO) {
        return dtlOrderdetailsService.query(vO);
    }
}
