package com.ebisaos.repository;

import com.ebisaos.domain.Unidade;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Unidade entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UnidadeRepository extends JpaRepository<Unidade, Long> {

    @Query(
        value = """
                SELECT uni.*
                    FROM public.unidade AS uni
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.nome))) > 0
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
                    ORDER BY uni.nome 
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Unidade> listaUnidadeRaw(@Param("pesquisa") String pesquisa, @Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(uni.*)
                    FROM public.unidade AS uni
                    WHERE (:pesquisa IS NULL OR :pesquisa = ''
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.nome))) > 0
                        OR POSITION(upper(unaccent(:pesquisa)) IN upper(unaccent(uni.sigla))) > 0)
        """,
        nativeQuery = true
    )
    Long countListaUnidade(@Param("pesquisa") String pesquisa);

}
