package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlUsersDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlUsersService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/users")
public class DtlUsersController {

    @Autowired
    private DtlUsersService dtlUsersService;

    @PostMapping
    public String save(@Valid @RequestBody DtlUsersVO vO) {
        return dtlUsersService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlUsersService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlUsersUpdateVO vO) {
        dtlUsersService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlUsersDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlUsersService.getById(id);
    }

    @GetMapping
    public Page<DtlUsersDTO> query(@Valid DtlUsersQueryVO vO) {
        return dtlUsersService.query(vO);
    }
}
