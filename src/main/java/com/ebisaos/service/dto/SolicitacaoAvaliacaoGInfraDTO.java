package com.ebisaos.service.dto;

import java.time.LocalDateTime;

public class SolicitacaoAvaliacaoGInfraDTO {
    
    private Long id;
    private String titulo;
    private String tipoSolicitacao;
    private LocalDateTime createdDate;
    private LocalDateTime prazoDate;
    private String nomeUnidade;
    private String nomeSetor;

    // Construtor completo
    public SolicitacaoAvaliacaoGInfraDTO(Long id, String titulo, String tipoSolicitacao, LocalDateTime createdDate, LocalDateTime prazoDate, String nomeUnidade, String nomeSetor) {
        this.id = id;
        this.titulo = titulo;
        this.tipoSolicitacao = tipoSolicitacao;
        this.createdDate = createdDate;
        this.prazoDate = prazoDate;
        this.nomeUnidade = nomeUnidade;
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

    public LocalDateTime getPrazoDate() {
        return prazoDate;
    }

    public void setPrazoDate(LocalDateTime prazoDate) {
        this.prazoDate = prazoDate;
    }

    public String getNomeUnidade() {
        return nomeUnidade;
    }

    public void setNomeUnidade(String nomeUnidade) {
        this.nomeUnidade = nomeUnidade;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }
}

