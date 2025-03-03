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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class DtlUsersController {

    @Autowired
    private DtlUsersService dtlUsersService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    // Chỉ ADMIN có thể tạo tài khoản mới
    public String save(@Valid @RequestBody DtlUsersVO vO) {
        return dtlUsersService.save(vO).toString();
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    // Chỉ ADMIN có thể xóa tài khoản người dùng
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlUsersService.delete(id);
    }

    @PutMapping("edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == authentication.principal.id")
    // ADMIN có thể chỉnh sửa bất kỳ user nào, USER chỉ có thể cập nhật chính mình
    public void update(@Valid @NotNull @PathVariable("id") Integer id,
                       @Valid @RequestBody DtlUsersUpdateVO vO) {
        dtlUsersService.update(id, vO);
    }

    @GetMapping("show/{id}")
    @PreAuthorize("hasAuthority('ADMIN') or #id == authentication.principal.id")
    // ADMIN có thể xem thông tin bất kỳ user nào, USER chỉ có thể xem chính mình
    public DtlUsersDTO getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return dtlUsersService.getById(id);
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    // Chỉ ADMIN có thể xem danh sách tất cả người dùng
    public Page<DtlUsersDTO> query(@Valid DtlUsersQueryVO vO) {
        return dtlUsersService.query(vO);
    }
}
