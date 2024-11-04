package com.ebisaos.repository;

import com.ebisaos.domain.Funcao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Funcao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FuncaoRepository extends JpaRepository<Funcao, Long> {}
