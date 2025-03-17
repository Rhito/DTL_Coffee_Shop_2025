package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlProductsDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlProducts;
import com.dtl._dtl_coffeeshop_2025.repository.DtlProductsRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlProductsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
public class DtlProductsService {

    @Autowired
    private DtlProductsRepository dtlProductsRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public DtlProductsDTO save(DtlProductsVO vo, MultipartFile file) throws IOException {
        DtlProducts bean = new DtlProducts();
        BeanUtils.copyProperties(vo, bean);

        if (file != null && !file.isEmpty()) {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir, fileName);
            Files.createDirectories(uploadPath.getParent());
            Files.write(uploadPath, file.getBytes());
            bean.setImageURL("/images/" + fileName);
        }

        bean.setCreatedAt(new Date());
        bean.setUpdatedAt(new Date());
        bean = dtlProductsRepository.save(bean);
        return toDTO(bean);
    }

    public void delete(Integer id) {
        DtlProducts product = requireOne(id);

        if (product.getImageURL() != null) {
            String filePath = uploadDir + product.getImageURL().replace("/images/", "");
            try {
                Path path = Paths.get(filePath);
                if (Files.exists(path)) {
                    Files.delete(path);
                    System.out.println("Đã xóa file: " + filePath);
                }
            } catch (IOException e) {
                System.out.println("Lỗi khi xóa file: " + e.getMessage());
            }
        }

        dtlProductsRepository.delete(product);
    }

    public DtlProductsDTO update(Integer id, DtlProductsUpdateVO vo, MultipartFile file) throws IOException {
        DtlProducts bean = requireOne(id);

        if (file != null && !file.isEmpty()) {
            if (bean.getImageURL() != null) {
                String filePath = uploadDir + bean.getImageURL().replace("/images/", "");
                try {
                    Path path = Paths.get(filePath);
                    if (Files.exists(path)) {
                        Files.delete(path);
                        System.out.println("Đã xóa file: " + filePath);
                    }
                } catch (IOException e) {
                    System.out.println("Lỗi khi xóa file: " + e.getMessage());
                }
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir, fileName);
            Files.createDirectories(uploadPath.getParent());
            Files.write(uploadPath, file.getBytes());
            bean.setImageURL("/images/" + fileName);
        }

        BeanUtils.copyProperties(vo, bean, "productID");
        bean.setUpdatedAt(new Date());
        bean = dtlProductsRepository.save(bean);
        return toDTO(bean);
    }

    public DtlProductsDTO getById(Integer id) {
        DtlProducts original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlProductsDTO> query(DtlProductsQueryVO vo) {
        Pageable pageable = PageRequest.of(vo.getPage(), vo.getSize(), Sort.by("productID").ascending());

        // Lọc theo các điều kiện
        if ((vo.getProductName() != null && !vo.getProductName().isEmpty()) ||
                (vo.getCategoryIds() != null && !vo.getCategoryIds().isEmpty()) ||
                vo.getMinPrice() != null || vo.getMaxPrice() != null) {
            return dtlProductsRepository.findByFilters(
                    vo.getProductName(),
                    vo.getCategoryIds(),
                    vo.getMinPrice(),
                    vo.getMaxPrice(),
                    pageable
            ).map(this::toDTO);
        }
        return dtlProductsRepository.findAll(pageable).map(this::toDTO);
    }

    private DtlProductsDTO toDTO(DtlProducts original) {
        DtlProductsDTO bean = new DtlProductsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlProducts requireOne(Integer id) {
        return dtlProductsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found: " + id));
    }
}