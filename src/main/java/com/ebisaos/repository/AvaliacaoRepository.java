package com.ebisaos.repository;

import com.ebisaos.domain.Avaliacao;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Avaliacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    Avaliacao findBySolicitacaoId(Long solicitacaoId);

    @Query(value = "SELECT * FROM public.avaliacao a WHERE a.aprovacao_ginfra IS NOT NULL AND a.solicitacao_id = :solicitacaoId", 
       nativeQuery = true)
    Avaliacao avaliacaoExiste(@Param("solicitacaoId") Long solicitacaoId);


}
