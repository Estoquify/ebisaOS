package com.ebisaos.service.dto;

import java.util.List;

import com.ebisaos.domain.Avaliacao;
import com.ebisaos.domain.Comentario;
import com.ebisaos.domain.Item;
import com.ebisaos.domain.Solicitacao;

public class SolicitacaoViewDTO {
    
    private Solicitacao solicitacao;
    private List<Item> itens;
    private Avaliacao avaliacao;
    private List<Comentario> comentarios;

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public void setSolicitacao(Solicitacao solicitacao) {
        this.solicitacao = solicitacao;
    }

    public List<Item> getItens() {
        return itens;
    }

    public void setItens(List<Item> itens) {
        this.itens = itens;
    }

    public Avaliacao getAvaliacao() {
        return avaliacao;
    }

    public void setAvaliacao(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    @Override
    public String toString() {
        return "SolicitacaoViewDTO [solicitacao=" + solicitacao + ", itens=" + itens + ", avaliacao=" + avaliacao + ", comentarios=" + comentarios
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((solicitacao == null) ? 0 : solicitacao.hashCode());
        result = prime * result + ((itens == null) ? 0 : itens.hashCode());
        result = prime * result + ((avaliacao == null) ? 0 : avaliacao.hashCode());
        result = prime * result + ((comentarios == null) ? 0 : comentarios.hashCode());
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
            SolicitacaoViewDTO other = (SolicitacaoViewDTO) obj;
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
        if (avaliacao == null) {
            if (other.avaliacao != null)
                return false;
        } else if (!avaliacao.equals(other.avaliacao))
            return false;
        if (comentarios == null) {
            if (other.comentarios != null)
                return false;
        } else if (!comentarios.equals(other.comentarios))
            return false;          
        return true;
    }
}
