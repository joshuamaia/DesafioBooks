package com.joshua.books.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.joshua.books.domain.Livro;
import com.joshua.books.service.LivroService;
import com.joshua.books.util.ResponseBase;
import com.joshua.books.util.Util;



@RestController
@RequestMapping("/rest/livro")
@CrossOrigin(origins = Util.CORS_ORIGINS, allowedHeaders = Util.CORS_ALLOWED_HEADERS)
public class LivroController {

	@Autowired
	private LivroService livroService;

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/listar", method = RequestMethod.GET)
	public ResponseEntity<Object> listar() {

		ResponseEntity<Object> retorno = null;

		try {
			List<Livro> lista = livroService.findAll();

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar listar os livros");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}
	
	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/listar/page/{page}/{size}", method = RequestMethod.GET)
	public ResponseEntity<Object> listar(@PathVariable Integer page, @PathVariable Integer size) {
		ResponseEntity<Object> retorno = null;

		try {

			Pageable pageable = PageRequest.of(page, size);

			Page<Livro> lista = livroService.findAll(pageable);

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar listar os livros");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/listar/page/{page}/{size}/{palavra}", method = RequestMethod.GET)
	public ResponseEntity<Object> listar(@PathVariable Integer page, @PathVariable Integer size,
			@PathVariable String palavra) {
		ResponseEntity<Object> retorno = null;

		try {

			Pageable pageable = PageRequest.of(page, size);

			Page<Livro> lista = livroService.findAll(palavra, pageable);

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar listar os livros");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/criar", method = RequestMethod.POST)
	public ResponseEntity<Object> criar(@RequestBody Livro Livro) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (Livro == null) {
				response.put("mensagem", "Área de atuação não pode ser nula!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			Livro = livroService.save(Livro);

			retorno = new ResponseEntity<Object>(Livro, HttpStatus.CREATED);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar criar o livro");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/atualizar", method = RequestMethod.PUT)
	public ResponseEntity<Object> atualizar(@RequestBody Livro Livro) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (Livro == null || Livro.getId() == null) {
				response.put("mensagem", "livro ou Id do livro não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			Livro = livroService.save(Livro);

			retorno = new ResponseEntity<Object>(Livro, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar atualizar o livro");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> listarLivroPorId(@PathVariable("id") Long id) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (id == null) {
				response.put("mensagem", "Id do livro não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			Livro Livro = livroService.getOne(id);

			retorno = ResponseEntity.ok(Livro);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar listar o livro");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN", "ROLE_BOOK" })
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> excluir(@PathVariable("id") Long id) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (id == null) {
				response.put("mensagem", "Id do livro não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			livroService.deleteById(id);

			retorno = new ResponseEntity<Object>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase ResponseBase = new ResponseBase();
			ResponseBase.setMessage("Erro ao tentar excluir o livro");
			ResponseBase.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(ResponseBase, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

}
