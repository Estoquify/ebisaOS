package com.ebisaos.repository;

import com.ebisaos.domain.Item;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(
        value = """
                SELECT ite.*
                    FROM public.item AS ite
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(ite.nome_item))) > 0)
                    ORDER BY ite.nome_item  
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Item> listaItemRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(ite.*)
                    FROM public.item AS ite
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(ite.nome_item))) > 0)
        """,
        nativeQuery = true
    )
    Long countListaItem(@Param("pesquisa") String pesquisa);

    @Query(
        value = """
                SELECT ite.id, ite.created_by, ite.created_date, ite.last_modified_by, ite.last_modified_date, ite.nome_item, soli.quantidade_solicitada
                    FROM public.solicitacao_item AS soli
                    LEFT JOIN public.item AS ite ON soli.item_id = ite.id
                    WHERE soli.solicitacao_id = :idSolicitacao
        """,
        nativeQuery = true
    )
    List<Object[]> rawItensQuantidade(@Param("idSolicitacao") Long idSolicitacao);

}
