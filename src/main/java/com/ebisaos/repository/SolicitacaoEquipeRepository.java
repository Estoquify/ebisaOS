package com.ebisaos.repository;

import com.ebisaos.domain.SolicitacaoEquipe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoEquipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoEquipeRepository extends JpaRepository<SolicitacaoEquipe, Long> {}
