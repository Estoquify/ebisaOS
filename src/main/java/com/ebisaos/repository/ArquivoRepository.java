package com.ebisaos.repository;

import com.ebisaos.domain.Arquivo;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Arquivo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArquivoRepository extends JpaRepository<Arquivo, Long> {

    @Query(value = "SELECT * FROM public.arquivo WHERE solicitacao_id = :idSolicitacao AND tipo_documento IN ('orcamentoServico', 'orcamentoMaterial') LIMIT 1", 
       nativeQuery = true)
    Arquivo arquivoEbisaPorIdSolicitacao(@Param("idSolicitacao") Long idSolicitacao);
}
