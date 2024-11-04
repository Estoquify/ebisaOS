package com.ebisaos.web.rest;

import com.ebisaos.domain.SolicitacaoEquipe;
import com.ebisaos.repository.SolicitacaoEquipeRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.SolicitacaoEquipe}.
 */
@RestController
@RequestMapping("/api/solicitacao-equipes")
@Transactional
public class SolicitacaoEquipeResource {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoEquipeResource.class);

    private static final String ENTITY_NAME = "solicitacaoEquipe";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolicitacaoEquipeRepository solicitacaoEquipeRepository;

    public SolicitacaoEquipeResource(SolicitacaoEquipeRepository solicitacaoEquipeRepository) {
        this.solicitacaoEquipeRepository = solicitacaoEquipeRepository;
    }

    /**
     * {@code POST  /solicitacao-equipes} : Create a new solicitacaoEquipe.
     *
     * @param solicitacaoEquipe the solicitacaoEquipe to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solicitacaoEquipe, or with status {@code 400 (Bad Request)} if the solicitacaoEquipe has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SolicitacaoEquipe> createSolicitacaoEquipe(@RequestBody SolicitacaoEquipe solicitacaoEquipe)
        throws URISyntaxException {
        log.debug("REST request to save SolicitacaoEquipe : {}", solicitacaoEquipe);
        if (solicitacaoEquipe.getId() != null) {
            throw new BadRequestAlertException("A new solicitacaoEquipe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        solicitacaoEquipe = solicitacaoEquipeRepository.save(solicitacaoEquipe);
        return ResponseEntity.created(new URI("/api/solicitacao-equipes/" + solicitacaoEquipe.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, solicitacaoEquipe.getId().toString()))
            .body(solicitacaoEquipe);
    }

    /**
     * {@code PUT  /solicitacao-equipes/:id} : Updates an existing solicitacaoEquipe.
     *
     * @param id the id of the solicitacaoEquipe to save.
     * @param solicitacaoEquipe the solicitacaoEquipe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitacaoEquipe,
     * or with status {@code 400 (Bad Request)} if the solicitacaoEquipe is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solicitacaoEquipe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SolicitacaoEquipe> updateSolicitacaoEquipe(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitacaoEquipe solicitacaoEquipe
    ) throws URISyntaxException {
        log.debug("REST request to update SolicitacaoEquipe : {}, {}", id, solicitacaoEquipe);
        if (solicitacaoEquipe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitacaoEquipe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitacaoEquipeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        solicitacaoEquipe = solicitacaoEquipeRepository.save(solicitacaoEquipe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacaoEquipe.getId().toString()))
            .body(solicitacaoEquipe);
    }

    /**
     * {@code PATCH  /solicitacao-equipes/:id} : Partial updates given fields of an existing solicitacaoEquipe, field will ignore if it is null
     *
     * @param id the id of the solicitacaoEquipe to save.
     * @param solicitacaoEquipe the solicitacaoEquipe to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitacaoEquipe,
     * or with status {@code 400 (Bad Request)} if the solicitacaoEquipe is not valid,
     * or with status {@code 404 (Not Found)} if the solicitacaoEquipe is not found,
     * or with status {@code 500 (Internal Server Error)} if the solicitacaoEquipe couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SolicitacaoEquipe> partialUpdateSolicitacaoEquipe(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitacaoEquipe solicitacaoEquipe
    ) throws URISyntaxException {
        log.debug("REST request to partial update SolicitacaoEquipe partially : {}, {}", id, solicitacaoEquipe);
        if (solicitacaoEquipe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitacaoEquipe.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitacaoEquipeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SolicitacaoEquipe> result = solicitacaoEquipeRepository
            .findById(solicitacaoEquipe.getId())
            .map(solicitacaoEquipeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacaoEquipe.getId().toString())
        );
    }

    /**
     * {@code GET  /solicitacao-equipes} : get all the solicitacaoEquipes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solicitacaoEquipes in body.
     */
    @GetMapping("")
    public List<SolicitacaoEquipe> getAllSolicitacaoEquipes() {
        log.debug("REST request to get all SolicitacaoEquipes");
        return solicitacaoEquipeRepository.findAll();
    }

    /**
     * {@code GET  /solicitacao-equipes/:id} : get the "id" solicitacaoEquipe.
     *
     * @param id the id of the solicitacaoEquipe to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solicitacaoEquipe, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoEquipe> getSolicitacaoEquipe(@PathVariable("id") Long id) {
        log.debug("REST request to get SolicitacaoEquipe : {}", id);
        Optional<SolicitacaoEquipe> solicitacaoEquipe = solicitacaoEquipeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(solicitacaoEquipe);
    }

    /**
     * {@code DELETE  /solicitacao-equipes/:id} : delete the "id" solicitacaoEquipe.
     *
     * @param id the id of the solicitacaoEquipe to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolicitacaoEquipe(@PathVariable("id") Long id) {
        log.debug("REST request to delete SolicitacaoEquipe : {}", id);
        solicitacaoEquipeRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
