package com.joshua.books.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.joshua.books.domain.Livro;

public interface LivroService extends BaseService<Livro, Long> {

	public Page<Livro> findAll(String palavraBusca, Pageable pageable);
	
}
