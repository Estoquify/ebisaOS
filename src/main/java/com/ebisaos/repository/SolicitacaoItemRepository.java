package com.ebisaos.repository;

import com.ebisaos.domain.Item;
import com.ebisaos.domain.SolicitacaoItem;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoItemRepository extends JpaRepository<SolicitacaoItem, Long> {

    @Query(value = """
        SELECT it.*
        FROM public.solicitacao_item AS soli
        LEFT JOIN public.item AS it ON soli.item_id = it.id
        WHERE soli.solicitacao_id = ?1;
    """, nativeQuery = true)
    List<Item> getItemPorSolicitacao(Long idSolicitacao);

}
