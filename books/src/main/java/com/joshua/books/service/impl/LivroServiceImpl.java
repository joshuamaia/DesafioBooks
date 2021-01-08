package com.joshua.books.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.joshua.books.domain.Livro;
import com.joshua.books.repository.LivroRepository;
import com.joshua.books.service.LivroService;

@Service
public class LivroServiceImpl implements LivroService {

	@Autowired
	private LivroRepository livroRepository;


	@Override
	public Livro save(Livro t) {
		return livroRepository.save(t);
	}

	@Override
	public void deleteById(Long id) {
		livroRepository.deleteById(id);
	}

	@Override
	public List<Livro> findAll() {
		return livroRepository.findAll();
	}

	@Override
	public Livro getOne(Long id) {
		return livroRepository.getOne(id);
	}

	@Override
	public Page<Livro> findAll(Pageable pageable) {
		return livroRepository.search(pageable);
	}

	@Override
	public Page<Livro> findAll(String palavraBusca, Pageable pageable) {
		if (palavraBusca == null || palavraBusca.trim().isEmpty()) {
			return livroRepository.search(pageable);
		}
		palavraBusca = palavraBusca.toLowerCase();
		return livroRepository.search(palavraBusca, pageable);
	}

}
