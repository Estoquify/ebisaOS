package com.ebisaos.web.rest;

import com.ebisaos.domain.Colaborador;
import com.ebisaos.repository.ColaboradorRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.Colaborador}.
 */
@RestController
@RequestMapping("/api/colaboradors")
@Transactional
public class ColaboradorResource {

    private final Logger log = LoggerFactory.getLogger(ColaboradorResource.class);

    private static final String ENTITY_NAME = "colaborador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ColaboradorRepository colaboradorRepository;

    public ColaboradorResource(ColaboradorRepository colaboradorRepository) {
        this.colaboradorRepository = colaboradorRepository;
    }

    /**
     * {@code POST  /colaboradors} : Create a new colaborador.
     *
     * @param colaborador the colaborador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new colaborador, or with status {@code 400 (Bad Request)} if the colaborador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Colaborador> createColaborador(@RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to save Colaborador : {}", colaborador);
        if (colaborador.getId() != null) {
            throw new BadRequestAlertException("A new colaborador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        colaborador = colaboradorRepository.save(colaborador);
        return ResponseEntity.created(new URI("/api/colaboradors/" + colaborador.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, colaborador.getId().toString()))
            .body(colaborador);
    }

    /**
     * {@code PUT  /colaboradors/:id} : Updates an existing colaborador.
     *
     * @param id the id of the colaborador to save.
     * @param colaborador the colaborador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated colaborador,
     * or with status {@code 400 (Bad Request)} if the colaborador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the colaborador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Colaborador> updateColaborador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Colaborador colaborador
    ) throws URISyntaxException {
        log.debug("REST request to update Colaborador : {}, {}", id, colaborador);
        if (colaborador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, colaborador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!colaboradorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        colaborador = colaboradorRepository.save(colaborador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, colaborador.getId().toString()))
            .body(colaborador);
    }

    /**
     * {@code PATCH  /colaboradors/:id} : Partial updates given fields of an existing colaborador, field will ignore if it is null
     *
     * @param id the id of the colaborador to save.
     * @param colaborador the colaborador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated colaborador,
     * or with status {@code 400 (Bad Request)} if the colaborador is not valid,
     * or with status {@code 404 (Not Found)} if the colaborador is not found,
     * or with status {@code 500 (Internal Server Error)} if the colaborador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Colaborador> partialUpdateColaborador(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Colaborador colaborador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Colaborador partially : {}, {}", id, colaborador);
        if (colaborador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, colaborador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!colaboradorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Colaborador> result = colaboradorRepository
            .findById(colaborador.getId())
            .map(existingColaborador -> {
                if (colaborador.getNome() != null) {
                    existingColaborador.setNome(colaborador.getNome());
                }
                if (colaborador.getCpf() != null) {
                    existingColaborador.setCpf(colaborador.getCpf());
                }

                return existingColaborador;
            })
            .map(colaboradorRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, colaborador.getId().toString())
        );
    }

    /**
     * {@code GET  /colaboradors} : get all the colaboradors.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of colaboradors in body.
     */
    @GetMapping("")
    public List<Colaborador> getAllColaboradors() {
        log.debug("REST request to get all Colaboradors");
        return colaboradorRepository.findAll();
    }

    /**
     * {@code GET  /colaboradors/:id} : get the "id" colaborador.
     *
     * @param id the id of the colaborador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the colaborador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Colaborador> getColaborador(@PathVariable("id") Long id) {
        log.debug("REST request to get Colaborador : {}", id);
        Optional<Colaborador> colaborador = colaboradorRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(colaborador);
    }

    /**
     * {@code DELETE  /colaboradors/:id} : delete the "id" colaborador.
     *
     * @param id the id of the colaborador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColaborador(@PathVariable("id") Long id) {
        log.debug("REST request to delete Colaborador : {}", id);
        colaboradorRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
