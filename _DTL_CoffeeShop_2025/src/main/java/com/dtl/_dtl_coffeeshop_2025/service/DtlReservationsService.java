package com.dtl._dtl_coffeeshop_2025.service;

import com.dtl._dtl_coffeeshop_2025.dto.DtlReservationsDTO;
import com.dtl._dtl_coffeeshop_2025.model.DtlReservations;
import com.dtl._dtl_coffeeshop_2025.repository.DtlReservationsRepository;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsQueryVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsUpdateVO;
import com.dtl._dtl_coffeeshop_2025.vo.DtlReservationsVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.NoSuchElementException;

@Service
public class DtlReservationsService {

    @Autowired
    private DtlReservationsRepository dtlReservationsRepository;

    public Integer save(DtlReservationsVO vO) {
        DtlReservations entity = new DtlReservations();
        BeanUtils.copyProperties(vO, entity);

        if (entity.getReservationDate() == null) {
            throw new IllegalArgumentException("Reservation date cannot be null");
        }
        entity.setCreatedAt(new Date());
        entity.setUpdatedAt(new Date());
        entity = dtlReservationsRepository.save(entity);
        return entity.getReservationID();
    }


    public void delete(Integer id) {
        dtlReservationsRepository.deleteById(id);
    }

    public void update(Integer id, DtlReservationsUpdateVO vO) {
        DtlReservations bean = requireOne(id);
        BeanUtils.copyProperties(vO, bean, "reservationID");
        dtlReservationsRepository.save(bean);
    }

    public DtlReservationsDTO getById(Integer id) {
        DtlReservations original = requireOne(id);
        return toDTO(original);
    }

    public Page<DtlReservationsDTO> query(DtlReservationsQueryVO vO) {
        Pageable pageable = PageRequest.of(vO.getPage(), vO.getSize(), Sort.by("ReservationID").ascending());

        Page<DtlReservations> page = dtlReservationsRepository.findAll(pageable);

        return page.map(this::toDTO);
    }

    private DtlReservationsDTO toDTO(DtlReservations original) {
        DtlReservationsDTO bean = new DtlReservationsDTO();
        BeanUtils.copyProperties(original, bean);
        return bean;
    }

    private DtlReservations requireOne(Integer id) {
        return dtlReservationsRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Resource not found: " + id));
    }
}
