package com.ebisaos.repository;

import com.ebisaos.domain.SolicitacaoCompra;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the SolicitacaoCompra entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoCompraRepository extends JpaRepository<SolicitacaoCompra, Long> {

    @Query( value = "SELECT quant_solicitada FROM public.solicitacao_compra WHERE stock_id = ?1 AND aberta = true ORDER BY created_date DESC LIMIT 1", 
        nativeQuery = true )
    Long quantComprada(Long idStock);

    @Query( value = "SELECT * FROM public.solicitacao_compra WHERE stock_id = ?1 AND aberta = true ORDER BY created_date DESC LIMIT 1", 
        nativeQuery = true )
    SolicitacaoCompra solicitacaoAberta(Long idStock);

}
