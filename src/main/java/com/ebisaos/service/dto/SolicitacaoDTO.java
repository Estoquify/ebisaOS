package com.ebisaos.service.dto;

import java.util.List;

import com.ebisaos.domain.Solicitacao;

public class SolicitacaoDTO {
    
    private Solicitacao solicitacao;
    private List<QuantidadeItensDTO> itens;

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public List<QuantidadeItensDTO> getItens() {
        return itens;
    }

    public void setItens(List<QuantidadeItensDTO> itens) {
        this.itens = itens;
    }

    @Override
    public String toString() {
        return "SolicitacaoDTO [solicitacao=" + solicitacao + ", itens=" + itens
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
        result = prime * result + ((itens == null) ? 0 : itens.hashCode());
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
            SolicitacaoDTO other = (SolicitacaoDTO) obj;
        if (solicitacao == null) {
            if (other.solicitacao != null)
                return false;
        } else if (!solicitacao.equals(other.solicitacao))
            return false;
        if (itens == null) {
            if (other.itens != null)
                return false;
        } else if (!itens.equals(other.itens))
            return false;
        return true;
    }
}
