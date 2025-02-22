package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlOrdersDTO;
import com.dtl._dtl_coffeeshop_2025.dto.DtlProductsDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlOrders;
import com.dtl._dtl_coffeeshop_2025.model.DtlProducts;
import com.dtl._dtl_coffeeshop_2025.repository.DtlProductsRepository;
import com.dtl._dtl_coffeeshop_2025.vo.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DtlProductsService {

    @Autowired
    private DtlProductsRepository dtlProductsRepository;

    public Integer save(DtlProductsVO vO) {
        DtlProducts bean = new DtlProducts();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlProductsRepository.save(bean);
        return bean.getProductID();
    }

    public void delete(Integer id) {
        dtlProductsRepository.deleteById(id);
    }

    public void update(Integer id, DtlProductsUpdateVO vO) {
        DtlProducts bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlProductsRepository.save(bean);
    }

    public DtlProductsDTO getById(Integer id) {
        DtlProducts original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlProductsDTO> query(DtlProductsQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("ProductID").ascending());

        Page<DtlProducts> page = dtlProductsRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlProductsDTO toDTO(DtlProducts original) {
        DtlProductsDTO bean = new DtlProductsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlProducts requireOne(Integer id) {
        return dtlProductsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
