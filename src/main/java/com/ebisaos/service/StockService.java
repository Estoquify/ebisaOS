package com.ebisaos.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ebisaos.domain.Stock;
import com.ebisaos.repository.StockRepository;
import com.ebisaos.service.dto.StockDTO;

@Service
@Transactional
public class StockService {
    
    private final Logger log = LoggerFactory.getLogger(StockService.class);

    @Autowired
    StockRepository stockRepository;

    public List<Stock> findAll(Pageable pageable) {
        return stockRepository.findAll(pageable).getContent();
    }

    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    public Stock findById(long id) {
        return stockRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return stockRepository.existsById(id);
    }

    public Stock save(Stock obj) {
        return stockRepository.save(obj);
    }

    public void delete(Stock obj) {
        stockRepository.delete(obj);
    }

    public Long quantAtual(Long idStock) {
        return stockRepository.quantAtual(idStock);
    }

    public Long quantMax(Long idStock) {
        return stockRepository.quantMax(idStock);
    }

    public void compraFinalizada(Long newQuantidade, Long idStock) {
        Stock stock = findById(idStock);
        stock.setQuantItem(newQuantidade);
        stock.setLastModifiedDate(Instant.now());
        save(stock);

    }

    public List<StockDTO> montarListaPageStock(List<Object[]> rawResults) {
    
        return rawResults.stream().map(obj -> new StockDTO(
            (Long) obj[0],           // idStock
            (String) obj[1],         // nomeItem
            obj[2] != null ? ((Timestamp) obj[2]).toLocalDateTime() : null,  // Converte Timestamp para LocalDateTime
            (String) obj[3],         // nomeSetor
            (Long) obj[4],           // quantItem
            (Long) obj[5],           // quantMax
            (Boolean) obj[6]         // aberta
        )).collect(Collectors.toList());
    }

    public Page<StockDTO> listPage(Pageable pageable, List<StockDTO> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<StockDTO> page = new PageImpl<StockDTO>(lista, PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<StockDTO> listaPageStock(Pageable pageable, Map<String, String> params) {
        Long countStock = stockRepository.countListaStokDTO(params.get("pesquisa"));
        List<Object[]> rawResults = stockRepository.listaStockRaw(params.get("pesquisa"), Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        List<StockDTO> listaStock = montarListaPageStock(rawResults);
        
        Page<StockDTO> pageStock = listPage(pageable, listaStock, countStock);

        return pageStock;
    }

}
