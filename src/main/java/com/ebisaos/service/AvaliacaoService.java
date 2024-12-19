package com.ebisaos.service;

import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.domain.Equipe;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.repository.AvaliacaoRepository;
import com.ebisaos.repository.SolicitacaoRepository;
import com.ebisaos.service.dto.AvaliacaoEbisaMaterialDTO;
import com.ebisaos.service.dto.AvaliacaoEbisaServicoDTO;
import com.ebisaos.service.dto.AvaliacaoInfraDTO;
import com.ebisaos.service.dto.ComentariosViewDTO;

@Service
@Transactional
public class AvaliacaoService {
    
    private final Logger log = LoggerFactory.getLogger(AvaliacaoService.class);

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    @Autowired
    ComentarioService comentarioService;

    @Autowired
    SolicitacaoRepository solicitacaoRepository;

    @Autowired
    EquipeService equipeService;

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

    public Avaliacao avaliacaoPorSolicitacao(Long solicitacaoId) {
        return avaliacaoRepository.findBySolicitacaoId(solicitacaoId);
    }
    
    public Boolean existeAvaliacaoPorSolicitacao(Long solicitacaoId) {
        Avaliacao avaliacao = avaliacaoRepository.avaliacaoExiste(solicitacaoId);
        return avaliacao != null;
    }

    public void avaliacaoInicial(Solicitacao solicitacao) {
        Avaliacao avaliacao = new Avaliacao();

        avaliacao.setAprovacao(null);
        avaliacao.setAprovacaoGinfra(null);
        avaliacao.setSolicitacao(solicitacao);

        save(avaliacao);
    }

    public Avaliacao avaliacaoGinfra(AvaliacaoInfraDTO avaliacaoInfraDTO) {
        Avaliacao avaliacao = avaliacaoPorSolicitacao(avaliacaoInfraDTO.getIdSolicitacao());

        avaliacao.setAprovacaoGinfra(avaliacaoInfraDTO.getAprovacao());
        save(avaliacao);
        comentarioService.criarComentarioAvaliacao(avaliacao, avaliacaoInfraDTO.getResposta(), "AVALIACAO GINFRA");
        
        Solicitacao solicitacao = avaliacao.getSolicitacao();
        solicitacao.setPrioridade(avaliacaoInfraDTO.getPrioridade());
        solicitacaoRepository.save(solicitacao);

        return avaliacao;
    }

    public Avaliacao avaliacaoEbisaMaterial(AvaliacaoEbisaMaterialDTO avaliacaoEbisaMaterialDTO) {
        Avaliacao avaliacao = avaliacaoPorSolicitacao(avaliacaoEbisaMaterialDTO.getIdSolicitacao());

        avaliacao.setAprovacao(avaliacaoEbisaMaterialDTO.getAprovacao());
        save(avaliacao);
        comentarioService.criarComentarioAvaliacao(avaliacao, avaliacaoEbisaMaterialDTO.getResposta(), "AVALIACAO EBISA");

        return avaliacao;
    }

    public Avaliacao avaliacaoEbisaServico(AvaliacaoEbisaServicoDTO avaliacaoEbisaServicoDTO) {
        Avaliacao avaliacao = avaliacaoPorSolicitacao(avaliacaoEbisaServicoDTO.getIdSolicitacao());

        avaliacao.setAprovacao(avaliacaoEbisaServicoDTO.getAprovacao());
        save(avaliacao);
        comentarioService.criarComentarioAvaliacao(avaliacao, avaliacaoEbisaServicoDTO.getResposta(), "AVALIACAO EBISA");

        for(Equipe equipe: avaliacaoEbisaServicoDTO.getEquipes()) {
            equipeService.montarSolicitacaoEquipe(equipe, avaliacao.getSolicitacao());
        }
        
        return avaliacao;
    }

    public List<ComentariosViewDTO> montarDTOChat(List<Object[]> listRaw) {
        
        List<ComentariosViewDTO> dtoList = new ArrayList<>();

        for (Object[] row : listRaw) {

            ComentariosViewDTO comentariosViewDTO = new ComentariosViewDTO();
            comentariosViewDTO.setResposta((String) row[0]);
            comentariosViewDTO.setNomeUsuario((String) row[1]);
            comentariosViewDTO.setDataAvaliacao(((java.sql.Timestamp) row[2]).toLocalDateTime());
            comentariosViewDTO.setTipoComentario((String) row[3]); 

            dtoList.add(comentariosViewDTO);
        }

        return dtoList;
    }
}
