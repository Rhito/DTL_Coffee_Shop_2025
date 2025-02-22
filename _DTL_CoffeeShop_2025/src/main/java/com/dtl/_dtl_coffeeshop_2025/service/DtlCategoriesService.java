package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCategoriesDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlCategories;
import com.dtl._dtl_coffeeshop_2025.repository.DtlCategoriesRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCategoriesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DtlCategoriesService {

    @Autowired
    private DtlCategoriesRepository dtlCategoriesRepository;

    public Integer save(DtlCategoriesVO vO) {
        DtlCategories bean = new DtlCategories();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlCategoriesRepository.save(bean);
        return bean.getCategoryID();
    }

    public void delete(Integer id) {
        dtlCategoriesRepository.deleteById(id);
    }

    public void update(Integer id, DtlCategoriesUpdateVO vO) {
        DtlCategories bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlCategoriesRepository.save(bean);
    }

    public DtlCategoriesDTO getById(Integer id) {
        DtlCategories original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlCategoriesDTO> query(DtlCategoriesQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("categoryID").descending());
        Page<DtlCategories> categoriesPage = dtlCategoriesRepository.findAll(pageable);

        return categoriesPage.map(this::toDTO);
    }

    private DtlCategoriesDTO toDTO(DtlCategories original) {
        DtlCategoriesDTO bean = new DtlCategoriesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlCategories requireOne(Integer id) {
        return dtlCategoriesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
