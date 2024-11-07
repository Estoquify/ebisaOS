package com.ebisaos.repository;

import com.ebisaos.domain.Comentario;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Comentario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    @Query(value = """
        SELECT com.*
        FROM public.comentario AS com
        LEFT JOIN public.avaliacao AS ava ON com.avaliacao_id = ava.id
        WHERE ava.solicitacao_id = ?1;
    """, nativeQuery = true)
    List<Comentario> getListComentarios(Long idSolicitacao);

}
