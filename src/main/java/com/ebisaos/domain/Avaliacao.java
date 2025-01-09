package com.ebisaos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import jakarta.validation.constraints.NotNull;

/**
 * A Avaliacao.
 */
@Entity
@Table(name = "avaliacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Avaliacao extends AbstractAuditingEntity<Long> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "avalicaoGinfra")
    private String avalicaoGinfra;

    @Column(name = "avalicao")
    private String avalicao;

    @Column(name = "aprovacaoGinfra")
    private Boolean aprovacaoGinfra;

    @Column(name = "aprovacao")
    private Boolean aprovacao;

    @Column(name = "orcamento")
    private Boolean orcamento;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "avaliacaos" }, allowSetters = true)
    private Solicitacao solicitacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Avaliacao id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAvalicaoGinfra() {
        return this.avalicaoGinfra;
    }

    public Avaliacao avalicaoGinfra(String avalicaoGinfra) {
        this.setAvalicaoGinfra(avalicaoGinfra);
        return this;
    }

    public void setAvalicaoGinfra(String avalicaoGinfra) {
        this.avalicaoGinfra = avalicaoGinfra;
    }

    public String getAvalicao() {
        return this.avalicao;
    }

    public Avaliacao avalicao(String avalicao) {
        this.setAvalicao(avalicao);
        return this;
    }

    public void setAvalicao(String avalicao) {
        this.avalicao = avalicao;
    }

    public Boolean getAprovacao() {
        return this.aprovacao;
    }

    public Avaliacao aprovacao(Boolean aprovacao) {
        this.setAprovacao(aprovacao);
        return this;
    }

    public void setAprovacao(Boolean aprovacao) {
        this.aprovacao = aprovacao;
    }

    public Boolean getAprovacaoGinfra() {
        return this.aprovacaoGinfra;
    }

    public Avaliacao aprovacaoGinfra(Boolean aprovacaoGinfra) {
        this.setAprovacaoGinfra(aprovacaoGinfra);
        return this;
    }

    public void setAprovacaoGinfra(Boolean aprovacaoGinfra) {
        this.aprovacaoGinfra = aprovacaoGinfra;
    }

    public Boolean getOrcamento() {
        return this.orcamento;
    }

    public Avaliacao orcamento(Boolean orcamento) {
        this.setOrcamento(orcamento);
        return this;
    }

    public void setOrcamento(Boolean orcamento) {
        this.orcamento = orcamento;
    }

    public Solicitacao getSolicitacao() {
        return this.solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public Avaliacao solicitacao(Solicitacao solicitacao) {
        this.setSolicitacao(solicitacao);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Avaliacao)) {
            return false;
        }
        return getId() != null && getId().equals(((Avaliacao) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Avaliacao{" +
            "id=" + getId() +
            ", avalicaoGinfra='" + getAvalicaoGinfra() + "'" +
            ", avalicao='" + getAvalicao() + "'" +
            ", aprovacao='" + getAprovacao() + "'" +
            ", aprovacaoGinfra='" + getAprovacaoGinfra() + "'" +
            ", orcamento='" + getOrcamento() + "'" +
            "}";
    }
}
