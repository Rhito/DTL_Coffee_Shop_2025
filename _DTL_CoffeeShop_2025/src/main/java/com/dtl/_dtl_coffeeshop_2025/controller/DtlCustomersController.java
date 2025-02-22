package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCustomersDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlCustomersService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/customers")
public class DtlCustomersController {

    @Autowired
    private DtlCustomersService dtlCustomersService;

    @PostMapping
    public String save(@Valid @RequestBody DtlCustomersVO vO) {
        return dtlCustomersService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlCustomersService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlCustomersUpdateVO vO) {
        dtlCustomersService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlCustomersDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlCustomersService.getById(id);
    }

    @GetMapping
    public Page<DtlCustomersDTO> query(@Valid DtlCustomersQueryVO vO) {
        return dtlCustomersService.query(vO);
    }
}
