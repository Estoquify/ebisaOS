package com.ebisaos.service.dto;

public class ComentarioDTO {
    
    private String resposta;
    private Long idSolicitacao;

    public ComentarioDTO() {
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

    @Override
    public String toString() {
        return "ComentarioDTO [resposta=" + resposta + ", idSolicitacao=" + idSolicitacao
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((resposta == null) ? 0 : resposta.hashCode());
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
            ComentarioDTO other = (ComentarioDTO) obj;
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
        return true;
    }
}
