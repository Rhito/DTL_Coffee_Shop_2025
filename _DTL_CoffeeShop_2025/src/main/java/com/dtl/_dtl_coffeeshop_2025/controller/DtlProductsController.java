package com.dtl._dtl_coffeeshop_2025.controller;

import com.dtl._dtl_coffeeshop_2025.dto.DtlProductsDTO;
import com.dtl._dtl_coffeeshop_2025.service.DtlProductsService;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Validated
@RestController
@RequestMapping("/products")
public class DtlProductsController {

    @Autowired
    private DtlProductsService dtlProductsService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/images/{filename:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path path = Paths.get(uploadDir + filename);
        Resource resource = new UrlResource(path.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }
        String contentType = Files.probeContentType(path);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType != null ? contentType : "application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(resource);
    }

    @PostMapping(consumes = {"multipart/form-data"})
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')")
    public ResponseEntity<DtlProductsDTO> save(
            @Valid @RequestPart("product") DtlProductsVO vO,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        DtlProductsDTO createdProduct = dtlProductsService.save(vO, file);
        return ResponseEntity.ok(createdProduct);
    }

    @PutMapping(value = "edit/{id}", consumes = {"multipart/form-data"})
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('EMPLOYEE')")
    public ResponseEntity<DtlProductsDTO> update(
            @Valid @NotNull @PathVariable("id") Integer id,
            @Valid @RequestPart("product") DtlProductsUpdateVO vO,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        DtlProductsDTO updatedProduct = dtlProductsService.update(id, vO, file);
        return ResponseEntity.ok(updatedProduct);
    }

    @GetMapping("show/{id}")
    public ResponseEntity<DtlProductsDTO> getById(@Valid @NotNull @PathVariable("id") Integer id) {
        return ResponseEntity.ok(dtlProductsService.getById(id));
    }

    @DeleteMapping("delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete(@Valid @NotNull @PathVariable("id") Integer id) {
        dtlProductsService.delete(id);
    }

    @GetMapping
    public ResponseEntity<Page<DtlProductsDTO>> query(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "1000") Integer size,
            @RequestParam(required = false) String productName,
            @RequestParam(required = false) String categoryIds, // Thêm categoryIds dưới dạng chuỗi
            @RequestParam(required = false) Double minPrice,    // Thêm minPrice
            @RequestParam(required = false) Double maxPrice) {  // Thêm maxPrice
        DtlProductsQueryVO vO = new DtlProductsQueryVO();
        vO.setPage(page);
        vO.setSize(size);
        vO.setProductName(productName);
        vO.setCategoryIds(categoryIds != null ? Arrays.stream(categoryIds.split(","))
                .map(Integer::parseInt).toList() : null); // Chuyển chuỗi thành List<Integer>
        vO.setMinPrice(minPrice);
        vO.setMaxPrice(maxPrice);
        Page<DtlProductsDTO> products = dtlProductsService.query(vO);
        return ResponseEntity.ok(products);
    }
}