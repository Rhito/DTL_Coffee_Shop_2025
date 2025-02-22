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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/categories")
public class DtlCategoriesController {

    @Autowired
    private DtlCategoriesService dtlCategoriesService;

    @PostMapping
    public String save(@Valid @RequestBody DtlCategoriesVO vO) {
        return dtlCategoriesService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlCategoriesService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlCategoriesUpdateVO vO) {
        dtlCategoriesService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlCategoriesDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlCategoriesService.getById(id);
    }

    @GetMapping
    public Page<DtlCategoriesDTO> query(@Valid DtlCategoriesQueryVO vO) {
        return dtlCategoriesService.query(vO);
    }
}
