package com.joshua.books.service.impl;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joshua.books.domain.Role;
import com.joshua.books.domain.Usuario;
import com.joshua.books.repository.RoleRepository;
import com.joshua.books.repository.UsuarioRepository;
import com.joshua.books.service.UsuarioService;

@Service
public class UsuarioServiceImpl implements UsuarioService {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public Usuario save(Usuario t) {
		return usuarioRepository.save(t);
	}

	public Usuario save(Usuario t, String senha) {

		if (t.getCpfCnpj() != null) {
			t.setCpfCnpj(t.getCpfCnpj().replaceAll("[./-]", ""));
		}

		if (senha != null && !senha.trim().equals("")) {
			t.setPasswordHash(BCrypt.hashpw(senha, BCrypt.gensalt()));
		} else if (t.getId() != null) {
			Usuario u = usuarioRepository.getOne(t.getId());
			t.setPasswordHash(u.getPasswordHash());
		}
		return usuarioRepository.save(t);
	}

	@Override
	public void deleteById(Long id) {
		usuarioRepository.deleteById(id);
	}

	@Override
	public List<Usuario> findAll() {
		return usuarioRepository.findAll();
	}

	@Override
	public Usuario getOne(Long id) {
		return usuarioRepository.getOne(id);
	}

	@Override
	public Page<Usuario> findAll(Pageable pageable) {
		return usuarioRepository.findAll(pageable);
	}

	@Override
	public Page<Usuario> findAll(String palavraBusca, Pageable pageable) {
		if (palavraBusca == null || palavraBusca.trim().isEmpty()) {
			return usuarioRepository.findAll(pageable);
		}
		palavraBusca = palavraBusca.toLowerCase();
		return usuarioRepository.search(palavraBusca, pageable);
	}

	@Override
	public List<Role> listRoles() {
		return roleRepository.findAll();
	}

	@Override
	public List<Role> notRoleRegistered(Long idUser) {
		Usuario u = getOne(idUser);
		if (u.getRoles() == null || u.getRoles().isEmpty()) {
			return roleRepository.findAll();
		} else {
			return roleRepository.notRegistered(u.getRoles());
		}
	}

	@Override
	public Usuario findByLogin(String login) {
		return usuarioRepository.findByLogin(login);
	}

}
