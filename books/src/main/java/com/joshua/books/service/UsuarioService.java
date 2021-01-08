package com.joshua.books.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.joshua.books.domain.Role;
import com.joshua.books.domain.Usuario;

public interface UsuarioService extends BaseService<Usuario, Long> {

	public List<Role> listRoles();
	
	public List<Role> notRoleRegistered(Long idUser);

	public Usuario save(Usuario t, String senha);

	public Page<Usuario> findAll(String palavraBusca, Pageable pageable);
	
	public Usuario findByLogin(String login);

}
