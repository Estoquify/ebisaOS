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
import com.ebisaos.domain.Item;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.domain.Unidade;
import com.ebisaos.repository.ComentarioRepository;
import com.ebisaos.repository.SolicitacaoRepository;
import com.ebisaos.service.dto.QuantidadeItensDTO;
import com.ebisaos.service.dto.SolicitacaoDTO;
import com.ebisaos.service.dto.SolicitacaoViewDTO;

@Service
@Transactional
public class SolicitacaoService {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoService.class);

    @Autowired
    SolicitacaoRepository solicitacaoRepository;

    @Autowired
    AvaliacaoService avaliacaoService;

    @Autowired
    SolicitacaoItemService solicitacaoItemService;

    @Autowired
    ComentarioRepository comentarioRepository;

    public List<Solicitacao> findAll(Pageable pageable) {
        return solicitacaoRepository.findAll(pageable).getContent();
    }

    public List<Solicitacao> findAll() {
        return solicitacaoRepository.findAll();
    }

    public Solicitacao findById(long id) {
        return solicitacaoRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return solicitacaoRepository.existsById(id);
    }

    public Solicitacao save(Solicitacao obj) {
        return solicitacaoRepository.save(obj);
    }

    public void delete(Solicitacao obj) {
        solicitacaoRepository.delete(obj);
    }

    public void montarSolicicao(SolicitacaoDTO solicitacaoDTO) {

        avaliacaoService.avaliacaoInicial(solicitacaoDTO.getSolicitacao());
        for (QuantidadeItensDTO item : solicitacaoDTO.getItens()) {
            solicitacaoItemService.montarSolicitacaoItem(item, solicitacaoDTO.getSolicitacao());
        }

    }

    public void editarSolicitacao(SolicitacaoDTO solicitacaoDTO) {
        Avaliacao avaliacao = avaliacaoService.avaliacaoPorSolicitacao(solicitacaoDTO.getSolicitacao().getId());
        avaliacao.setAprovacao(null);
        avaliacaoService.save(avaliacao);
        for (QuantidadeItensDTO item : solicitacaoDTO.getItens()) {
            if (solicitacaoItemService.verificarSolicitacaoAberta(item.getItem().getId(), solicitacaoDTO.getSolicitacao().getId()) == 0) {
                solicitacaoItemService.montarSolicitacaoItem(item, solicitacaoDTO.getSolicitacao());
            } else if (solicitacaoItemService.verificarSolicitacaoAberta(item.getItem().getId(), solicitacaoDTO.getSolicitacao().getId()) != item.getQuantidade()) {
                solicitacaoItemService.editarSolicitacaoItem(item.getItem().getId(), solicitacaoDTO.getSolicitacao().getId(), item.getQuantidade());
            }
        }
    }

    public SolicitacaoViewDTO montarSolicitacaoView(Long idSoliciacao) {
        SolicitacaoViewDTO solicitacaoViewDTO = new SolicitacaoViewDTO();

        solicitacaoViewDTO.setSolicitacao(findById(idSoliciacao));
        solicitacaoViewDTO.setAvaliacao(avaliacaoService.avaliacaoPorSolicitacao(idSoliciacao));
        solicitacaoViewDTO.setComentarios(comentarioRepository.getListComentarios(idSoliciacao));
        solicitacaoViewDTO.setItens(solicitacaoItemService.listaDeItensPorSolicitacao(idSoliciacao));

        return solicitacaoViewDTO;
    }

}

