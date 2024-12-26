package com.ebisaos.service;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Arquivo;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.repository.ArquivoRepository;
import com.ebisaos.service.dto.ArquivosDTO;

@Service
@Transactional
public class ArquivoService {

    private final Logger log = LoggerFactory.getLogger(ArquivoService.class);

    @Autowired
    ArquivoRepository arquivoRepository;

    @Autowired
    SolicitacaoService solicitacaoService;

    public List<Arquivo> findAll(Pageable pageable) {
        return arquivoRepository.findAll(pageable).getContent();
    }

    public List<Arquivo> findAll() {
        return arquivoRepository.findAll();
    }

    public Arquivo findById(long id) {
        return arquivoRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return arquivoRepository.existsById(id);
    }

    public Arquivo save(Arquivo obj) {
        return arquivoRepository.save(obj);
    }

    public void delete(Arquivo obj) {
        arquivoRepository.delete(obj);
    }

    public Arquivo criarArquivos(ArquivosDTO arquivosDTO) {

        Solicitacao solicitacao = solicitacaoService.finalizarSolicitacao(arquivosDTO.getIdSolicitacao());

        for (Arquivo arquivo : arquivosDTO.getArquivos()) {
            arquivo.setSolicitacao(solicitacao);
            arquivo.setTipoDocumento("fotos ebisa");
            save(arquivo);
        }

        return arquivosDTO.getArquivos().get(0);
    }

}
