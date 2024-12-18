package com.ebisaos.service.dto;

import java.time.LocalDateTime;

public class ComentariosViewDTO {
    
    private String resposta;
    private String nomeUsuario;
    private LocalDateTime dataAvaliacao;
    private String tipoComentario;

    public ComentariosViewDTO() {
    }

    public String getResposta() {
        return resposta;
    }

    public void setResposta(String resposta) {
        this.resposta = resposta;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public LocalDateTime getDataAvaliacao() {
        return dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDateTime dataAvaliacao) {
        this.dataAvaliacao = dataAvaliacao;
    }

    public String getTipoComentario() {
        return tipoComentario;
    }

    public void setTipoComentario(String tipoComentario) {
        this.tipoComentario = tipoComentario;
    }

    @Override
    public String toString() {
        return "ComentariosViewDTO [resposta=" + resposta + ", nomeUsuario=" + nomeUsuario + ", dataAvaliacao=" + dataAvaliacao + ", tipoComentario=" + tipoComentario
                + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((resposta == null) ? 0 : resposta.hashCode());
        result = prime * result + ((nomeUsuario == null) ? 0 : nomeUsuario.hashCode());
        result = prime * result + ((dataAvaliacao == null) ? 0 : dataAvaliacao.hashCode());
        result = prime * result + ((tipoComentario == null) ? 0 : tipoComentario.hashCode());
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
            ComentariosViewDTO other = (ComentariosViewDTO) obj;
        if (resposta == null) {
            if (other.resposta != null)
                return false;
        } else if (!resposta.equals(other.resposta))
            return false;
        if (nomeUsuario == null) {
            if (other.nomeUsuario != null)
                return false;
        } else if (!nomeUsuario.equals(other.nomeUsuario))
            return false;
        if (dataAvaliacao == null) {
            if (other.dataAvaliacao != null)
                return false;
        } else if (!dataAvaliacao.equals(other.dataAvaliacao))
            return false;
        if (tipoComentario == null) {
            if (other.tipoComentario != null)
                return false;
        } else if (!tipoComentario.equals(other.tipoComentario))
            return false;       
        return true;
    }
}
