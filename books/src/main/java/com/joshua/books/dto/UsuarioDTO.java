package com.joshua.books.dto;

import com.joshua.books.domain.Usuario;

public class UsuarioDTO {

	private Usuario usuario;

	private String senha;

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

}
