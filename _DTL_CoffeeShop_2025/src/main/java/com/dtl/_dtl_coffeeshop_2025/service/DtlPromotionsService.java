package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlPromotionsDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlPromotions;
import com.dtl._dtl_coffeeshop_2025.repository.DtlPromotionsRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlPromotionsVO;

@Service
public class DtlPromotionsService {

    @Autowired
    private DtlPromotionsRepository dtlPromotionsRepository;

    public Integer save(DtlPromotionsVO vO) {
        DtlPromotions bean = new DtlPromotions();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlPromotionsRepository.save(bean);
        return bean.getPromotionID();
    }

    public void delete(Integer id) {
        dtlPromotionsRepository.deleteById(id);
    }

    public void update(Integer id, DtlPromotionsUpdateVO vO) {
        DtlPromotions bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean, "promotionID");
        dtlPromotionsRepository.save(bean);
    }

    public DtlPromotionsDTO getById(Integer id) {
        DtlPromotions original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlPromotionsDTO> query(DtlPromotionsQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("PromotionID").ascending());

        Page<DtlPromotions> page = dtlPromotionsRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlPromotionsDTO toDTO(DtlPromotions original) {
        DtlPromotionsDTO bean = new DtlPromotionsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlPromotions requireOne(Integer id) {
        return dtlPromotionsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
