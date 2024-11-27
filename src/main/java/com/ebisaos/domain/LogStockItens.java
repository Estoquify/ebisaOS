package com.ebisaos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A LogStockItens.
 */
@Entity
@Table(name = "log_stock_itens")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LogStockItens extends AbstractAuditingEntity<Long> {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "quant_atual")
    private Long quantAtual;

    @Column(name = "quant_anterior")
    private Long quantAnterior;

    @Column(name = "acao")
    private String acao;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "logStockItens" }, allowSetters = true)
    private Stock stock;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LogStockItens id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantAtual() {
        return this.quantAtual;
    }

    public LogStockItens quantAtual(Long quantAtual) {
        this.setQuantAtual(quantAtual);
        return this;
    }

    public void setQuantAtual(Long quantAtual) {
        this.quantAtual = quantAtual;
    }

    public Long getQuantAnterior() {
        return this.quantAnterior;
    }

    public LogStockItens quantAnterior(Long quantAnterior) {
        this.setQuantAnterior(quantAnterior);
        return this;
    }

    public void setQuantAnterior(Long quantAnterior) {
        this.quantAnterior = quantAnterior;
    }

    public String getAcao() {
        return this.acao;
    }

    public LogStockItens acao(String acao) {
        this.setAcao(acao);
        return this;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }

    public Stock getStock() {
        return this.stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public LogStockItens stock(Stock stock) {
        this.setStock(stock);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LogStockItens)) {
            return false;
        }
        return getId() != null && getId().equals(((LogStockItens) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LogStockItens{" +
            "id=" + getId() +
            ", quantAtual=" + getQuantAtual() +
            ", quantAnterior=" + getQuantAnterior() +
            ", acao=" + getAcao() +
            "}";
    }
}
