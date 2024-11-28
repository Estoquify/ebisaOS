package com.ebisaos.web.rest;

import com.ebisaos.domain.SolicitacaoCompra;
import com.ebisaos.repository.SolicitacaoCompraRepository;
import com.ebisaos.security.Response;
import com.ebisaos.service.SolicitacaoCompraService;
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
 * REST controller for managing {@link com.ebisaos.domain.SolicitacaoCompra}.
 */
@RestController
@RequestMapping("/api/solicitacao-compras")
@Transactional
public class SolicitacaoCompraResource {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoCompraResource.class);

    private static final String ENTITY_NAME = "solicitacaoCompra";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SolicitacaoCompraRepository solicitacaoCompraRepository;

    private final SolicitacaoCompraService solicitacaoCompraService;

    public SolicitacaoCompraResource(SolicitacaoCompraRepository solicitacaoCompraRepository, SolicitacaoCompraService solicitacaoCompraService) {
        this.solicitacaoCompraRepository = solicitacaoCompraRepository;
        this.solicitacaoCompraService = solicitacaoCompraService;
    }

    /**
     * {@code POST  /solicitacao-compras} : Create a new solicitacaoCompra.
     *
     * @param solicitacaoCompra the solicitacaoCompra to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new solicitacaoCompra, or with status {@code 400 (Bad Request)} if the solicitacaoCompra has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<?> createSolicitacaoCompra(@RequestBody SolicitacaoCompra solicitacaoCompra)
            throws URISyntaxException {
        log.debug("REST request to save SolicitacaoCompra : {}", solicitacaoCompra);

        if (solicitacaoCompra.getId() != null) {
            throw new BadRequestAlertException("A new solicitacaoCompra cannot already have an ID", ENTITY_NAME, "idexists");
        }

        Response response = solicitacaoCompraService.criarSolicitacaoCompra(solicitacaoCompra);

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response.getMessage());
        }

        return ResponseEntity.created(new URI("/api/solicitacao-compras/" + solicitacaoCompra.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, solicitacaoCompra.getId().toString()))
                .body(solicitacaoCompra);
    }


    /**
     * {@code PUT  /solicitacao-compras/:id} : Updates an existing solicitacaoCompra.
     *
     * @param id the id of the solicitacaoCompra to save.
     * @param solicitacaoCompra the solicitacaoCompra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitacaoCompra,
     * or with status {@code 400 (Bad Request)} if the solicitacaoCompra is not valid,
     * or with status {@code 500 (Internal Server Error)} if the solicitacaoCompra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SolicitacaoCompra> updateSolicitacaoCompra(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitacaoCompra solicitacaoCompra
    ) throws URISyntaxException {
        log.debug("REST request to update SolicitacaoCompra : {}, {}", id, solicitacaoCompra);
        if (solicitacaoCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitacaoCompra.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitacaoCompraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        solicitacaoCompra = solicitacaoCompraRepository.save(solicitacaoCompra);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacaoCompra.getId().toString()))
            .body(solicitacaoCompra);
    }

    /**
     * {@code PATCH  /solicitacao-compras/:id} : Partial updates given fields of an existing solicitacaoCompra, field will ignore if it is null
     *
     * @param id the id of the solicitacaoCompra to save.
     * @param solicitacaoCompra the solicitacaoCompra to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated solicitacaoCompra,
     * or with status {@code 400 (Bad Request)} if the solicitacaoCompra is not valid,
     * or with status {@code 404 (Not Found)} if the solicitacaoCompra is not found,
     * or with status {@code 500 (Internal Server Error)} if the solicitacaoCompra couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SolicitacaoCompra> partialUpdateSolicitacaoCompra(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SolicitacaoCompra solicitacaoCompra
    ) throws URISyntaxException {
        log.debug("REST request to partial update SolicitacaoCompra partially : {}, {}", id, solicitacaoCompra);
        if (solicitacaoCompra.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, solicitacaoCompra.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!solicitacaoCompraRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SolicitacaoCompra> result = solicitacaoCompraRepository
            .findById(solicitacaoCompra.getId())
            .map(existingSolicitacaoCompra -> {
                if (solicitacaoCompra.getDescricao() != null) {
                    existingSolicitacaoCompra.setDescricao(solicitacaoCompra.getDescricao());
                }
                if (solicitacaoCompra.getAberta() != null) {
                    existingSolicitacaoCompra.setAberta(solicitacaoCompra.getAberta());
                }

                return existingSolicitacaoCompra;
            })
            .map(solicitacaoCompraRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, solicitacaoCompra.getId().toString())
        );
    }

    /**
     * {@code GET  /solicitacao-compras} : get all the solicitacaoCompras.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of solicitacaoCompras in body.
     */
    @GetMapping("")
    public List<SolicitacaoCompra> getAllSolicitacaoCompras() {
        log.debug("REST request to get all SolicitacaoCompras");
        return solicitacaoCompraRepository.findAll();
    }

    /**
     * {@code GET  /solicitacao-compras/:id} : get the "id" solicitacaoCompra.
     *
     * @param id the id of the solicitacaoCompra to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the solicitacaoCompra, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoCompra> getSolicitacaoCompra(@PathVariable("id") Long id) {
        log.debug("REST request to get SolicitacaoCompra : {}", id);
        Optional<SolicitacaoCompra> solicitacaoCompra = solicitacaoCompraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(solicitacaoCompra);
    }

    /**
     * {@code DELETE  /solicitacao-compras/:id} : delete the "id" solicitacaoCompra.
     *
     * @param id the id of the solicitacaoCompra to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSolicitacaoCompra(@PathVariable("id") Long id) {
        log.debug("REST request to delete SolicitacaoCompra : {}", id);
        solicitacaoCompraRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
