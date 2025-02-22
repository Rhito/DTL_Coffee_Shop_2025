package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlReservationsDTO;
import com.dtl._dtl_coffeeshop_2025.dto.DtlUsersDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlReservations;
import com.dtl._dtl_coffeeshop_2025.model.DtlUsers;
import com.dtl._dtl_coffeeshop_2025.repository.DtlUsersRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlUsersVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class DtlUsersService {

    @Autowired
    private DtlUsersRepository dtlUsersRepository;

    public Integer save(DtlUsersVO vO) {
        DtlUsers bean = new DtlUsers();
        BeanUtils.copyProperties(vO, bean);
        bean = dtlUsersRepository.save(bean);
        return bean.getUserID();
    }

    public void delete(Integer id) {
        dtlUsersRepository.deleteById(id);
    }

    public void update(Integer id, DtlUsersUpdateVO vO) {
        DtlUsers bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean);
        dtlUsersRepository.save(bean);
    }

    public DtlUsersDTO getById(Integer id) {
        DtlUsers original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlUsersDTO> query(DtlUsersQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("UserID").descending());

        Page<DtlUsers> page = dtlUsersRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlUsersDTO toDTO(DtlUsers original) {
        DtlUsersDTO bean = new DtlUsersDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlUsers requireOne(Integer id) {
        return dtlUsersRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
