package com.ebisaos.service.dto;

import java.util.List;

import com.ebisaos.domain.Solicitacao;

public class SolicitacaoViewMaterialDTO {
    
    private Solicitacao solicitacao;
    private List<QuantidadeItensDTO> itens;
    private List<ComentariosViewDTO> comentarios;
    private Boolean orcamentoAberto;
    private Boolean avaliacaoOrcamento;

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

    public List<ComentariosViewDTO> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<ComentariosViewDTO> comentarios) {
        this.comentarios = comentarios;
    }

    public Boolean getOrcamentoAberto() {
        return orcamentoAberto;
    }

    public void setOrcamentoAberto(Boolean orcamentoAberto) {
        this.orcamentoAberto = orcamentoAberto;
    }

    public Boolean getAvaliacaoOrcamento() {
        return avaliacaoOrcamento;
    }

    public void setAvaliacaoOrcamento(Boolean avaliacaoOrcamento) {
        this.avaliacaoOrcamento = avaliacaoOrcamento;
    }

    @Override
    public String toString() {
        return "SolicitacaoViewMaterialDTO [solicitacao=" + solicitacao + ", itens=" + itens + ", comentarios=" + comentarios + ", orcamentoAberto=" + orcamentoAberto + ", avaliacaoOrcamento=" + avaliacaoOrcamento
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
        result = prime * result + ((itens == null) ? 0 : itens.hashCode());
        result = prime * result + ((comentarios == null) ? 0 : comentarios.hashCode());
        result = prime * result + ((orcamentoAberto == null) ? 0 : orcamentoAberto.hashCode());
        result = prime * result + ((avaliacaoOrcamento == null) ? 0 : avaliacaoOrcamento.hashCode());
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
            SolicitacaoViewMaterialDTO other = (SolicitacaoViewMaterialDTO) obj;
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
        if (comentarios == null) {
            if (other.comentarios != null)
                return false;
        } else if (!comentarios.equals(other.comentarios))
            return false; 
        if (orcamentoAberto == null) {
            if (other.orcamentoAberto != null)
                return false;
        } else if (!orcamentoAberto.equals(other.orcamentoAberto))
            return false;
        if (avaliacaoOrcamento == null) {
            if (other.avaliacaoOrcamento != null)
                return false;
        } else if (!avaliacaoOrcamento.equals(other.avaliacaoOrcamento))
            return false;       
        return true;
    }
}
