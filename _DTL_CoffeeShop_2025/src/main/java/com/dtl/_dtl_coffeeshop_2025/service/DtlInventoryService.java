package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlCustomersDTO;
import com.dtl._dtl_coffeeshop_2025.dto.DtlInventoryDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlCustomers;
import com.dtl._dtl_coffeeshop_2025.model.DtlInventory;
import com.dtl._dtl_coffeeshop_2025.repository.DtlInventoryRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlCustomersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlInventoryVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DtlInventoryService {

    @Autowired
    private DtlInventoryRepository dtlInventoryRepository;

    public Integer save(DtlInventoryVO vO) {
        DtlInventory bean = new DtlInventory();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlInventoryRepository.save(bean);
        return bean.getInventoryID();
    }

    public void delete(Integer id) {
        dtlInventoryRepository.deleteById(id);
    }

    public void update(Integer id, DtlInventoryUpdateVO vO) {
        DtlInventory bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlInventoryRepository.save(bean);
    }

    public DtlInventoryDTO getById(Integer id) {
        DtlInventory original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlInventoryDTO> query(DtlInventoryQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("inventoryID").ascending());

        Page<DtlInventory> page = dtlInventoryRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlInventoryDTO toDTO(DtlInventory original) {
        DtlInventoryDTO bean = new DtlInventoryDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlInventory requireOne(Integer id) {
        return dtlInventoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
