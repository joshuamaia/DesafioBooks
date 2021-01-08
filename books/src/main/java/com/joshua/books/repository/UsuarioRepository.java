package com.joshua.books.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.joshua.books.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Query("FROM Usuario u "
			+ "WHERE LOWER(u.nome) like %:palavraBusca% OR LOWER(u.login) like %:palavraBusca% OR LOWER(u.cpfCnpj) like %:palavraBusca% OR LOWER(u.email) like %:palavraBusca%")
	Page<Usuario> search(@Param("palavraBusca") String palavraBusca, Pageable pageable);
	
	public Usuario findByLogin(String login);

}
