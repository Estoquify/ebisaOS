package com.ebisaos.repository;

import com.ebisaos.domain.SolicitacaoItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoItemRepository extends JpaRepository<SolicitacaoItem, Long> {}
