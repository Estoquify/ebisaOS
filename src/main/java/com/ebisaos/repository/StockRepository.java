package com.ebisaos.repository;

import com.ebisaos.domain.Stock;
import com.ebisaos.service.dto.StockDTO;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Stock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

    @Query(
        value = """
                SELECT 
                    sto.id AS id_stock, 
                    ite.nome_item AS nome_item, 
                    sto.last_modified_date AS last_modified_date,
                    str.nome AS nome_setor, 
                    sto.quant_item AS quant_item, 
                    sto.quant_max AS quant_max, 
                    slc.aberta AS aberta
                FROM public.stock AS sto
                LEFT JOIN public.item AS ite ON sto.item_id = ite.id
                LEFT JOIN public.setor AS str ON sto.setor_id = str.id
                LEFT JOIN (
                    SELECT DISTINCT ON (stock_id) stock_id, aberta, last_modified_date
                    FROM public.solicitacao_compra
                    ORDER BY stock_id, last_modified_date DESC
                ) AS slc ON sto.id = slc.stock_id
                WHERE (:pesquisa IS NULL 
                    OR :pesquisa = '' 
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(ite.nome_item))) > 0 
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(str.nome))) > 0)
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Object[]> listaStockRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(*)
                FROM public.stock AS sto
                LEFT JOIN public.item AS ite ON sto.item_id = ite.id
                LEFT JOIN public.setor AS str ON sto.setor_id = str.id
                LEFT JOIN (SELECT DISTINCT ON (stock_id) stock_id, aberta, last_modified_date
                    FROM public.solicitacao_compra
                    ORDER BY stock_id, last_modified_date DESC) AS slc ON sto.id = slc.stock_id
                WHERE (CASE WHEN ?1 != '' 
                    THEN POSITION(upper(unaccent(?1)) IN upper(unaccent(ite.nome_item))) > 0 
                    OR POSITION(upper(unaccent(?1)) IN upper(unaccent(str.nome))) > 0 
                ELSE true END)   
        """,
        nativeQuery = true
    )
    Long countListaStokDTO(String pesquisa);

}
