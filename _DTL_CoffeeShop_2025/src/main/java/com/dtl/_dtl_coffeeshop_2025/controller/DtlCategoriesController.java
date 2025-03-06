package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCategoriesDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlCategoriesService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/categories")
public class DtlCategoriesController {

    @Autowired
    private DtlCategoriesService dtlCategoriesService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')") // Chỉ ADMIN hoặc EMPLOYEE được thêm danh mục
    public String save(@Valid @RequestBody DtlCategoriesVO vO) {
        return dtlCategoriesService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')") // Chỉ ADMIN có thể xóa danh mục
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlCategoriesService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')") // ADMIN & EMPLOYEE có thể sửa
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlCategoriesUpdateVO vO) {
        dtlCategoriesService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE') or hasAuthority('CUSTOMER')") // Tất cả đều có thể xem
    public DtlCategoriesDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlCategoriesService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE') or hasAuthority('CUSTOMER')") // Tất cả có thể xem danh sách
    public Page<DtlCategoriesDTO> query(@Valid DtlCategoriesQueryVO vO) {
        return dtlCategoriesService.query(vO);
    }
}
