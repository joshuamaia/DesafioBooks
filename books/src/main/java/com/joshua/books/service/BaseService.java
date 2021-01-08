package com.joshua.books.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BaseService<T, ID> {
	
	public Page<T> findAll(Pageable pageable);

	public T save(T t);
	
	public void deleteById(ID id);
	
	public List<T> findAll();
	
	public T getOne(ID id);
	
}
