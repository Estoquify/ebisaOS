package com.ebisaos.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.domain.Item;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.domain.Unidade;
import com.ebisaos.repository.ComentarioRepository;
import com.ebisaos.repository.EquipeRepository;
import com.ebisaos.repository.ItemRepository;
import com.ebisaos.repository.SolicitacaoRepository;
import com.ebisaos.service.dto.QuantidadeItensDTO;
import com.ebisaos.service.dto.SolicitacaoAvaliacaoDTO;
import com.ebisaos.service.dto.SolicitacaoAvaliacaoGInfraDTO;
import com.ebisaos.service.dto.SolicitacaoDTO;
import com.ebisaos.service.dto.SolicitacaoUnidadeDTO;
import com.ebisaos.service.dto.SolicitacaoViewDTO;
import com.ebisaos.service.dto.SolicitacaoViewMaterialDTO;
import com.ebisaos.service.dto.SolicitacaoViewServicoDTO;

@Service
@Transactional
public class SolicitacaoService {

    private final Logger log = LoggerFactory.getLogger(SolicitacaoService.class);

    @Autowired
    SolicitacaoRepository solicitacaoRepository;

    @Autowired
    AvaliacaoService avaliacaoService;

    @Autowired
    SolicitacaoItemService solicitacaoItemService;

    @Autowired
    ComentarioRepository comentarioRepository;

    @Autowired
    ItemService itemService;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    EquipeService equipeService;

    public List<Solicitacao> findAll(Pageable pageable) {
        return solicitacaoRepository.findAll(pageable).getContent();
    }

    public List<Solicitacao> findAll() {
        return solicitacaoRepository.findAll();
    }

    public Solicitacao findById(long id) {
        return solicitacaoRepository.findById(id).get();
    }

    public boolean seIdExiste(long id) {
        return solicitacaoRepository.existsById(id);
    }

    public Solicitacao save(Solicitacao obj) {
        return solicitacaoRepository.save(obj);
    }

    public void delete(Solicitacao obj) {
        solicitacaoRepository.delete(obj);
    }

    public void montarSolicicao(SolicitacaoDTO solicitacaoDTO) {

        avaliacaoService.avaliacaoInicial(solicitacaoDTO.getSolicitacao());
        for (QuantidadeItensDTO item : solicitacaoDTO.getItensSelecionados()) {
            solicitacaoItemService.montarSolicitacaoItem(item, solicitacaoDTO.getSolicitacao());
        }

    }

    public void editarSolicitacao(SolicitacaoDTO solicitacaoDTO) {
        Avaliacao avaliacao = avaliacaoService.avaliacaoPorSolicitacao(solicitacaoDTO.getSolicitacao().getId());
        avaliacao.setAprovacao(null);
        avaliacao.setAprovacaoGinfra(null);
        avaliacaoService.save(avaliacao);
        for (QuantidadeItensDTO item : solicitacaoDTO.getItensSelecionados()) {
            if (solicitacaoItemService.verificarSolicitacaoAberta(item.getItem().getId(),
                    solicitacaoDTO.getSolicitacao().getId()) == 0) {
                solicitacaoItemService.montarSolicitacaoItem(item, solicitacaoDTO.getSolicitacao());
            } else if (solicitacaoItemService.verificarSolicitacaoAberta(item.getItem().getId(),
                    solicitacaoDTO.getSolicitacao().getId()) != item.getQuantidade()) {
                solicitacaoItemService.editarSolicitacaoItem(item.getItem().getId(),
                        solicitacaoDTO.getSolicitacao().getId(), item.getQuantidade());
            }
        }
    }

    public SolicitacaoViewDTO montarSolicitacaoView(Long idSoliciacao) {
        SolicitacaoViewDTO solicitacaoViewDTO = new SolicitacaoViewDTO();

        solicitacaoViewDTO.setSolicitacao(findById(idSoliciacao));
        solicitacaoViewDTO.setAvaliacao(avaliacaoService.avaliacaoPorSolicitacao(idSoliciacao));
        solicitacaoViewDTO.setComentarios(comentarioRepository.getListComentarios(idSoliciacao));
        solicitacaoViewDTO.setItens(solicitacaoItemService.listaDeItensPorSolicitacao(idSoliciacao));

        return solicitacaoViewDTO;
    }

    public List<SolicitacaoUnidadeDTO> montarListaPageSolicitacao(List<Object[]> rawResults) {

        return rawResults.stream().map(obj -> new SolicitacaoUnidadeDTO(
                (Long) obj[0], // idSolicitacao
                (String) obj[1], // titulo
                (String) obj[2], // tipoSolicitacao
                obj[3] != null ? ((Timestamp) obj[3]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, createdDate
                (Boolean) obj[4], // aberta
                (Boolean) obj[5], // aprovacao
                obj[6] != null ? ((Timestamp) obj[6]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, finishDate
                obj[7] != null ? ((Timestamp) obj[7]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, prazoDate
                (String) obj[8] // nomeSetor
        )).collect(Collectors.toList());
    }

    public Page<SolicitacaoUnidadeDTO> listPage(Pageable pageable, List<SolicitacaoUnidadeDTO> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<SolicitacaoUnidadeDTO> page = new PageImpl<SolicitacaoUnidadeDTO>(lista,
                PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<SolicitacaoUnidadeDTO> listaPageSolicitacaoUnidade(Pageable pageable, Map<String, String> params) {
        Long countSolicitacao = solicitacaoRepository.countListagemSolicitacaoUnidade(params.get("pesquisa"),
                Long.parseLong(params.get("idUnidade")));
        List<Object[]> rawResults = solicitacaoRepository.getListagemSolicitacaoUnidadeRaw(params.get("pesquisa"),
                Long.parseLong(params.get("idUnidade")), Integer.parseInt(params.get("page")),
                Integer.parseInt(params.get("size")));
        List<SolicitacaoUnidadeDTO> listaSolicitacao = montarListaPageSolicitacao(rawResults);

        Page<SolicitacaoUnidadeDTO> pageSolicitacao = listPage(pageable, listaSolicitacao, countSolicitacao);

        return pageSolicitacao;
    }

    public List<SolicitacaoAvaliacaoGInfraDTO> montarListaPageSolicitacaoAvaliacaoGInfra(List<Object[]> rawResults) {

        return rawResults.stream().map(obj -> new SolicitacaoAvaliacaoGInfraDTO(
                (Long) obj[0], // idSolicitacao
                (String) obj[1], // titulo
                (String) obj[2], // tipoSolicitacao
                obj[3] != null ? ((Timestamp) obj[3]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, createdDate
                obj[4] != null ? ((Timestamp) obj[4]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, prazoDate
                (String) obj[5], // siglaUnidade
                (String) obj[6] // nomeSetor
        )).collect(Collectors.toList());
    }

    public Page<SolicitacaoAvaliacaoGInfraDTO> listPageAvaliacaoGInfra(Pageable pageable,
            List<SolicitacaoAvaliacaoGInfraDTO> lista, long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<SolicitacaoAvaliacaoGInfraDTO> page = new PageImpl<SolicitacaoAvaliacaoGInfraDTO>(lista,
                PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<SolicitacaoAvaliacaoGInfraDTO> listaPageSolicitacaoAvaliacaoGInfra(Pageable pageable,
            Map<String, String> params) {
        Long countSolicitacao = solicitacaoRepository.countListagemSolicitacaoAvaliacaoGInfra(params.get("pesquisa"));
        List<Object[]> rawResults = solicitacaoRepository.getListagemSolicitacaoAvaliacaoGInfraRaw(
                params.get("pesquisa"), Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        List<SolicitacaoAvaliacaoGInfraDTO> listaSolicitacao = montarListaPageSolicitacaoAvaliacaoGInfra(rawResults);

        Page<SolicitacaoAvaliacaoGInfraDTO> pageSolicitacao = listPageAvaliacaoGInfra(pageable, listaSolicitacao,
                countSolicitacao);

        return pageSolicitacao;
    }

    public List<SolicitacaoAvaliacaoDTO> montarListaPageSolicitacaoAvaliacao(List<Object[]> rawResults) {

        return rawResults.stream().map(obj -> new SolicitacaoAvaliacaoDTO(
                (Long) obj[0], // idSolicitacao
                (Long) obj[1], // prioridade
                (String) obj[2], // titulo
                (String) obj[3], // tipoSolicitacao
                obj[4] != null ? ((Timestamp) obj[4]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, createdDate
                obj[5] != null ? ((Timestamp) obj[5]).toLocalDateTime() : null, // Converte Timestamp para
                                                                                // LocalDateTime, prazoDate
                (String) obj[6], // siglaUnidade
                (String) obj[7], // nomeSetor
                (Boolean) obj[8] // avaliacao
        )).collect(Collectors.toList());
    }

    public Page<SolicitacaoAvaliacaoDTO> listPageAvaliacao(Pageable pageable, List<SolicitacaoAvaliacaoDTO> lista,
            long totalItems) {
        int pageSize = pageable.getPageSize();
        int currentPage = pageable.getPageNumber();
        Page<SolicitacaoAvaliacaoDTO> page = new PageImpl<SolicitacaoAvaliacaoDTO>(lista,
                PageRequest.of(currentPage, pageSize), totalItems);
        return page;
    }

    public Page<SolicitacaoAvaliacaoDTO> listaPageSolicitacaoAvaliacao(Pageable pageable, Map<String, String> params) {
        Long countSolicitacao = solicitacaoRepository.countListagemSolicitacaoAvaliacao(params.get("pesquisa"));
        List<Object[]> rawResults = solicitacaoRepository.getListagemSolicitacaoAvaliacaoRaw(params.get("pesquisa"),
                Integer.parseInt(params.get("page")), Integer.parseInt(params.get("size")));
        List<SolicitacaoAvaliacaoDTO> listaSolicitacao = montarListaPageSolicitacaoAvaliacao(rawResults);

        Page<SolicitacaoAvaliacaoDTO> pageSolicitacao = listPageAvaliacao(pageable, listaSolicitacao, countSolicitacao);

        return pageSolicitacao;
    }

    public SolicitacaoViewMaterialDTO montarVisualizadorMaterial(Long idSolicitacao) {

        List<Object[]> rawItens = itemRepository.rawItensQuantidade(idSolicitacao);
        List<Object[]> rawComentarios = comentarioRepository.rawItensQuantidade(idSolicitacao);

        SolicitacaoViewMaterialDTO solicitacaoViewMaterialDTO = new SolicitacaoViewMaterialDTO();

        solicitacaoViewMaterialDTO.setSolicitacao(findById(idSolicitacao));
        solicitacaoViewMaterialDTO.setItens(itemService.montarDTOQuantItens(rawItens));
        solicitacaoViewMaterialDTO.setComentarios(avaliacaoService.montarDTOChat(rawComentarios));

        return solicitacaoViewMaterialDTO;
    }

    public SolicitacaoViewServicoDTO montarVisualizadorSolicitacao(Long idSolicitacao) {

        List<Object[]> rawItens = itemRepository.rawItensQuantidade(idSolicitacao);
        List<Object[]> rawComentarios = comentarioRepository.rawItensQuantidade(idSolicitacao);

        SolicitacaoViewServicoDTO solicitacaoViewServicoDTO = new SolicitacaoViewServicoDTO();

        solicitacaoViewServicoDTO.setSolicitacao(findById(idSolicitacao));
        solicitacaoViewServicoDTO.setItens(itemService.montarDTOQuantItens(rawItens));
        solicitacaoViewServicoDTO.setComentarios(avaliacaoService.montarDTOChat(rawComentarios));
        solicitacaoViewServicoDTO.setEquipes(equipeService.listaEquipesPorSolicitacao(idSolicitacao));
        solicitacaoViewServicoDTO.setFoiAvaliado(avaliacaoService.existeAvaliacaoPorSolicitacao(idSolicitacao));

        return solicitacaoViewServicoDTO;
    }

    public Solicitacao finalizarSolicitacao(Long idSolicitacao) {

        Solicitacao solicitacao = findById(idSolicitacao);
        solicitacao.setAberta(false);
        solicitacao.setFinishDate(Instant.now());
        save(solicitacao);

        equipeService.liberarEquipe(idSolicitacao);

        return solicitacao;
    }

}
