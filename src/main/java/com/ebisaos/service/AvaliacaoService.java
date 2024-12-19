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
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.repository.AvaliacaoRepository;
import com.ebisaos.service.dto.ComentariosViewDTO;

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

    public Avaliacao avaliacaoGinfra(Long idSolicitacao, Boolean aprovacao, String justificativa) {
        Avaliacao avaliacao = avaliacaoPorSolicitacao(idSolicitacao);

        avaliacao.setAprovacaoGinfra(aprovacao);
        avaliacao.setAvalicaoGinfra(justificativa);
        save(avaliacao);

        return avaliacao;
    }

    public Avaliacao avaliacaoGestor(Long idSolicitacao, Boolean aprovacao, String justificativa) {
        Avaliacao avaliacao = avaliacaoPorSolicitacao(idSolicitacao);

        avaliacao.setAprovacao(aprovacao);
        avaliacao.setAvalicao(justificativa);
        save(avaliacao);

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
