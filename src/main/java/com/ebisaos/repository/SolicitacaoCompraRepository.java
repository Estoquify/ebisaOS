package com.ebisaos.repository;

import com.ebisaos.domain.SolicitacaoCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoCompraRepository extends JpaRepository<SolicitacaoCompra, Long> {}
