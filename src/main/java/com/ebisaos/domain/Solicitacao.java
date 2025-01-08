package com.ebisaos.domain;

import com.ebisaos.domain.enumeration.TipoSolicitacaoEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

/**
 * A Solicitacao.
 */
@Entity
@Table(name = "solicitacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Solicitacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "prazo_date")
    private Instant prazoDate;

    @Column(name = "finish_date")
    private Instant finishDate;

    @Column(name = "aberta")
    private Boolean aberta;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "prioridade")
    private Long prioridade;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "solicitacaos" }, allowSetters = true)
    private SetorUnidade setorUnidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_solicitacao")
    private TipoSolicitacaoEnum tipoSolicitacaoEnum;

    @Column(name = "created_by", nullable = false, length = 50, updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_date", updatable = false)
    private Instant createdDate = Instant.now();

    @Column(name = "last_modified_by", length = 50)
    private String lastModifiedBy;

    @LastModifiedDate
    @Column(name = "last_modified_date")
    private Instant lastModifiedDate = Instant.now();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Solicitacao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getPrazoDate() {
        return this.prazoDate;
    }

    public Solicitacao prazoDate(Instant prazoDate) {
        this.setPrazoDate(prazoDate);
        return this;
    }

    public void setPrazoDate(Instant prazoDate) {
        this.prazoDate = prazoDate;
    }

    public Instant getFinishDate() {
        return this.finishDate;
    }

    public Solicitacao finishDate(Instant finishDate) {
        this.setFinishDate(finishDate);
        return this;
    }

    public void setFinishDate(Instant finishDate) {
        this.finishDate = finishDate;
    }

    public Boolean getAberta() {
        return this.aberta;
    }

    public Solicitacao aberta(Boolean aberta) {
        this.setAberta(aberta);
        return this;
    }

    public void setAberta(Boolean aberta) {
        this.aberta = aberta;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Solicitacao descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getObservacao() {
        return this.observacao;
    }

    public Solicitacao observacao(String observacao) {
        this.setObservacao(observacao);
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public Solicitacao titulo(String titulo) {
        this.setTitulo(titulo);
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Long getPrioridade() {
        return this.prioridade;
    }

    public Solicitacao prioridade(Long prioridade) {
        this.setPrioridade(prioridade);
        return this;
    }

    public void setPrioridade(Long prioridade) {
        this.prioridade = prioridade;
    }

    public SetorUnidade getSetorUnidade() {
        return this.setorUnidade;
    }

    public void setSetorUnidade(SetorUnidade setorUnidade) {
        this.setorUnidade = setorUnidade;
    }

    public Solicitacao setorUnidade(SetorUnidade setorUnidade) {
        this.setSetorUnidade(setorUnidade);
        return this;
    }

    public TipoSolicitacaoEnum getTipoSolicitacao() {
        return this.tipoSolicitacaoEnum;
    }

    public void setTipoSolicitacao(TipoSolicitacaoEnum tipoSolicitacaoEnum) {
        this.tipoSolicitacaoEnum = tipoSolicitacaoEnum;
    }

    public Solicitacao tipoSolicitacaoEnum(TipoSolicitacaoEnum tipoSolicitacaoEnum) {
        this.setTipoSolicitacao(tipoSolicitacaoEnum);
        return this;
    }

    public static long getSerialversionuid() {
        return serialVersionUID;
    }

    public TipoSolicitacaoEnum getTipoSolicitacaoEnum() {
        return tipoSolicitacaoEnum;
    }

    public void setTipoSolicitacaoEnum(TipoSolicitacaoEnum tipoSolicitacaoEnum) {
        this.tipoSolicitacaoEnum = tipoSolicitacaoEnum;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solicitacao)) {
            return false;
        }
        return getId() != null && getId().equals(((Solicitacao) o).getId());
    }

    @Override
    public int hashCode() {
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Solicitacao{" +
                "id=" + getId() +
                ", prazoDate='" + getPrazoDate() + "'" +
                ", finishDate='" + getFinishDate() + "'" +
                ", aberta='" + getAberta() + "'" +
                ", descricao='" + getDescricao() + "'" +
                ", observacao='" + getObservacao() + "'" +
                ", titulo='" + getTitulo() + "'" +
                ", prioridade='" + getPrioridade() + "'" +
                "}";
    }
}
