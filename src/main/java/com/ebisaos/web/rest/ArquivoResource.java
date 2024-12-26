package com.ebisaos.web.rest;

import com.ebisaos.domain.Arquivo;
import com.ebisaos.repository.ArquivoRepository;
import com.ebisaos.service.ArquivoService;
import com.ebisaos.service.dto.ArquivosDTO;
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
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.ebisaos.domain.Arquivo}.
 */
@RestController
@RequestMapping("/api/arquivos")
@Transactional
public class ArquivoResource {

    private final Logger log = LoggerFactory.getLogger(ArquivoResource.class);

    private static final String ENTITY_NAME = "arquivo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArquivoRepository arquivoRepository;

    @Autowired
    private ArquivoService arquivoService;

    public ArquivoResource(ArquivoRepository arquivoRepository) {
        this.arquivoRepository = arquivoRepository;
    }

    /**
     * {@code POST  /arquivos} : Create a new arquivo.
     *
     * @param arquivo the arquivo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new arquivo, or with status {@code 400 (Bad Request)} if the
     *         arquivo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Arquivo> createArquivo(@RequestBody ArquivosDTO arquivo) throws URISyntaxException {
        log.debug("REST request to save Arquivo : {}", arquivo);

        Arquivo newArquivo = arquivoService.criarArquivos(arquivo);
        return ResponseEntity.created(new URI("/api/arquivos/" + newArquivo.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME,
                        newArquivo.getId().toString()))
                .body(newArquivo);
    }

    /**
     * {@code GET  /arquivos} : get all the arquivos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of arquivos in body.
     */
    @GetMapping("")
    public List<Arquivo> getAllArquivos() {
        log.debug("REST request to get all Arquivos");
        return arquivoRepository.findAll();
    }

    /**
     * {@code GET  /arquivos/:id} : get the "id" arquivo.
     *
     * @param id the id of the arquivo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the arquivo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Arquivo> getArquivo(@PathVariable("id") Long id) {
        log.debug("REST request to get Arquivo : {}", id);
        Optional<Arquivo> arquivo = arquivoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(arquivo);
    }

    /**
     * {@code DELETE  /arquivos/:id} : delete the "id" arquivo.
     *
     * @param id the id of the arquivo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArquivo(@PathVariable("id") Long id) {
        log.debug("REST request to delete Arquivo : {}", id);
        arquivoRepository.deleteById(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                .build();
    }
}
