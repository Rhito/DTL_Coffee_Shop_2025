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
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/inventory")
public class DtlInventoryController {

    @Autowired
    private DtlInventoryService dtlInventoryService;

    @PostMapping
    public String save(@Valid @RequestBody DtlInventoryVO vO) {
        return dtlInventoryService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlInventoryService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlInventoryUpdateVO vO) {
        dtlInventoryService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlInventoryDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlInventoryService.getById(id);
    }

    @GetMapping
    public Page<DtlInventoryDTO> query(@Valid DtlInventoryQueryVO vO) {
        return dtlInventoryService.query(vO);
    }
}
