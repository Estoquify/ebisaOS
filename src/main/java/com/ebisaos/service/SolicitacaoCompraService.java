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

import com.ebisaos.domain.SolicitacaoCompra;
import com.ebisaos.repository.SolicitacaoCompraRepository;
import com.ebisaos.security.Response;

@Service
@Transactional
public class SolicitacaoCompraService {
    
    private final Logger log = LoggerFactory.getLogger(SolicitacaoCompraService.class);

    @Autowired
    SolicitacaoCompraRepository solicitacaoCompraRepository;

    @Autowired
    StockService stockService;

    public List<SolicitacaoCompra> findAll(Pageable pageable) {
        return solicitacaoCompraRepository.findAll(pageable).getContent();
    }

    public List<SolicitacaoCompra> findAll() {
        return solicitacaoCompraRepository.findAll();
    }

    public SolicitacaoCompra findById(long id) {
        return solicitacaoCompraRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return solicitacaoCompraRepository.existsById(id);
    }

    public SolicitacaoCompra save(SolicitacaoCompra obj) {
        return solicitacaoCompraRepository.save(obj);
    }

    public void delete(SolicitacaoCompra obj) {
        solicitacaoCompraRepository.delete(obj);
    }

    public Long quantComprada(Long idStock) {
        return solicitacaoCompraRepository.quantComprada(idStock);
    }

    public SolicitacaoCompra solicitacaoAberta(Long idStock) {
        return solicitacaoCompraRepository.solicitacaoAberta(idStock);
    }

    public Response criarSolicitacaoCompra(SolicitacaoCompra obj) {
        Long quantAtual = stockService.quantAtual(obj.getStock().getId());
        Long quantMax = stockService.quantMax(obj.getStock().getId());
        Long espaco = quantMax - quantAtual;
    
        if (obj.getQuantSolicitada() > quantMax) {
            return new Response(false, "A quantidade solicitada excede o tamanho máximo permitido no estoque.");
        }
    
        if (obj.getQuantSolicitada() > espaco) {
            return new Response(false, "Não há espaço disponível suficiente no estoque para a quantidade solicitada.");
        }
    
        save(obj);
        return new Response(true, "Solicitação de compra criada com sucesso.");
    }

    public void finalizarCompra(Long idStock) {
        Long quantAtual = stockService.quantAtual(idStock);
        Long quantComprada = quantComprada(idStock);
        Long newQuant = quantAtual + quantComprada;

        stockService.compraFinalizada(newQuant, idStock);
        SolicitacaoCompra solicitacaoCompra = solicitacaoAberta(idStock);

        solicitacaoCompra.setAberta(false);
        save(solicitacaoCompra);
    }
    

}

