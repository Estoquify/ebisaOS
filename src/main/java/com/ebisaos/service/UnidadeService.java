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
import com.ebisaos.domain.Unidade;
import com.ebisaos.repository.UnidadeRepository;

@Service
@Transactional
public class UnidadeService {
    
    private final Logger log = LoggerFactory.getLogger(UnidadeService.class);

    @Autowired
    UnidadeRepository unidadeRepository;

    @Autowired
    EnderecoService enderecoService;

    public List<Unidade> findAll(Pageable pageable) {
        return unidadeRepository.findAll(pageable).getContent();
    }

    public List<Unidade> findAll() {
        return unidadeRepository.findAll();
    }

    public Unidade findById(long id) {
        return unidadeRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return unidadeRepository.existsById(id);
    }

    public Unidade save(Unidade obj) {
        return unidadeRepository.save(obj);
    }

    public void delete(Unidade obj) {
        unidadeRepository.delete(obj);
    }

    public void deleteById(Long id) {
        unidadeRepository.deleteById(id);
    }

    public Unidade montarUnidade(Unidade unidade) {
        Endereco endereco = enderecoService.save(unidade.getEndereco());

        unidade.setEndereco(endereco);
        return save(unidade);
    }

    public Page<Unidade> listPage(Pageable pageable, List<Unidade> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<Unidade> page = new PageImpl<Unidade>(lista, PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<Unidade> listaPageUnidade(Pageable pageable, Map<String, String> params) {
        Long countUnidade = unidadeRepository.countListaUnidade(params.get("pesquisa"));
        List<Unidade> listaUnidade = unidadeRepository.listaUnidadeRaw(params.get("pesquisa"), Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        
        Page<Unidade> pageUnidade = listPage(pageable, listaUnidade, countUnidade);

        return pageUnidade;
    }

}
