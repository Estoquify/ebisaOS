package com.ebisaos.service.dto;

import java.time.LocalDateTime;

public class SolicitacaoUnidadeDTO {
    
    private Long id;
    private String titulo;
    private String tipoSolicitacao;
    private LocalDateTime createdDate;
    private Boolean aberta;
    private Boolean aprovacaoGinfra;
    private LocalDateTime finishDate;
    private LocalDateTime prazoDate;
    private String nomeSetor;

    // Construtor completo
    public SolicitacaoUnidadeDTO(Long id, String titulo, String tipoSolicitacao, LocalDateTime createdDate, Boolean aberta, Boolean aprovacaoGinfra, LocalDateTime finishDate, LocalDateTime prazoDate, String nomeSetor) {
        this.id = id;
        this.titulo = titulo;
        this.tipoSolicitacao = tipoSolicitacao;
        this.createdDate = createdDate;
        this.aberta = aberta;
        this.aprovacaoGinfra = aprovacaoGinfra;
        this.finishDate = finishDate;
        this.prazoDate = prazoDate;
        this.nomeSetor = nomeSetor;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Boolean getAprovacaoGinfra() {
        return aprovacaoGinfra;
    }

    public void setAprovacaoGinfra(Boolean aprovacaoGinfra) {
        this.aprovacaoGinfra = aprovacaoGinfra;
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

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }
}

