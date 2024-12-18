package com.ebisaos.repository;

import com.ebisaos.domain.Equipe;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Equipe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EquipeRepository extends JpaRepository<Equipe, Long> {

    @Query(
        value = """
                SELECT eqi.*
                    FROM public.equipe AS eqi
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(eqi.apelido))) > 0)
                    ORDER BY eqi.apelido
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Equipe> listaEquipeRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(eqi.*)
                    FROM public.equipe AS eqi
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(eqi.apelido))) > 0)
        """,
        nativeQuery = true
    )
    Long countListaEquipe(@Param("pesquisa") String pesquisa);

    @Query(
        value = """
                SELECT eqi.*
                    FROM public.equipe AS eqi
                    LEFT JOIN public.solicitacao_equipe AS sle ON eqi.id = sle.equipe_id
                    WHERE sle.solicitacao_id = :idSolicitacao
        """,
        nativeQuery = true    
    )
    List<Equipe> listEquipePorSolicitacao(@Param("idSolicitacao") Long idSolicitacao);
    
}
