package com.ebisaos.web.rest;

import com.ebisaos.domain.Orgao;
import com.ebisaos.repository.OrgaoRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.Orgao}.
 */
@RestController
@RequestMapping("/api/orgaos")
@Transactional
public class OrgaoResource {

    private final Logger log = LoggerFactory.getLogger(OrgaoResource.class);

    private static final String ENTITY_NAME = "orgao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrgaoRepository orgaoRepository;

    public OrgaoResource(OrgaoRepository orgaoRepository) {
        this.orgaoRepository = orgaoRepository;
    }

    /**
     * {@code POST  /orgaos} : Create a new orgao.
     *
     * @param orgao the orgao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orgao, or with status {@code 400 (Bad Request)} if the orgao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Orgao> createOrgao(@RequestBody Orgao orgao) throws URISyntaxException {
        log.debug("REST request to save Orgao : {}", orgao);
        if (orgao.getId() != null) {
            throw new BadRequestAlertException("A new orgao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        orgao = orgaoRepository.save(orgao);
        return ResponseEntity.created(new URI("/api/orgaos/" + orgao.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, orgao.getId().toString()))
            .body(orgao);
    }

    /**
     * {@code PUT  /orgaos/:id} : Updates an existing orgao.
     *
     * @param id the id of the orgao to save.
     * @param orgao the orgao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orgao,
     * or with status {@code 400 (Bad Request)} if the orgao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orgao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Orgao> updateOrgao(@PathVariable(value = "id", required = false) final Long id, @RequestBody Orgao orgao)
        throws URISyntaxException {
        log.debug("REST request to update Orgao : {}, {}", id, orgao);
        if (orgao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orgao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!orgaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        orgao = orgaoRepository.save(orgao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orgao.getId().toString()))
            .body(orgao);
    }

    /**
     * {@code PATCH  /orgaos/:id} : Partial updates given fields of an existing orgao, field will ignore if it is null
     *
     * @param id the id of the orgao to save.
     * @param orgao the orgao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orgao,
     * or with status {@code 400 (Bad Request)} if the orgao is not valid,
     * or with status {@code 404 (Not Found)} if the orgao is not found,
     * or with status {@code 500 (Internal Server Error)} if the orgao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Orgao> partialUpdateOrgao(@PathVariable(value = "id", required = false) final Long id, @RequestBody Orgao orgao)
        throws URISyntaxException {
        log.debug("REST request to partial update Orgao partially : {}, {}", id, orgao);
        if (orgao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, orgao.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!orgaoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Orgao> result = orgaoRepository
            .findById(orgao.getId())
            .map(existingOrgao -> {
                if (orgao.getNome() != null) {
                    existingOrgao.setNome(orgao.getNome());
                }

                return existingOrgao;
            })
            .map(orgaoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, orgao.getId().toString())
        );
    }

    /**
     * {@code GET  /orgaos} : get all the orgaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orgaos in body.
     */
    @GetMapping("")
    public List<Orgao> getAllOrgaos() {
        log.debug("REST request to get all Orgaos");
        return orgaoRepository.findAll();
    }

    /**
     * {@code GET  /orgaos/:id} : get the "id" orgao.
     *
     * @param id the id of the orgao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orgao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Orgao> getOrgao(@PathVariable("id") Long id) {
        log.debug("REST request to get Orgao : {}", id);
        Optional<Orgao> orgao = orgaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orgao);
    }

    /**
     * {@code DELETE  /orgaos/:id} : delete the "id" orgao.
     *
     * @param id the id of the orgao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrgao(@PathVariable("id") Long id) {
        log.debug("REST request to delete Orgao : {}", id);
        orgaoRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
