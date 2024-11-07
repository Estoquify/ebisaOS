package com.ebisaos.repository;

import com.ebisaos.domain.Item;
import com.ebisaos.domain.SolicitacaoItem;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoItemRepository extends JpaRepository<SolicitacaoItem, Long> {

    @Query("SELECT i FROM SolicitacaoItem si LEFT JOIN si.item i WHERE si.solicitacao.id = :solicitacaoId")
    List<Item> getItemPorSolicitacao(@Param("solicitacaoId") Long solicitacaoId);


}
