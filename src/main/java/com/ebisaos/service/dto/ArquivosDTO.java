package com.ebisaos.service.dto;

import java.util.List;
import com.ebisaos.domain.Arquivo;

public class ArquivosDTO {
    
    private List<Arquivo> arquivos;
    private Long idSolicitacao;

    public ArquivosDTO() {
    }

    public List<Arquivo> getArquivos() {
        return arquivos;
    }

    public void setArquivos(List<Arquivo> arquivos) {
        this.arquivos = arquivos;
    }

    public Long getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(Long idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    @Override
    public String toString() {
        return "ArquivosDTO [arquivos=" + arquivos + ", idSolicitacao=" + idSolicitacao
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((arquivos == null) ? 0 : arquivos.hashCode());
        result = prime * result + ((idSolicitacao == null) ? 0 : idSolicitacao.hashCode());
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
            ArquivosDTO other = (ArquivosDTO) obj;
        if (arquivos == null) {
            if (other.arquivos != null)
                return false;
        } else if (!arquivos.equals(other.arquivos))
            return false;
        if (idSolicitacao == null) {
            if (other.idSolicitacao != null)
                return false;
        } else if (!idSolicitacao.equals(other.idSolicitacao))
            return false;      
        return true;
    }
}
