package com.joshua.books.service.impl;

import java.io.Serializable;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.joshua.books.service.UtilService;

@Component
public class UtilServiceImpl implements UtilService, Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public String obterUsuarioRequisicao() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

		String nome = null;

		if (principal instanceof UserDetails) {
			nome = ((UserDetails) principal).getUsername();
		} else {
			nome = principal.toString();
		}
		return nome;
	}
	
	

}
