package com.ebisaos.repository;

import com.ebisaos.domain.Item;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Item entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    @Query(
        value = """
                SELECT ite.*
                FROM public.item AS ite
                LIMIT :size OFFSET :page * :size
        """,
        nativeQuery = true
    )
    List<Item> listaItemRaw(@Param("page") Integer page, @Param("size") Integer size);


    @Query(
        value = """
                SELECT COUNT(ite.*)
                FROM public.item AS ite
        """,
        nativeQuery = true
    )
    Long countListaItem();

}
