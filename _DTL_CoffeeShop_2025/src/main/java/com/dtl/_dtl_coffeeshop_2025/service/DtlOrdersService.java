package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlOrdersDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlOrders;
import com.dtl._dtl_coffeeshop_2025.repository.DtlOrdersRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlOrdersVO;

import java.util.NoSuchElementException;

@Service
public class DtlOrdersService {

    @Autowired
    private DtlOrdersRepository dtlOrdersRepository;

    public Integer save(DtlOrdersVO vO) {
        DtlOrders bean = new DtlOrders();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlOrdersRepository.save(bean);
        return bean.getOrderID();
    }

    public void delete(Integer id) {
        dtlOrdersRepository.deleteById(id);
    }

    public void update(Integer id, DtlOrdersUpdateVO vO) {
        DtlOrders bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlOrdersRepository.save(bean);
    }

    public DtlOrdersDTO getById(Integer id) {
        DtlOrders original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlOrdersDTO> query(DtlOrdersQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("orderID").ascending());

        Page<DtlOrders> page = dtlOrdersRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlOrdersDTO toDTO(DtlOrders original) {
        DtlOrdersDTO bean = new DtlOrdersDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlOrders requireOne(Integer id) {
        return dtlOrdersRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
