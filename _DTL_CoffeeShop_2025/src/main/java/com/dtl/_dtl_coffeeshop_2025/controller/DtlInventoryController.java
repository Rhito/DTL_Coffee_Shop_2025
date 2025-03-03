package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlInventoryDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlInventoryService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/inventory")
public class DtlInventoryController {

    @Autowired
    private DtlInventoryService dtlInventoryService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')") // Chỉ ADMIN & STAFF được thêm hàng tồn kho
    public String save(@Valid @RequestBody DtlInventoryVO vO) {
        return dtlInventoryService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')") // Chỉ ADMIN được xóa hàng tồn kho
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlInventoryService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF')") // ADMIN & STAFF có thể cập nhật
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlInventoryUpdateVO vO) {
        dtlInventoryService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')") // Tất cả đều có thể xem chi tiết
    public DtlInventoryDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlInventoryService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STAFF') or hasAuthority('CUSTOMER')") // Tất cả đều có thể xem danh sách
    public Page<DtlInventoryDTO> query(@Valid DtlInventoryQueryVO vO) {
        return dtlInventoryService.query(vO);
    }
}
