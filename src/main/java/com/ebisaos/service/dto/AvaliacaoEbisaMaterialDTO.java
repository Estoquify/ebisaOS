package com.ebisaos.service.dto;

import com.ebisaos.domain.Arquivo;

public class AvaliacaoEbisaMaterialDTO {
    
    private String resposta;
    private Long idSolicitacao;
    private Boolean aprovacao;
    private Arquivo arquivo;

    public AvaliacaoEbisaMaterialDTO() {
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }

    public Long getIdSolicitacao() {
        return idSolicitacao;
    }

    public void setIdSolicitacao(Long idSolicitacao) {
        this.idSolicitacao = idSolicitacao;
    }

    public Boolean getAprovacao() {
        return aprovacao;
    }

    public void setAprovacao(Boolean aprovacao) {
        this.aprovacao = aprovacao;
    }

    public Arquivo getArquivo() {
        return arquivo;
    }

    public void setArquivo(Arquivo arquivo) {
        this.arquivo = arquivo;
    }

    @Override
    public String toString() {
        return "AvaliacaoEbisaMaterialDTO [resposta=" + resposta + ", idSolicitacao=" + idSolicitacao + ", aprovacao=" + aprovacao + ", arquivo=" + arquivo
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((resposta == null) ? 0 : resposta.hashCode());
        result = prime * result + ((idSolicitacao == null) ? 0 : idSolicitacao.hashCode());
        result = prime * result + ((aprovacao == null) ? 0 : aprovacao.hashCode());
        result = prime * result + ((arquivo == null) ? 0 : arquivo.hashCode());
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
            AvaliacaoEbisaMaterialDTO other = (AvaliacaoEbisaMaterialDTO) obj;
        if (resposta == null) {
            if (other.resposta != null)
                return false;
        } else if (!resposta.equals(other.resposta))
            return false;
        if (idSolicitacao == null) {
            if (other.idSolicitacao != null)
                return false;
        } else if (!idSolicitacao.equals(other.idSolicitacao))
            return false;
        if (aprovacao == null) {
            if (other.aprovacao != null)
                return false;
        } else if (!aprovacao.equals(other.aprovacao))
            return false;
        if (arquivo == null) {
            if (other.arquivo != null)
                return false;
        } else if (!arquivo.equals(other.arquivo))
            return false;
        return true;
    }

}
