package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlTablesDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlTablesService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/tables")
public class DtlTablesController {

    @Autowired
    private DtlTablesService dtlTablesService;

    @PostMapping
    public String save(@Valid @RequestBody DtlTablesVO vO) {
        return dtlTablesService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlTablesService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlTablesUpdateVO vO) {
        dtlTablesService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlTablesDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlTablesService.getById(id);
    }

    @GetMapping
    public Page<DtlTablesDTO> query(@Valid DtlTablesQueryVO vO) {
        return dtlTablesService.query(vO);
    }
}
