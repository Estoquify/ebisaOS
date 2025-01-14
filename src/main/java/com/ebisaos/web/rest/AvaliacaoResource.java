package com.ebisaos.web.rest;

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.repository.AvaliacaoRepository;
import com.ebisaos.service.AvaliacaoService;
import com.ebisaos.service.SolicitacaoService;
import com.ebisaos.service.dto.AvaliacaoEbisaMaterialDTO;
import com.ebisaos.service.dto.AvaliacaoEbisaServicoDTO;
import com.ebisaos.service.dto.AvaliacaoInfraDTO;
import com.ebisaos.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ebisaos.domain.Avaliacao}.
 */
@RestController
@RequestMapping("/api/avaliacaos")
@Transactional
public class AvaliacaoResource {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoResource.class);

    private static final String ENTITY_NAME = "avaliacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private AvaliacaoService avaliacaoService;

    @Autowired
    private SolicitacaoService solicitacaoService;

    public AvaliacaoResource(AvaliacaoRepository avaliacaoRepository) {
        this.avaliacaoRepository = avaliacaoRepository;
    }

    /**
     * {@code POST  /avaliacaos} : Create a new avaliacao.
     *
     * @param avaliacao the avaliacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avaliacao, or with status {@code 400 (Bad Request)} if the avaliacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Avaliacao> createAvaliacao(@RequestBody Avaliacao avaliacao) throws URISyntaxException {
        log.debug("REST request to save Avaliacao : {}", avaliacao);
        if (avaliacao.getId() != null) {
            throw new BadRequestAlertException("A new avaliacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        avaliacao = avaliacaoRepository.save(avaliacao);
        return ResponseEntity.created(new URI("/api/avaliacaos/" + avaliacao.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, avaliacao.getId().toString()))
            .body(avaliacao);
    }

    /**
     * {@code PUT  /avaliacaos/:id} : Updates an existing avaliacao.
     *
     * @param id the id of the avaliacao to save.
     * @param avaliacao the avaliacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avaliacao,
     * or with status {@code 400 (Bad Request)} if the avaliacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avaliacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> updateAvaliacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Avaliacao avaliacao
    ) throws URISyntaxException {
        log.debug("REST request to update Avaliacao : {}, {}", id, avaliacao);
        if (avaliacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, avaliacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!avaliacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        avaliacao = avaliacaoRepository.save(avaliacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacao.getId().toString()))
            .body(avaliacao);
    }

    @PatchMapping("avaliacaoGinfra")
    public ResponseEntity<Avaliacao> avaliacaoGinfra(@RequestBody AvaliacaoInfraDTO avaliacaoInfraDTO) throws URISyntaxException {

        // Verifica se algum dos parâmetros obrigatórios está nulo
        if (avaliacaoInfraDTO.getIdSolicitacao() == null || avaliacaoInfraDTO.getAprovacao() == null || avaliacaoInfraDTO.getResposta() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Chama o serviço de avaliação com os parâmetros validados
        Avaliacao avaliacaoGinfra = avaliacaoService.avaliacaoGinfra(avaliacaoInfraDTO);

        // Retorna a resposta com os headers e o corpo
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoGinfra.getId().toString()))
            .body(avaliacaoGinfra);
    }

    @PatchMapping("avaliacaoEbisaMaterial")
    public ResponseEntity<Avaliacao> avaliacaoEbisaMaterial(@RequestBody AvaliacaoEbisaMaterialDTO avaliacaoEbisaMaterialDTO) throws URISyntaxException {

        // Verifica se algum dos parâmetros obrigatórios está nulo
        if (avaliacaoEbisaMaterialDTO.getIdSolicitacao() == null || avaliacaoEbisaMaterialDTO.getResposta() == null || avaliacaoEbisaMaterialDTO.getAprovacao() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Chama o serviço de avaliação com os parâmetros validados
        Avaliacao avaliacaoGestor = avaliacaoService.avaliacaoEbisaMaterial(avaliacaoEbisaMaterialDTO);
        
        if (avaliacaoGestor != null && Boolean.FALSE.equals(avaliacaoGestor.getAprovacao())) {
            Long idSolicitacao = avaliacaoGestor.getSolicitacao() != null ? avaliacaoGestor.getSolicitacao().getId() : null;
        
            if (idSolicitacao != null) {
                finalizarSolicitacao(idSolicitacao);
            } else {
                // Caso `idSolicitacao` seja nulo, faça algo aqui, como lançar uma exceção ou logar o erro.
                log.error("Não foi possível finalizar a solicitação: ID da solicitação é nulo.");
            }
        }

        // Retorna a resposta com os headers e o corpo
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoGestor.getId().toString()))
            .body(avaliacaoGestor);
    }

    @PatchMapping("avaliacaoEbisaServico")
    public ResponseEntity<Avaliacao> avaliacaoEbisaServico(@RequestBody AvaliacaoEbisaServicoDTO avaliacaoEbisaServicoDTO) throws URISyntaxException {

        // Verifica se algum dos parâmetros obrigatórios está nulo
        if (avaliacaoEbisaServicoDTO.getIdSolicitacao() == null || avaliacaoEbisaServicoDTO.getResposta() == null || avaliacaoEbisaServicoDTO.getAprovacao() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Chama o serviço de avaliação com os parâmetros validados
        Avaliacao avaliacaoGestor = avaliacaoService.avaliacaoEbisaServico(avaliacaoEbisaServicoDTO);
        
        if (avaliacaoGestor != null && Boolean.FALSE.equals(avaliacaoGestor.getAprovacao())) {
            Long idSolicitacao = avaliacaoGestor.getSolicitacao() != null ? avaliacaoGestor.getSolicitacao().getId() : null;
        
            if (idSolicitacao != null) {
                finalizarSolicitacao(idSolicitacao);
            } else {
                // Caso `idSolicitacao` seja nulo, faça algo aqui, como lançar uma exceção ou logar o erro.
                log.error("Não foi possível finalizar a solicitação: ID da solicitação é nulo.");
            }
        }

        // Retorna a resposta com os headers e o corpo
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoGestor.getId().toString()))
            .body(avaliacaoGestor);
    }


    /**
     * {@code PATCH  /avaliacaos/:id} : Partial updates given fields of an existing avaliacao, field will ignore if it is null
     *
     * @param id the id of the avaliacao to save.
     * @param avaliacao the avaliacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avaliacao,
     * or with status {@code 400 (Bad Request)} if the avaliacao is not valid,
     * or with status {@code 404 (Not Found)} if the avaliacao is not found,
     * or with status {@code 500 (Internal Server Error)} if the avaliacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Avaliacao> partialUpdateAvaliacao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Avaliacao avaliacao
    ) throws URISyntaxException {
        log.debug("REST request to partial update Avaliacao partially : {}, {}", id, avaliacao);
        if (avaliacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, avaliacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!avaliacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Avaliacao> result = avaliacaoRepository
            .findById(avaliacao.getId())
            .map(existingAvaliacao -> {
                if (avaliacao.getAvalicao() != null) {
                    existingAvaliacao.setAvalicao(avaliacao.getAvalicao());
                }
                if (avaliacao.getAprovacao() != null) {
                    existingAvaliacao.setAprovacao(avaliacao.getAprovacao());
                }

                return existingAvaliacao;
            })
            .map(avaliacaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacao.getId().toString())
        );
    }

    /**
     * {@code GET  /avaliacaos} : get all the avaliacaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avaliacaos in body.
     */
    @GetMapping("")
    public List<Avaliacao> getAllAvaliacaos() {
        log.debug("REST request to get all Avaliacaos");
        return avaliacaoRepository.findAll();
    }

    /**
     * {@code GET  /avaliacaos/:id} : get the "id" avaliacao.
     *
     * @param id the id of the avaliacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avaliacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> getAvaliacao(@PathVariable("id") Long id) {
        log.debug("REST request to get Avaliacao : {}", id);
        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avaliacao);
    }

    @GetMapping("avaliarOrcamento/{idSolicitacao}/{avaliacaoOrcamento}")
    public ResponseEntity<Avaliacao> getAvaliarOrcamento(
            @PathVariable("idSolicitacao") Long idSolicitacao,
            @PathVariable("avaliacaoOrcamento") Boolean avaliacaoOrcamento) {
        // Busca a avaliação
        Avaliacao avaliacao = avaliacaoService.avaliacaoPorSolicitacao(idSolicitacao);

        // Valida se a avaliação existe
        if (avaliacao == null) {
            log.error("Avaliação não encontrada para a solicitação ID: {}", idSolicitacao);
            return ResponseEntity.notFound().build();
        }

        // Define a avaliação do orçamento
        avaliacao.setOrcamento(avaliacaoOrcamento);

        // Finaliza a solicitação se necessário
        if (Boolean.FALSE.equals(avaliacaoOrcamento)) {
            try {
                finalizarSolicitacao(idSolicitacao);
            } catch (Exception e) {
                log.error("Erro ao finalizar a solicitação ID: {}", idSolicitacao, e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(avaliacao);
            }
        }

        // Salva a avaliação atualizada
        avaliacaoRepository.save(avaliacao);

        // Retorna a avaliação salva
        return ResponseEntity.ok(avaliacao);
    }

    // Método auxiliar para finalizar a solicitação
    private void finalizarSolicitacao(Long idSolicitacao) {
        if (idSolicitacao == null) {
            throw new IllegalArgumentException("ID da solicitação não pode ser nulo.");
        }

        solicitacaoService.finalizarSolicitacao(idSolicitacao);
        log.info("Solicitação finalizada com sucesso para ID: {}", idSolicitacao);
    }


    /**
     * {@code DELETE  /avaliacaos/:id} : delete the "id" avaliacao.
     *
     * @param id the id of the avaliacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvaliacao(@PathVariable("id") Long id) {
        log.debug("REST request to delete Avaliacao : {}", id);
        avaliacaoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
