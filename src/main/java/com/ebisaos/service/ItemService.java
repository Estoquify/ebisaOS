package com.ebisaos.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
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

import com.ebisaos.domain.Item;
import com.ebisaos.repository.ItemRepository;
import com.ebisaos.service.dto.QuantidadeItensDTO;
import com.ebisaos.service.dto.StockDTO;

@Service
@Transactional
public class ItemService {
    
    private final Logger log = LoggerFactory.getLogger(StockService.class);

    @Autowired
    ItemRepository itemRepository;

    public List<Item> findAll(Pageable pageable) {
        return itemRepository.findAll(pageable).getContent();
    }

    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    public Item findById(long id) {
        return itemRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return itemRepository.existsById(id);
    }

    public Item save(Item obj) {
        return itemRepository.save(obj);
    }

    public void delete(Item obj) {
        itemRepository.delete(obj);
    }

    public Page<Item> listPage(Pageable pageable, List<Item> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<Item> page = new PageImpl<Item>(lista, PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<Item> listaPageItem(Pageable pageable, Map<String, String> params) {
        Long countItem = itemRepository.countListaItem(params.get("pesquisa"));
        List<Item> listaItem = itemRepository.listaItemRaw(params.get("pesquisa"), Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        
        Page<Item> pageItem = listPage(pageable, listaItem, countItem);

        return pageItem;
    }

    public List<QuantidadeItensDTO> montarDTOQuantItens(List<Object[]> listRaw) {
        
        List<QuantidadeItensDTO> dtoList = new ArrayList<>();

        for (Object[] row : listRaw) {
            

            Item item = new Item();
            item.setId((Long) row[0]);  
            item.setCreatedBy((String) row[1]);  
            item.setCreatedDate(((java.sql.Timestamp) row[2]).toInstant());
            item.setLastModifiedBy((String) row[3]); 
            item.setLastModifiedDate(((java.sql.Timestamp) row[4]).toInstant());  
            item.setNomeItem((String) row[5]);

            QuantidadeItensDTO dto = new QuantidadeItensDTO();
            dto.setQuantidade((Long) row[6]);  
            dto.setItem(item);  

            dtoList.add(dto);
        }

        return dtoList;
    }

}
