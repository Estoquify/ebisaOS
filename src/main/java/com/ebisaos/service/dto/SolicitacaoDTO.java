package com.ebisaos.service.dto;

import java.util.List;

import com.ebisaos.domain.Solicitacao;

public class SolicitacaoDTO {
    
    private Solicitacao solicitacao;
    private List<QuantidadeItensDTO> itensSelecionados;

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public List<QuantidadeItensDTO> getItensSelecionados() {
        return itensSelecionados;
    }

    public void setItensSelecionados(List<QuantidadeItensDTO> itensSelecionados) {
        this.itensSelecionados = itensSelecionados;
    }

    @Override
    public String toString() {
        return "SolicitacaoDTO [solicitacao=" + solicitacao + ", itens=" + itensSelecionados
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
        result = prime * result + ((itensSelecionados == null) ? 0 : itensSelecionados.hashCode());
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
        if (itensSelecionados == null) {
            if (other.itensSelecionados != null)
                return false;
        } else if (!itensSelecionados.equals(other.itensSelecionados))
            return false;
        return true;
    }
}
