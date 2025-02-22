package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlReservationsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlReservationsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/reservations")
public class DtlReservationsController {

    @Autowired
    private DtlReservationsService dtlReservationsService;

    @PostMapping
    public String save(@Valid @RequestBody DtlReservationsVO vO) {
        return dtlReservationsService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlReservationsService.delete(id);
    }

    @PutMapping("edit/{id}")
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlReservationsUpdateVO vO) {
        dtlReservationsService.update(id, vO);
    }

    @GetMapping("show/{id}")
    public DtlReservationsDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlReservationsService.getById(id);
    }

    @GetMapping
    public Page<DtlReservationsDTO> query(@Valid DtlReservationsQueryVO vO) {
        return dtlReservationsService.query(vO);
    }
}
