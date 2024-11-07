package com.ebisaos.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.domain.SolicitacaoItem;
import com.ebisaos.repository.AvaliacaoRepository;

@Service
@Transactional
public class AvaliacaoService {
    
    private final Logger log = LoggerFactory.getLogger(AvaliacaoService.class);

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    public List<Avaliacao> findAll(Pageable pageable) {
        return avaliacaoRepository.findAll(pageable).getContent();
    }

    public List<Avaliacao> findAll() {
        return avaliacaoRepository.findAll();
    }

    public Avaliacao findById(long id) {
        return avaliacaoRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return avaliacaoRepository.existsById(id);
    }

    public Avaliacao save(Avaliacao obj) {
        return avaliacaoRepository.save(obj);
    }

    public void delete(Avaliacao obj) {
        avaliacaoRepository.delete(obj);
    }

    public Avaliacao avaliacaoPorSolicitacao(Long idSolicitacao) {
        return avaliacaoRepository.getAvalicaoBySolicitacao(idSolicitacao);
    }

    public void avaliacaoInicial(Solicitacao solicitacao) {
        Avaliacao avaliacao = new Avaliacao();

        avaliacao.setAprovacao(null);
        avaliacao.setSolicitacao(solicitacao);

        save(avaliacao);
    }
}
