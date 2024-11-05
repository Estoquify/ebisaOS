package com.ebisaos.repository;

import com.ebisaos.domain.Solicitacao;
import com.ebisaos.service.dto.SolicitacaoAvaliacaoDTO;
import com.ebisaos.service.dto.SolicitacaoUnidadeDTO;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Solicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(value = """
        SELECT sol.id, sol.prioridade, sol.titulo, tps.nome AS tipo_solicitacao, sol.created_date, sol.aberta, ava.aprovacao, sol.finish_date, sol.prazo_date
        FROM public.solicitacao AS sol
        LEFT JOIN public.tipo_solicitacao AS tps ON sol.tipo_solicitacao_id = tps.id
        LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
        ORDER BY sol.aberta, sol.prioridade, sol.created_date
    """, nativeQuery = true)
    List<SolicitacaoUnidadeDTO> getListagemSolicitacaoUnidade();

    @Query(value = """
        SELECT sol.id, sol.prioridade, sol.titulo, tps.nome AS tipo_solicitacao, sol.created_date, sol.prazo_date, uni.nome AS nome_unidade
        FROM public.solicitacao AS sol
        LEFT JOIN public.tipo_solicitacao AS tps ON sol.tipo_solicitacao_id = tps.id
        LEFT JOIN public.unidade AS uni ON sol.unidade_id = uni.id
        WHERE sol.aberta = true
        ORDER BY sol.prioridade, sol.created_date
    """, nativeQuery = true)
    List<SolicitacaoAvaliacaoDTO> getListagemSolicitacaoAvaliacao();

}
