package com.ebisaos.web.rest;

import com.ebisaos.domain.TipoSolicitacao;
import com.ebisaos.repository.TipoSolicitacaoRepository;
import com.ebisaos.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ebisaos.domain.TipoSolicitacao}.
 */
@RestController
@RequestMapping("/api/tipoSolicitacao")
@Transactional
public class TipoSolicitacaoResource {

    private final Logger log = LoggerFactory.getLogger(TipoSolicitacaoResource.class);

    private static final String ENTITY_NAME = "tipoSolicitacao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoSolicitacaoRepository tipoSolicitacaoRepository;

    public TipoSolicitacaoResource(TipoSolicitacaoRepository tipoSolicitacaoRepository) {
        this.tipoSolicitacaoRepository = tipoSolicitacaoRepository;
    }

    /**
     * {@code POST  /tipoSolicitacaos} : Create a new tipoSolicitacao.
     *
     * @param tipoSolicitacao the tipoSolicitacao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoSolicitacao, or with status {@code 400 (Bad Request)} if the tipoSolicitacao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<TipoSolicitacao> createTipoSolicitacao(@RequestBody TipoSolicitacao tipoSolicitacao) throws URISyntaxException {
        log.debug("REST request to save tipoSolicitacao : {}", tipoSolicitacao);
        if (tipoSolicitacao.getId() != null) {
            throw new BadRequestAlertException("A new tipoSolicitacao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        tipoSolicitacao = tipoSolicitacaoRepository.save(tipoSolicitacao);
        return ResponseEntity.created(new URI("/api/tipoSolicitacao/" + tipoSolicitacao.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, tipoSolicitacao.getId().toString()))
            .body(tipoSolicitacao);
    }

    /**
     * {@code PUT  /tipoSolicitacaos/:id} : Updates an existing tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to save.
     * @param tipoSolicitacao the tipoSolicitacao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoSolicitacao,
     * or with status {@code 400 (Bad Request)} if the tipoSolicitacao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoSolicitacao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<TipoSolicitacao> updateTipoSolicitacao(@PathVariable(value = "id", required = false) final Long id, @RequestBody TipoSolicitacao tipoSolicitacao)
        throws URISyntaxException {
        log.debug("REST request to update tipoSolicitacao : {}, {}", id, tipoSolicitacao);
        if (tipoSolicitacao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, tipoSolicitacao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!tipoSolicitacaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        tipoSolicitacao = tipoSolicitacaoRepository.save(tipoSolicitacao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoSolicitacao.getId().toString()))
            .body(tipoSolicitacao);
    }


    /**
     * {@code GET  /tipoSolicitacaos} : get all the tipoSolicitacaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoSolicitacaos in body.
     */
    @GetMapping("")
    public List<TipoSolicitacao> getAllTipoSolicitacaos() {
        log.debug("REST request to get all tipoSolicitacaos");
        return tipoSolicitacaoRepository.findAll();
    }

    /**
     * {@code GET  /tipoSolicitacaos/:id} : get the "id" tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoSolicitacao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<TipoSolicitacao> getTipoSolicitacao(@PathVariable("id") Long id) {
        log.debug("REST request to get tipoSolicitacao : {}", id);
        Optional<TipoSolicitacao> tipoSolicitacao = tipoSolicitacaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoSolicitacao);
    }

    /**
     * {@code DELETE  /tipoSolicitacaos/:id} : delete the "id" tipoSolicitacao.
     *
     * @param id the id of the tipoSolicitacao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipoSolicitacao(@PathVariable("id") Long id) {
        log.debug("REST request to delete tipoSolicitacao : {}", id);
        tipoSolicitacaoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
