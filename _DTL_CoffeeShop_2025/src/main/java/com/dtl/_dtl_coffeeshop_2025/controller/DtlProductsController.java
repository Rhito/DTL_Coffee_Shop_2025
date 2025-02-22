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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/products")
public class DtlProductsController {

    @Autowired
    private DtlProductsService dtlProductsService;

    @PostMapping
    public String save(@Valid @RequestBody DtlProductsVO vO) {
        return dtlProductsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlProductsService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlProductsUpdateVO vO) {
        dtlProductsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlProductsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlProductsService.getById(id);
    }

    @GetMapping
    public Page<DtlProductsDTO> query(@Valid DtlProductsQueryVO vO) {
        return dtlProductsService.query(vO);
    }
}
