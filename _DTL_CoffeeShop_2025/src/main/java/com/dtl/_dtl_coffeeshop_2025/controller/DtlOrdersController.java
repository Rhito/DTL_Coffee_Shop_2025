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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/orders")
public class DtlOrdersController {

    @Autowired
    private DtlOrdersService dtlOrdersService;

    @PostMapping
    public String save(@Valid @RequestBody DtlOrdersVO vO) {
        return dtlOrdersService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlOrdersService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlOrdersUpdateVO vO) {
        dtlOrdersService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlOrdersDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlOrdersService.getById(id);
    }

    @GetMapping
    public Page<DtlOrdersDTO> query(@Valid DtlOrdersQueryVO vO) {
        return dtlOrdersService.query(vO);
    }
}
