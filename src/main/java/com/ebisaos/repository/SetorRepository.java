package com.ebisaos.repository;

import com.ebisaos.domain.Setor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Setor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {}
