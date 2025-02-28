package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlUsersDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlUsers;
import com.dtl._dtl_coffeeshop_2025.repository.DtlUsersRepository;
import com.dtl._dtl_coffeeshop_2025.util.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Optional;

@Service
public class DtlUsersManagementService {
    @Autowired
    private DtlUsersRepository dtlUsersRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public DtlUsersDTO registerUser(DtlUsersDTO registrationRequest) {
        DtlUsersDTO responseDTO = new DtlUsersDTO();
        try {
            // Kiểm tra nếu username hoặc email đã tồn tại
            if (dtlUsersRepository.findByUsernameOrEmail(registrationRequest.getUsername(), registrationRequest.getEmail()).isPresent()) {
                responseDTO.setStatusCode(400);
                responseDTO.setError("Username or email already exists");
                return responseDTO;
            }

            // Tạo user mới
            DtlUsers newUser = new DtlUsers();
            newUser.setUsername(registrationRequest.getUsername());
            newUser.setEmail(registrationRequest.getEmail());
            newUser.setRole(registrationRequest.getRole());
            newUser.setPasswordHash(passwordEncoder.encode(registrationRequest.getPassword()));
            newUser.setFullName(registrationRequest.getFullName());

            DtlUsers savedUser = dtlUsersRepository.save(newUser);
            if (savedUser.getUserID() > 0) {
                responseDTO.setMessage("User registered successfully");
                responseDTO.setStatusCode(201); // 201: Created
            }
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setError("Error registering user: " + e.getMessage());
        }
        return responseDTO;
    }

    public DtlUsersDTO login(DtlUsersDTO loginRequest) {
        DtlUsersDTO responseDTO = new DtlUsersDTO();

        try {
            // Tìm user trong DB
            Optional<DtlUsers> optionalUser = dtlUsersRepository.findByUsernameOrEmail(loginRequest.getUsername(), loginRequest.getEmail());
            if (optionalUser.isEmpty()) {
                responseDTO.setStatusCode(404); // Not Found
                responseDTO.setError("User not found");
                return responseDTO;
            }

            DtlUsers user = optionalUser.get();

            // Kiểm tra mật khẩu
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPasswordHash())) {
                responseDTO.setStatusCode(401); // Unauthorized
                responseDTO.setError("Invalid password");
                return responseDTO;
            }

            // Tạo JWT và Refresh Token
            String jwt = jwtUtils.generateToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);

            // Set thông tin vào DTO
            responseDTO.setStatusCode(200);
            responseDTO.setToken(jwt);
            responseDTO.setRefreshToken(refreshToken);

            // Thiết lập thời gian hết hạn token (24 giờ)
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.HOUR, 24);
            responseDTO.setExpirationTime(calendar.getTime());

            responseDTO.setMessage("User logged in successfully");
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setError("Error during login: " + e.getMessage());
        }
        return responseDTO;
    }
}
