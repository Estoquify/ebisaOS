package com.ebisaos.web.rest;

import com.ebisaos.domain.SetorUnidade;
import com.ebisaos.repository.SetorUnidadeRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.Setor}.
 */
@RestController
@RequestMapping("/api/setorUnidades")
@Transactional
public class SetorUnidadeResource {

    private final Logger log = LoggerFactory.getLogger(SetorUnidadeResource.class);

    private static final String ENTITY_NAME = "setor";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SetorUnidadeRepository setorUnidadeRepository;

    public SetorUnidadeResource(SetorUnidadeRepository setorUnidadeRepository) {
        this.setorUnidadeRepository = setorUnidadeRepository;
    }

    /**
     * {@code POST  /setorUnidades} : Create a new setorUnidade.
     *
     * @param setorUnidade the setorUnidade to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new setorUnidade, or with status {@code 400 (Bad Request)} if the setor has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SetorUnidade> createSetor(@RequestBody SetorUnidade setorUnidade) throws URISyntaxException {
        log.debug("REST request to save Setor : {}", setorUnidade);
        if (setorUnidade.getId() != null) {
            throw new BadRequestAlertException("A new setor cannot already have an ID", ENTITY_NAME, "idexists");
        }
        setorUnidade = setorUnidadeRepository.save(setorUnidade);
        return ResponseEntity.created(new URI("/api/setorUnidades/" + setorUnidade.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, setorUnidade.getId().toString()))
            .body(setorUnidade);
    }

    /**
     * {@code PUT  /setorUnidades/:id} : Updates an existing setorUnidade.
     *
     * @param id the id of the setorUnidade to save.
     * @param setorUnidade the setorUnidade to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated setorUnidade,
     * or with status {@code 400 (Bad Request)} if the setorUnidade is not valid,
     * or with status {@code 500 (Internal Server Error)} if the setorUnidade couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SetorUnidade> updateSetor(@PathVariable(value = "id", required = false) final Long id, @RequestBody SetorUnidade setorUnidade)
        throws URISyntaxException {
        log.debug("REST request to update Setor : {}, {}", id, setorUnidade);
        if (setorUnidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, setorUnidade.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!setorUnidadeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        setorUnidade = setorUnidadeRepository.save(setorUnidade);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, setorUnidade.getId().toString()))
            .body(setorUnidade);
    }

    /**
     * {@code PATCH  /setorUnidades/:id} : Partial updates given fields of an existing setorUnidade, field will ignore if it is null
     *
     * @param id the id of the setorUnidade to save.
     * @param setorUnidade the setorUnidade to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated setorUnidade,
     * or with status {@code 400 (Bad Request)} if the setorUnidade is not valid,
     * or with status {@code 404 (Not Found)} if the setorUnidade is not found,
     * or with status {@code 500 (Internal Server Error)} if the setorUnidade couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SetorUnidade> partialUpdateSetor(@PathVariable(value = "id", required = false) final Long id, @RequestBody SetorUnidade setorUnidade)
        throws URISyntaxException {
        log.debug("REST request to partial update Setor partially : {}, {}", id, setorUnidade);
        if (setorUnidade.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, setorUnidade.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!setorUnidadeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SetorUnidade> result = setorUnidadeRepository
            .findById(setorUnidade.getId())
            .map(existingSetor -> {
                if (setorUnidade.getNome() != null) {
                    existingSetor.setNome(setorUnidade.getNome());
                }

                return existingSetor;
            })
            .map(setorUnidadeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, setorUnidade.getId().toString())
        );
    }

    /**
     * {@code GET  /setors} : get all the setors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of setors in body.
     */
    @GetMapping("")
    public List<SetorUnidade> getAllSetors() {
        log.debug("REST request to get all Setors");
        return setorUnidadeRepository.findAll();
    }

    /**
     * {@code GET  /setors/:id} : get the "id" setor.
     *
     * @param id the id of the setor to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the setor, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SetorUnidade> getSetor(@PathVariable("id") Long id) {
        log.debug("REST request to get Setor : {}", id);
        Optional<SetorUnidade> setorUnidade = setorUnidadeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(setorUnidade);
    }

    /**
     * {@code DELETE  /setors/:id} : delete the "id" setor.
     *
     * @param id the id of the setor to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSetor(@PathVariable("id") Long id) {
        log.debug("REST request to delete Setor : {}", id);
        setorUnidadeRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
