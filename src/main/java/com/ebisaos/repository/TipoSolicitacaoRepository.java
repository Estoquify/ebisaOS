package com.ebisaos.repository;

import com.ebisaos.domain.TipoSolicitacao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the TipoSolicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoSolicitacaoRepository extends JpaRepository<TipoSolicitacao, Long> {}
