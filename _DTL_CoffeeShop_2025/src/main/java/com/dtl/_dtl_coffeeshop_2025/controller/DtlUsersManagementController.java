
package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlUsersDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlUsersManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class DtlUsersManagementController {
    @Autowired
    private DtlUsersManagementService dtlUsersManagementService;

    // API đăng ký
    @PostMapping("/register")
    public ResponseEntity<DtlUsersDTO> registerUser(@RequestBody DtlUsersDTO registrationRequest) {
        DtlUsersDTO response = dtlUsersManagementService.registerUser(registrationRequest);

        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    // API đăng nhập
    @PostMapping("/login")
    public ResponseEntity<DtlUsersDTO> login(@RequestBody DtlUsersDTO loginRequest) {
        DtlUsersDTO response = dtlUsersManagementService.login(loginRequest);
        System.out.println(response);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
