package com.ebisaos.repository;

import com.ebisaos.domain.Equipe;
import org.springframework.data.jpa.repository.*;
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
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Equipe> listaEquipeRaw(@Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(eqi.*)
                FROM public.equipe AS eqi
        """,
        nativeQuery = true
    )
    Long countListaEquipe();
    
}
