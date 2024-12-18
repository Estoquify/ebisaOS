package com.ebisaos.service.dto;

import java.util.List;

import com.ebisaos.domain.Equipe;
import com.ebisaos.domain.Solicitacao;
import com.ebisaos.domain.SolicitacaoEquipe;

public class SolicitacaoViewServicoDTO {
    
    private Solicitacao solicitacao;
    private List<QuantidadeItensDTO> itens;
    private List<ComentariosViewDTO> comentarios;
    private List<Equipe> equipes;

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

    public List<Equipe> getEquipes() {
        return equipes;
    }

    public void setEquipes(List<Equipe> equipes) {
        this.equipes = equipes;
    }

    @Override
    public String toString() {
        return "SolicitacaoViewServicoDTO [solicitacao=" + solicitacao + ", itens=" + itens + ", comentarios=" + comentarios + ", equipes=" + equipes
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
        result = prime * result + ((itens == null) ? 0 : itens.hashCode());
        result = prime * result + ((comentarios == null) ? 0 : comentarios.hashCode());
        result = prime * result + ((equipes == null) ? 0 : equipes.hashCode());
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
            SolicitacaoViewServicoDTO other = (SolicitacaoViewServicoDTO) obj;
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
        if (equipes == null) {
            if (other.equipes != null)
                return false;
        } else if (!equipes.equals(other.equipes))
            return false;          
        return true;
    }
}
