package com.ebisaos.repository;

import com.ebisaos.domain.Solicitacao;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Solicitacao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(value = """
                SELECT sol.id, sol.titulo, sol.tipo_solicitacao, sol.created_date, sol.aberta, ava.aprovacao_ginfra, sol.finish_date, sol.prazo_date, seu.nome AS nome_setor, ava.orcamento
                    FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0)
                 AND (:filtrarStatus = false
                    OR (:filtrarStatus = true 
                       AND ((:status IS NULL AND ava.aprovacao_ginfra IS NULL) 
                         OR (:status = false AND (ava.aprovacao_ginfra = false OR ava.orcamento = false))
                         OR (:status = true AND (ava.aprovacao_ginfra = true AND ava.orcamento = true)) 
                 )))
                 AND seu.unidade_id = :idUnidade
                 ORDER BY sol.aberta, sol.created_date
                 LIMIT :size OFFSET :page * :size
            """, nativeQuery = true)
    List<Object[]> getListagemSolicitacaoUnidadeRaw(@Param("pesquisa") String pesquisa, @Param("filtrarStatus") Boolean filtrarStatus, @Param("status") Boolean status, @Param("idUnidade") Long idUnidade, @Param("page") Integer page, @Param("size") Integer size);

    @Query(value = """
                SELECT COUNT(*)
                FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0)
                 AND (:filtrarStatus = false
                    OR (:filtrarStatus = true 
                       AND ((:status IS NULL AND ava.aprovacao_ginfra IS NULL)
                         OR (:status = false AND (ava.aprovacao_ginfra = false OR ava.orcamento = false))
                         OR (:status = true AND (ava.aprovacao_ginfra = true AND ava.orcamento = true)) 
                 )))
                 AND seu.unidade_id = :idUnidade
            """, nativeQuery = true)
    Long countListagemSolicitacaoUnidade(@Param("pesquisa") String pesquisa, @Param("filtrarStatus") Boolean filtrarStatus, @Param("status") Boolean status, @Param("idUnidade") Long idUnidade);

    @Query(value = """
                SELECT sol.id, sol.titulo, sol.tipo_solicitacao, sol.created_date, sol.prazo_date, uni.sigla AS sigla_unidade, seu.nome AS nome_setor
                    FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 LEFT JOIN public.unidade AS uni ON seu.unidade_id = uni.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                 AND sol.aberta = true
                 AND ((:filtrarNegados = false 
                    AND ((ava.aprovacao_ginfra IS NULL)
                       OR (ava.aprovacao_ginfra = true AND ava.orcamento IS NULL)))
                 OR (:filtrarNegados = true 
                    AND ava.orcamento = false))
                 ORDER BY sol.created_date
                 LIMIT :size OFFSET :page * :size
            """, nativeQuery = true)
    List<Object[]> getListagemSolicitacaoAvaliacaoGInfraRaw(@Param("pesquisa") String pesquisa, @Param("filtrarNegados") Boolean filtrarNegados, @Param("page") Integer page, @Param("size") Integer size);

    @Query(value = """
                SELECT COUNT(*)
                FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 LEFT JOIN public.unidade AS uni ON seu.unidade_id = uni.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                 AND sol.aberta = true
                 AND ((:filtrarNegados = false 
                    AND ((ava.aprovacao_ginfra IS NULL)
                       OR (ava.aprovacao_ginfra = true AND ava.orcamento IS NULL)))
                 OR (:filtrarNegados = true 
                    AND ava.orcamento = false))
            """, nativeQuery = true)
    Long countListagemSolicitacaoAvaliacaoGInfra(@Param("pesquisa") String pesquisa, @Param("filtrarNegados") Boolean filtrarNegados);

    @Query(value = """
                SELECT sol.id, sol.prioridade, sol.titulo, sol.tipo_solicitacao, sol.created_date, sol.prazo_date, uni.sigla AS sigla_unidade, seu.nome AS nome_setor, ava.orcamento,
                    CASE 
                        WHEN EXISTS (
                            SELECT 1 
                            FROM public.arquivo AS arq 
                            WHERE arq.solicitacao_id = sol.id 
                              AND arq.tipo_documento IN ('orcamentoServico', 'orcamentoMaterial')
                        ) THEN true
                        ELSE false
                    END AS possui_orcamento
                 FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 LEFT JOIN public.unidade AS uni ON seu.unidade_id = uni.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                 AND ava.aprovacao_ginfra = true
                 AND ((:filtrarFinalizados = true AND sol.aberta = false)
                    OR (:filtrarFinalizados = false AND sol.aberta = true))
                 ORDER BY sol.created_date
                 LIMIT :size OFFSET :page * :size
            """, nativeQuery = true)
    List<Object[]> getListagemSolicitacaoAvaliacaoRaw(@Param("pesquisa") String pesquisa, @Param("filtrarFinalizados") Boolean filtrarFinalizados, @Param("page") Integer page, @Param("size") Integer size);

    @Query(value = """
                SELECT COUNT(*)
                FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 LEFT JOIN public.unidade AS uni ON seu.unidade_id = uni.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                 AND ava.aprovacao_ginfra = true
                 AND ((:filtrarFinalizados = true AND sol.aberta = false)
                    OR (:filtrarFinalizados = false AND sol.aberta = true))
            """, nativeQuery = true)
    Long countListagemSolicitacaoAvaliacao(@Param("pesquisa") String pesquisa, @Param("filtrarFinalizados") Boolean filtrarFinalizados);

    @Query(value = """
                  SELECT EXISTS (
                     SELECT 1
                     FROM public.arquivo AS arq
                     LEFT JOIN public.avaliacao AS ava ON arq.solicitacao_id = ava.solicitacao_id
                     WHERE arq.solicitacao_id = :idSolicitacao
                        AND arq.tipo_documento IN ('orcamentoServico', 'orcamentoMaterial')
                        AND ava.orcamento IS NULL 
                  ) AS resultado
          """, nativeQuery = true)
    Boolean orcamentoAberto(@Param("idSolicitacao") Long idSolicitacao);

    @Query(value = """
                  SELECT EXISTS (
                     SELECT 1
                     FROM public.avaliacao AS ava
                     WHERE ava.orcamento = true
                     	AND ava.solicitacao_id = :idSolicitacao
                  ) AS resultado
          """, nativeQuery = true)
    Boolean avaliacaoOrcamento(@Param("idSolicitacao") Long idSolicitacao);
}
