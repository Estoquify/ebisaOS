package com.ebisaos.service.dto;

import java.time.LocalDateTime;

public class SolicitacaoUnidadeDTO {
    
    private Long id;
    private Long prioridade;
    private String titulo;
    private String tipoSolicitacao;
    private LocalDateTime createdDate;
    private Boolean aberta;
    private Boolean aprovacao;
    private LocalDateTime finishDate;
    private LocalDateTime prazoDate;

    // Construtor completo
    public SolicitacaoUnidadeDTO(Long id, Long prioridade, String titulo, String tipoSolicitacao, LocalDateTime createdDate, Boolean aberta, Boolean aprovacao, LocalDateTime finishDate, LocalDateTime prazoDate) {
        this.id = id;
        this.prioridade = prioridade;
        this.titulo = titulo;
        this.tipoSolicitacao = tipoSolicitacao;
        this.createdDate = createdDate;
        this.aberta = aberta;
        this.aprovacao = aprovacao;
        this.finishDate = finishDate;
        this.prazoDate = prazoDate;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(Long prioridade) {
        this.prioridade = prioridade;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTipoSolicitacao() {
        return tipoSolicitacao;
    }

    public void setTipoSolicitacao(String tipoSolicitacao) {
        this.tipoSolicitacao = tipoSolicitacao;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Boolean getAberta() {
        return aberta;
    }

    public void setAberta(Boolean aberta) {
        this.aberta = aberta;
    }

    public Boolean getAprovacao() {
        return aprovacao;
    }

    public void setAprovacao(Boolean aprovacao) {
        this.aprovacao = aprovacao;
    }

    public LocalDateTime getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(LocalDateTime finishDate) {
        this.finishDate = finishDate;
    }

    public LocalDateTime getPrazoDate() {
        return prazoDate;
    }

    public void setPrazoDate(LocalDateTime prazoDate) {
        this.prazoDate = prazoDate;
    }
}

