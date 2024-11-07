package com.ebisaos.repository;

import com.ebisaos.domain.Avaliacao;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Avaliacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {

    @Query(value = """
        SELECT ava.*
        FROM public.avaliacao AS ava
        WHERE ava.solicitacao_id = ?1;
    """, nativeQuery = true)
    Avaliacao getAvalicaoBySolicitacao(Long idSolicitacao);

}
