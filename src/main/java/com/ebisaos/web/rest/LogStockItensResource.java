package com.ebisaos.web.rest;

import com.ebisaos.domain.LogStockItens;
import com.ebisaos.repository.LogStockItensRepository;
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
 * REST controller for managing {@link com.ebisaos.domain.LogStockItens}.
 */
@RestController
@RequestMapping("/api/log-stock-itens")
@Transactional
public class LogStockItensResource {

    private final Logger log = LoggerFactory.getLogger(LogStockItensResource.class);

    private static final String ENTITY_NAME = "logStockItens";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LogStockItensRepository logStockItensRepository;

    public LogStockItensResource(LogStockItensRepository logStockItensRepository) {
        this.logStockItensRepository = logStockItensRepository;
    }

    /**
     * {@code POST  /log-stock-itens} : Create a new logStockItens.
     *
     * @param logStockItens the logStockItens to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new logStockItens, or with status {@code 400 (Bad Request)} if the logStockItens has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LogStockItens> createLogStockItens(@RequestBody LogStockItens logStockItens) throws URISyntaxException {
        log.debug("REST request to save LogStockItens : {}", logStockItens);
        if (logStockItens.getId() != null) {
            throw new BadRequestAlertException("A new logStockItens cannot already have an ID", ENTITY_NAME, "idexists");
        }
        logStockItens = logStockItensRepository.save(logStockItens);
        return ResponseEntity.created(new URI("/api/log-stock-itens/" + logStockItens.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, logStockItens.getId().toString()))
            .body(logStockItens);
    }

    /**
     * {@code PUT  /log-stock-itens/:id} : Updates an existing logStockItens.
     *
     * @param id the id of the logStockItens to save.
     * @param logStockItens the logStockItens to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logStockItens,
     * or with status {@code 400 (Bad Request)} if the logStockItens is not valid,
     * or with status {@code 500 (Internal Server Error)} if the logStockItens couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LogStockItens> updateLogStockItens(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LogStockItens logStockItens
    ) throws URISyntaxException {
        log.debug("REST request to update LogStockItens : {}, {}", id, logStockItens);
        if (logStockItens.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logStockItens.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logStockItensRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        logStockItens = logStockItensRepository.save(logStockItens);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logStockItens.getId().toString()))
            .body(logStockItens);
    }

    /**
     * {@code PATCH  /log-stock-itens/:id} : Partial updates given fields of an existing logStockItens, field will ignore if it is null
     *
     * @param id the id of the logStockItens to save.
     * @param logStockItens the logStockItens to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated logStockItens,
     * or with status {@code 400 (Bad Request)} if the logStockItens is not valid,
     * or with status {@code 404 (Not Found)} if the logStockItens is not found,
     * or with status {@code 500 (Internal Server Error)} if the logStockItens couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LogStockItens> partialUpdateLogStockItens(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LogStockItens logStockItens
    ) throws URISyntaxException {
        log.debug("REST request to partial update LogStockItens partially : {}, {}", id, logStockItens);
        if (logStockItens.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, logStockItens.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!logStockItensRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LogStockItens> result = logStockItensRepository
            .findById(logStockItens.getId())
            .map(existingLogStockItens -> {
                if (logStockItens.getQuantAtual() != null) {
                    existingLogStockItens.setQuantAtual(logStockItens.getQuantAtual());
                }
                if (logStockItens.getQuantAnterior() != null) {
                    existingLogStockItens.setQuantAnterior(logStockItens.getQuantAnterior());
                }

                return existingLogStockItens;
            })
            .map(logStockItensRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, logStockItens.getId().toString())
        );
    }

    /**
     * {@code GET  /log-stock-itens} : get all the logStockItens.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of logStockItens in body.
     */
    @GetMapping("")
    public List<LogStockItens> getAllLogStockItens() {
        log.debug("REST request to get all LogStockItens");
        return logStockItensRepository.findAll();
    }

    /**
     * {@code GET  /log-stock-itens/:id} : get the "id" logStockItens.
     *
     * @param id the id of the logStockItens to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the logStockItens, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LogStockItens> getLogStockItens(@PathVariable("id") Long id) {
        log.debug("REST request to get LogStockItens : {}", id);
        Optional<LogStockItens> logStockItens = logStockItensRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(logStockItens);
    }

    /**
     * {@code DELETE  /log-stock-itens/:id} : delete the "id" logStockItens.
     *
     * @param id the id of the logStockItens to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLogStockItens(@PathVariable("id") Long id) {
        log.debug("REST request to delete LogStockItens : {}", id);
        logStockItensRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
