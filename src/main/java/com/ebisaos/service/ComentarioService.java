package com.ebisaos.service;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.domain.Comentario;
import com.ebisaos.repository.AvaliacaoRepository;
import com.ebisaos.repository.ComentarioRepository;
import com.ebisaos.service.dto.ComentarioDTO;

@Service
@Transactional
public class ComentarioService {
    
    private final Logger log = LoggerFactory.getLogger(ComentarioService.class);

    @Autowired
    ComentarioRepository comentarioRepository;

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    public List<Comentario> findAll(Pageable pageable) {
        return comentarioRepository.findAll(pageable).getContent();
    }

    public List<Comentario> findAll() {
        return comentarioRepository.findAll();
    }

    public Comentario findById(long id) {
        return comentarioRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return comentarioRepository.existsById(id);
    }

    public Comentario save(Comentario obj) {
        return comentarioRepository.save(obj);
    }

    public void delete(Comentario obj) {
        comentarioRepository.delete(obj);
    }

    public Comentario criarComentario(ComentarioDTO comentarioDTO) {

        Comentario newComentario = new Comentario();
        newComentario.setRespostas(comentarioDTO.getResposta());
        newComentario.setTipoComentario("COMENTARIO UNIDADE");
        newComentario.setAvaliacao(avaliacaoRepository.findBySolicitacaoId(comentarioDTO.getIdSolicitacao()));
        save(newComentario);

        return newComentario;
    }

    public void criarComentarioAvaliacao(Avaliacao avaliacao, String resposta, String tipoComentario) {

        Comentario newComentario = new Comentario();
        newComentario.setRespostas(resposta);
        newComentario.setTipoComentario(tipoComentario);
        newComentario.setAvaliacao(avaliacao);
        save(newComentario);
    }
}
