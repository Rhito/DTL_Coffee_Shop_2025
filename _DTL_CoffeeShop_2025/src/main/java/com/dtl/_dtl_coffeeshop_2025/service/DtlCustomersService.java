package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCustomersDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlCustomers;
import com.dtl._dtl_coffeeshop_2025.repository.DtlCustomersRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.NoSuchElementException;

@Service
public class DtlCustomersService {

    @Autowired
    private DtlCustomersRepository dtlCustomersRepository;

    public Integer save(DtlCustomersVO vO) {
        DtlCustomers bean = new DtlCustomers();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlCustomersRepository.save(bean);
        return bean.getCustomerID();
    }

    public void delete(Integer id) {
        dtlCustomersRepository.deleteById(id);
    }

    public void update(Integer id, DtlCustomersUpdateVO vO) {
        DtlCustomers bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlCustomersRepository.save(bean);
    }

    public DtlCustomersDTO getById(Integer id) {
        DtlCustomers original = requireOne(id);
        return toDTO(original);
    }


    public Page<DtlCustomersDTO> query(DtlCustomersQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("customerID").ascending());

        Page<DtlCustomers> page = dtlCustomersRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlCustomersDTO toDTO(DtlCustomers original) {
        DtlCustomersDTO bean = new DtlCustomersDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlCustomers requireOne(Integer id) {
        return dtlCustomersRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
