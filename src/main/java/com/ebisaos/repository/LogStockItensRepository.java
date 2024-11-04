package com.ebisaos.repository;

import com.ebisaos.domain.LogStockItens;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LogStockItens entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LogStockItensRepository extends JpaRepository<LogStockItens, Long> {}
