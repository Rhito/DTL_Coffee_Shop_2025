package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlReservationsDTO;
import com.dtl._dtl_coffeeshop_2025.dto.DtlTablesDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlReservations;
import com.dtl._dtl_coffeeshop_2025.model.DtlTables;
import com.dtl._dtl_coffeeshop_2025.repository.DtlTablesRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlTablesVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DtlTablesService {

    @Autowired
    private DtlTablesRepository dtlTablesRepository;

    public Integer save(DtlTablesVO vO) {
        DtlTables bean = new DtlTables();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlTablesRepository.save(bean);
        return bean.getTableID();
    }

    public void delete(Integer id) {
        dtlTablesRepository.deleteById(id);
    }

    public void update(Integer id, DtlTablesUpdateVO vO) {
        DtlTables bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlTablesRepository.save(bean);
    }

    public DtlTablesDTO getById(Integer id) {
        DtlTables original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlTablesDTO> query(DtlTablesQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("TableID").ascending());

        Page<DtlTables> page = dtlTablesRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlTablesDTO toDTO(DtlTables original) {
        DtlTablesDTO bean = new DtlTablesDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlTables requireOne(Integer id) {
        return dtlTablesRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
