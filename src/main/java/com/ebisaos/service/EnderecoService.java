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

import com.ebisaos.domain.Endereco;
import com.ebisaos.repository.EnderecoRepository;

@Service
@Transactional
public class EnderecoService {
    
    private final Logger log = LoggerFactory.getLogger(EnderecoService.class);

    @Autowired
    EnderecoRepository enderecoRepository;

    public List<Endereco> findAll(Pageable pageable) {
        return enderecoRepository.findAll(pageable).getContent();
    }

    public List<Endereco> findAll() {
        return enderecoRepository.findAll();
    }

    public Endereco findById(long id) {
        return enderecoRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return enderecoRepository.existsById(id);
    }

    public Endereco save(Endereco obj) {
        return enderecoRepository.save(obj);
    }

    public void delete(Endereco obj) {
        enderecoRepository.delete(obj);
    }

}
