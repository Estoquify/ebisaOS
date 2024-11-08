package com.ebisaos.service;

import java.time.Instant;
import java.time.LocalDateTime;
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

import com.ebisaos.domain.Item;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.domain.SolicitacaoItem;
import com.ebisaos.domain.User;
import com.ebisaos.repository.SolicitacaoItemRepository;
import com.ebisaos.repository.UserRepository;
import com.ebisaos.security.SecurityUtils;
import com.ebisaos.service.dto.QuantidadeItensDTO;

@Service
@Transactional
public class SolicitacaoItemService {
    
    private final Logger log = LoggerFactory.getLogger(SolicitacaoItemService.class);

    @Autowired
    SolicitacaoItemRepository solicitacaoItemRepository;

    @Autowired
    UserRepository userRepository;

    public List<SolicitacaoItem> findAll(Pageable pageable) {
        return solicitacaoItemRepository.findAll(pageable).getContent();
    }

    public List<SolicitacaoItem> findAll() {
        return solicitacaoItemRepository.findAll();
    }

    public SolicitacaoItem findById(long id) {
        return solicitacaoItemRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return solicitacaoItemRepository.existsById(id);
    }

    public SolicitacaoItem save(SolicitacaoItem obj) {
        return solicitacaoItemRepository.save(obj);
    }

    public void delete(SolicitacaoItem obj) {
        solicitacaoItemRepository.delete(obj);
    }

    public Long verificarSolicitacaoAberta(Long idItem, Long idSolicitacao) {
        return solicitacaoItemRepository.findQuantidadeSolicitadaByItemIdAndSolicitacaoId(idItem, idSolicitacao);
    }

    public List<Item> listaDeItensPorSolicitacao(Long idSolicitacao) {
        return solicitacaoItemRepository.getItemPorSolicitacao(idSolicitacao);
    }

    public SolicitacaoItem solicitacaoItemPorItemESolicitacao(Long idItem, Long idSolicitacao) {
        return solicitacaoItemRepository.findSolicitacaoItemByItemIdAndSolicitacaoId(idItem, idSolicitacao);
    }

    public void montarSolicitacaoItem(QuantidadeItensDTO item, Solicitacao solicitacao) {
        SolicitacaoItem solicitacaoItem = new SolicitacaoItem();

        solicitacaoItem.setItem(item.getItem());
        solicitacaoItem.setQuantidadeSolicitada(item.getQuantidade());
        solicitacaoItem.setSolicitacao(solicitacao);

        save(solicitacaoItem);
    }

    public void editarSolicitacaoItem(Long idItem, Long idSolicitacao, Long quantidade) {
        SolicitacaoItem solicitacaoItem = solicitacaoItemPorItemESolicitacao(idItem, idSolicitacao);

        solicitacaoItem.setQuantidadeSolicitada(quantidade);
        save(solicitacaoItem);
    }
}
