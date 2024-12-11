package com.ebisaos.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Equipe;
import com.ebisaos.repository.EquipeRepository;

@Service
@Transactional
public class EquipeService {
    
    private final Logger log = LoggerFactory.getLogger(EquipeService.class);

    @Autowired
    EquipeRepository equipeRepository;

    public List<Equipe> findAll(Pageable pageable) {
        return equipeRepository.findAll(pageable).getContent();
    }

    public List<Equipe> findAll() {
        return equipeRepository.findAll();
    }

    public Equipe findById(long id) {
        return equipeRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return equipeRepository.existsById(id);
    }

    public Equipe save(Equipe obj) {
        return equipeRepository.save(obj);
    }

    public void delete(Equipe obj) {
        equipeRepository.delete(obj);
    }

    public Page<Equipe> listPage(Pageable pageable, List<Equipe> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<Equipe> page = new PageImpl<Equipe>(lista, PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<Equipe> listaPageEquipe(Pageable pageable, Map<String, String> params) {
        Long countEquipe = equipeRepository.countListaEquipe(params.get("pesquisa"));
        List<Equipe> listaEquipe = equipeRepository.listaEquipeRaw(params.get("pesquisa"), Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        
        Page<Equipe> pageEquipe = listPage(pageable, listaEquipe, countEquipe);

        return pageEquipe;
    }

}
