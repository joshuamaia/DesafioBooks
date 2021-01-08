package com.joshua.books.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.joshua.books.domain.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {

	@Query("SELECT l FROM Livro l WHERE LOWER(l.nome) like %:palavraBusca% OR LOWER(l.autor) like %:palavraBusca% OR LOWER(l.usuario.nome) like %:palavraBusca% ORDER BY l.nome")
	Page<Livro> search(@Param("palavraBusca") String palavraBusca, Pageable pageable);
	
	@Query("SELECT l FROM Livro l ORDER BY l.nome")
	Page<Livro> search( Pageable pageable);

}
