package com.ebisaos.repository;

import com.ebisaos.domain.Comentario;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Comentario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    @Query("SELECT c FROM Comentario c LEFT JOIN c.avaliacao a WHERE a.solicitacao.id = :solicitacaoId")
    List<Comentario> getListComentarios(@Param("solicitacaoId") Long solicitacaoId);

}
