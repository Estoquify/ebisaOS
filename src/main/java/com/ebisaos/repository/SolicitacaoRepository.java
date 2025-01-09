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
                SELECT sol.id, sol.titulo, sol.tipo_solicitacao, sol.created_date, sol.aberta, ava.aprovacao_ginfra, sol.finish_date, sol.prazo_date, seu.nome AS nome_setor
                    FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0)
                 AND (:filtrarStatus = false
                    OR (:filtrarStatus = true 
                       AND ((:status IS NULL AND ava.aprovacao_ginfra IS NULL) 
                         OR (:status IS NOT NULL AND (ava.aprovacao_ginfra = :status)) 
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
                       AND ((:status IS NULL AND ava.aprovacao IS NULL AND ava.aprovacao_ginfra IS NULL) 
                         OR (:status IS NOT NULL AND (ava.aprovacao = :status OR ava.aprovacao_ginfra = :status)) 
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
                 AND ava.aprovacao_ginfra IS NULL
                 ORDER BY sol.created_date
                 LIMIT :size OFFSET :page * :size
            """, nativeQuery = true)
    List<Object[]> getListagemSolicitacaoAvaliacaoGInfraRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);

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
                 AND ava.aprovacao_ginfra IS NULL
            """, nativeQuery = true)
    Long countListagemSolicitacaoAvaliacaoGInfra(@Param("pesquisa") String pesquisa);

    @Query(value = """
                SELECT sol.id, sol.prioridade, sol.titulo, sol.tipo_solicitacao, sol.created_date, sol.prazo_date, uni.sigla AS sigla_unidade, seu.nome AS nome_setor, ava.aprovacao
                    FROM public.solicitacao AS sol
                 LEFT JOIN public.avaliacao AS ava ON ava.solicitacao_id = sol.id
                 LEFT JOIN public.setor_unidade AS seu ON sol.setor_unidade_id = seu.id
                 LEFT JOIN public.unidade AS uni ON seu.unidade_id = uni.id
                 WHERE (:pesquisa IS NULL OR :pesquisa = ''
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(sol.titulo))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(seu.nome))) > 0
                    OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                 AND sol.aberta = true
                 AND ava.aprovacao_ginfra = true
                 AND ava.aprovacao IS DISTINCT FROM false
                 ORDER BY sol.created_date
                 LIMIT :size OFFSET :page * :size
            """, nativeQuery = true)
    List<Object[]> getListagemSolicitacaoAvaliacaoRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);

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
                 AND ava.aprovacao_ginfra = true
            """, nativeQuery = true)
    Long countListagemSolicitacaoAvaliacao(@Param("pesquisa") String pesquisa);
}
