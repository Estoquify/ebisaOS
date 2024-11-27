package com.ebisaos.service.dto;

import java.time.Instant;
import java.time.LocalDateTime;

public class StockDTO {
    private Long idStock;
    private String nomeItem;
    private LocalDateTime lastModifiedDate;
    private String nomeSetor;
    private Long quantItem;
    private Long quantMax;
    private Boolean aberta;

    public StockDTO(Long idStock, String nomeItem, LocalDateTime lastModifiedDate, String nomeSetor, Long quantItem, Long quantMax, Boolean aberta) {
        this.idStock = idStock;
        this.nomeItem = nomeItem;
        this.lastModifiedDate = lastModifiedDate;
        this.nomeSetor = nomeSetor;
        this.quantItem = quantItem;
        this.quantMax = quantMax;
        this.aberta = aberta;
    }
    

    public Long getIdStock() {
        return idStock;
    }

    public void setIdStock(Long idStock) {
        this.idStock = idStock;
    }

    public String getNomeItem() {
        return nomeItem;
    }

    public void setNomeItem(String nomeItem) {
        this.nomeItem = nomeItem;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getNomeSetor() {
        return nomeSetor;
    }

    public void setNomeSetor(String nomeSetor) {
        this.nomeSetor = nomeSetor;
    }

    public Long getQuantItem() {
        return quantItem;
    }

    public void setQuantItem(Long quantItem) {
        this.quantItem = quantItem;
    }

    public Long getQuantMax() {
        return quantMax;
    }

    public void setQuantMax(Long quantMax) {
        this.quantMax = quantMax;
    }

    public Boolean getAberta() {
        return aberta;
    }

    public void setAberta(Boolean aberta) {
        this.aberta = aberta;
    }

    @Override
    public String toString() {
        return "StockDTO [idStock=" + idStock + ", nomeItem=" + nomeItem + ", lastModifiedDate=" + lastModifiedDate + ", nomeSetor=" + nomeSetor + ", quantItem=" + quantItem + ", quantMax=" + quantMax + ", aberta=" + aberta
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((idStock == null) ? 0 : idStock.hashCode());
        result = prime * result + ((nomeItem == null) ? 0 : nomeItem.hashCode());
        result = prime * result + ((lastModifiedDate == null) ? 0 : lastModifiedDate.hashCode());
        result = prime * result + ((nomeSetor == null) ? 0 : nomeSetor.hashCode());
        result = prime * result + ((quantItem == null) ? 0 : quantItem.hashCode());
        result = prime * result + ((quantMax == null) ? 0 : quantMax.hashCode());
        result = prime * result + ((aberta == null) ? 0 : aberta.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
            StockDTO other = (StockDTO) obj;
        if (idStock == null) {
            if (other.idStock != null)
                return false;
        } else if (!idStock.equals(other.idStock))
            return false;
        if (nomeItem == null) {
            if (other.nomeItem != null)
                return false;
        } else if (!nomeItem.equals(other.nomeItem))
            return false;
        if (lastModifiedDate == null) {
            if (other.lastModifiedDate != null)
                return false;
        } else if (!lastModifiedDate.equals(other.lastModifiedDate))
            return false;
        if (nomeSetor == null) {
            if (other.nomeSetor != null)
                return false;
        } else if (!nomeSetor.equals(other.nomeSetor))
            return false;
        if (quantItem == null) {
            if (other.quantItem != null)
                return false;
        } else if (!quantItem.equals(other.quantItem))
            return false; 
        if (quantMax == null) {
            if (other.quantMax != null)
                return false;
        } else if (!quantMax.equals(other.quantMax))
            return false;
        if (aberta == null) {
            if (other.aberta != null)
                return false;
        } else if (!aberta.equals(other.aberta))
            return false;         
        return true;
    }

}
