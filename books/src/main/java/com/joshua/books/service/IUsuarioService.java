package com.joshua.books.service;
import com.joshua.books.domain.Usuario;

public interface IUsuarioService {

	public Usuario findByLogin(String login);
}
