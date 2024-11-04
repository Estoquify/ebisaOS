package com.ebisaos.web.rest;

import com.ebisaos.domain.Funcao;
import com.ebisaos.repository.FuncaoRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.Funcao}.
 */
@RestController
@RequestMapping("/api/funcaos")
@Transactional
public class FuncaoResource {

    private final Logger log = LoggerFactory.getLogger(FuncaoResource.class);

    private static final String ENTITY_NAME = "funcao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FuncaoRepository funcaoRepository;

    public FuncaoResource(FuncaoRepository funcaoRepository) {
        this.funcaoRepository = funcaoRepository;
    }

    /**
     * {@code POST  /funcaos} : Create a new funcao.
     *
     * @param funcao the funcao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new funcao, or with status {@code 400 (Bad Request)} if the funcao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Funcao> createFuncao(@RequestBody Funcao funcao) throws URISyntaxException {
        log.debug("REST request to save Funcao : {}", funcao);
        if (funcao.getId() != null) {
            throw new BadRequestAlertException("A new funcao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        funcao = funcaoRepository.save(funcao);
        return ResponseEntity.created(new URI("/api/funcaos/" + funcao.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, funcao.getId().toString()))
            .body(funcao);
    }

    /**
     * {@code PUT  /funcaos/:id} : Updates an existing funcao.
     *
     * @param id the id of the funcao to save.
     * @param funcao the funcao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funcao,
     * or with status {@code 400 (Bad Request)} if the funcao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the funcao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Funcao> updateFuncao(@PathVariable(value = "id", required = false) final Long id, @RequestBody Funcao funcao)
        throws URISyntaxException {
        log.debug("REST request to update Funcao : {}, {}", id, funcao);
        if (funcao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, funcao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!funcaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        funcao = funcaoRepository.save(funcao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, funcao.getId().toString()))
            .body(funcao);
    }

    /**
     * {@code PATCH  /funcaos/:id} : Partial updates given fields of an existing funcao, field will ignore if it is null
     *
     * @param id the id of the funcao to save.
     * @param funcao the funcao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funcao,
     * or with status {@code 400 (Bad Request)} if the funcao is not valid,
     * or with status {@code 404 (Not Found)} if the funcao is not found,
     * or with status {@code 500 (Internal Server Error)} if the funcao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Funcao> partialUpdateFuncao(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Funcao funcao
    ) throws URISyntaxException {
        log.debug("REST request to partial update Funcao partially : {}, {}", id, funcao);
        if (funcao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, funcao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!funcaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Funcao> result = funcaoRepository
            .findById(funcao.getId())
            .map(existingFuncao -> {
                if (funcao.getNome() != null) {
                    existingFuncao.setNome(funcao.getNome());
                }

                return existingFuncao;
            })
            .map(funcaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, funcao.getId().toString())
        );
    }

    /**
     * {@code GET  /funcaos} : get all the funcaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of funcaos in body.
     */
    @GetMapping("")
    public List<Funcao> getAllFuncaos() {
        log.debug("REST request to get all Funcaos");
        return funcaoRepository.findAll();
    }

    /**
     * {@code GET  /funcaos/:id} : get the "id" funcao.
     *
     * @param id the id of the funcao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the funcao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Funcao> getFuncao(@PathVariable("id") Long id) {
        log.debug("REST request to get Funcao : {}", id);
        Optional<Funcao> funcao = funcaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(funcao);
    }

    /**
     * {@code DELETE  /funcaos/:id} : delete the "id" funcao.
     *
     * @param id the id of the funcao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFuncao(@PathVariable("id") Long id) {
        log.debug("REST request to delete Funcao : {}", id);
        funcaoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
