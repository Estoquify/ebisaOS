package com.ebisaos.repository;

import com.ebisaos.domain.SetorUnidade;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SetorUnidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SetorUnidadeRepository extends JpaRepository<SetorUnidade, Long> {

    public List<SetorUnidade> findAllByUnidade_Id(Long idUnidade);
}
