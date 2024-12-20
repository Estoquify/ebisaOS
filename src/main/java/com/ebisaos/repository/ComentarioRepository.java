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

    @Query(
        value = """
                SELECT com.respostas as resposta, use.last_name as nome, com.created_date as data_avaliacao, com.tipo_comentario
                    FROM public.comentario AS com
                    LEFT JOIN public.jhi_user AS use ON com.created_by = use.login
                    LEFT JOIN public.avaliacao AS ava ON com.avaliacao_id = ava.id
                    WHERE ava.solicitacao_id = :idSolicitacao
                    ORDER BY com.created_date DESC;
        """,
        nativeQuery = true
    )
    List<Object[]> rawItensQuantidade(@Param("idSolicitacao") Long idSolicitacao);

}
