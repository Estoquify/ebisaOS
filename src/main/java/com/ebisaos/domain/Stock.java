package com.ebisaos.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Stock.
 */
@Entity
@Table(name = "stock")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Stock implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "quant_item")
    private Long quantItem;

    @Column(name = "quant_max")
    private Long quantMax;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "stocks" }, allowSetters = true)
    private Item item;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "stocks" }, allowSetters = true)
    private Setor setor;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Stock id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantItem() {
        return this.quantItem;
    }

    public Stock quantItem(Long quantItem) {
        this.setQuantItem(quantItem);
        return this;
    }

    public void setQuantItem(Long quantItem) {
        this.quantItem = quantItem;
    }

    public Long getQuantMax() {
        return this.quantMax;
    }

    public Stock quantMax(Long quantMax) {
        this.setQuantMax(quantMax);
        return this;
    }

    public void setQuantMax(Long quantMax) {
        this.quantMax = quantMax;
    }

    public Item getItem() {
        return this.item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public Stock item(Item item) {
        this.setItem(item);
        return this;
    }

    public Setor getSetor() {
        return this.setor;
    }

    public void setSetor(Setor setor) {
        this.setor = setor;
    }

    public Stock setor(Setor setor) {
        this.setSetor(setor);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Stock)) {
            return false;
        }
        return getId() != null && getId().equals(((Stock) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Stock{" +
            "id=" + getId() +
            ", quantItem=" + getQuantItem() +
            ", quantMax=" + getQuantMax() +
            "}";
    }
}
