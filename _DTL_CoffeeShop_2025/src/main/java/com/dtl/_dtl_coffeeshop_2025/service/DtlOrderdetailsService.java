package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCustomersDTO;
import com.dtl._dtl_coffeeshop_2025.dto.DtlOrderdetailsDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlCustomers;
import com.dtl._dtl_coffeeshop_2025.model.DtlOrderdetails;
import com.dtl._dtl_coffeeshop_2025.repository.DtlOrderdetailsRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersQueryVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrderdetailsVO;

import java.util.NoSuchElementException;

@Service
public class DtlOrderdetailsService {

    @Autowired
    private DtlOrderdetailsRepository dtlOrderdetailsRepository;

    public Integer save(DtlOrderdetailsVO vO) {
        DtlOrderdetails bean = new DtlOrderdetails();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlOrderdetailsRepository.save(bean);
        return bean.getOrderDetailID();
    }

    public void delete(Integer id) {
        dtlOrderdetailsRepository.deleteById(id);
    }

    public void update(Integer id, DtlOrderdetailsUpdateVO vO) {
        DtlOrderdetails bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlOrderdetailsRepository.save(bean);
    }

    public DtlOrderdetailsDTO getById(Integer id) {
        DtlOrderdetails original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlOrderdetailsDTO> query(DtlOrderdetailsQueryVO vO) {
        int page = (vO.getPage() != 0) ? vO.getPage() : 0;
        int size = (vO.getSize() != 0) ? vO.getSize() : 10;

        Pageable pageable = PageRequest.of(page, size, Sort.by("OrderDetailID").ascending());

        Page<DtlOrderdetails> pageResult = dtlOrderdetailsRepository.findAll(pageable);

        return pageResult.map(this::toDTO);
    }

    private DtlOrderdetailsDTO toDTO(DtlOrderdetails original) {
        DtlOrderdetailsDTO bean = new DtlOrderdetailsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlOrderdetails requireOne(Integer id) {
        return dtlOrderdetailsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
