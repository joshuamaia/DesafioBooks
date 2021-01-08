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

import com.joshua.books.domain.Usuario;
import com.joshua.books.dto.UsuarioDTO;
import com.joshua.books.service.UsuarioService;
import com.joshua.books.service.UtilService;
import com.joshua.books.util.ResponseBase;
import com.joshua.books.util.Util;

@RestController
@RequestMapping("/rest/usuario")
@CrossOrigin(origins = Util.CORS_ORIGINS, allowedHeaders = Util.CORS_ALLOWED_HEADERS)
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@Autowired
	private UtilService utilService;

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/listar", method = RequestMethod.GET)
	public ResponseEntity<Object> listar() {

		ResponseEntity<Object> retorno = null;

		try {
			List<Usuario> lista = usuarioService.findAll();

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar os usuários");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/listar/page/{page}/{size}", method = RequestMethod.GET)
	public ResponseEntity<Object> listar(@PathVariable Integer page, @PathVariable Integer size) {
		ResponseEntity<Object> retorno = null;

		try {

			Pageable pageable = PageRequest.of(page, size);

			Page<Usuario> lista = usuarioService.findAll(pageable);

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar os usuários");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/listar/page/{page}/{size}/{palavra}", method = RequestMethod.GET)
	public ResponseEntity<Object> listar(@PathVariable Integer page, @PathVariable Integer size,
			@PathVariable String palavra) {
		ResponseEntity<Object> retorno = null;

		try {

			Pageable pageable = PageRequest.of(page, size);

			Page<Usuario> lista = usuarioService.findAll(palavra, pageable);

			retorno = ResponseEntity.ok(lista);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar os usuários");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/roles", method = RequestMethod.GET)
	public ResponseEntity<Object> roles() {

		ResponseEntity<Object> retorno = null;

		try {

			retorno = ResponseEntity.ok(usuarioService.listRoles());
		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar as Roles");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/rolesnaoregistrado/{idUser}", method = RequestMethod.GET)
	public ResponseEntity<Object> rolesNaoRegistradas(@PathVariable String idUser) {

		ResponseEntity<Object> retorno = null;

		try {
			if (idUser == null || idUser.equals("0")) {
				retorno = ResponseEntity.ok(usuarioService.listRoles());
			} else {
				retorno = ResponseEntity.ok(usuarioService.notRoleRegistered(Long.valueOf(idUser)));
			}

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar as Roles");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/criar", method = RequestMethod.POST)
	public ResponseEntity<Object> criar(@RequestBody UsuarioDTO usuarioDto) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			Usuario usuario = usuarioDto.getUsuario();
			String senha = usuarioDto.getSenha();

			if (usuario == null) {
				response.put("mensagem", "Usuário não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			if (senha == null) {
				response.put("mensagem", "Senha não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			usuario = usuarioService.save(usuario, senha);

			

			retorno = new ResponseEntity<Object>(usuario, HttpStatus.CREATED);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar criar o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/atualizar", method = RequestMethod.PUT)
	public ResponseEntity<Object> atualizar(@RequestBody UsuarioDTO usuarioDto) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			Usuario usuario = usuarioDto.getUsuario();
			String senha = usuarioDto.getSenha();

			if (usuario == null || usuario.getId() == null) {
				response.put("mensagem", "usuário ou Id do Usuário não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			usuario = usuarioService.save(usuario, senha);

			retorno = new ResponseEntity<Object>(usuario, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar atualizar o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> listarUsuarioPorId(@PathVariable("id") Long id) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (id == null) {
				response.put("mensagem", "Id do Usuário não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			Usuario Usuario = usuarioService.getOne(id);

			retorno = ResponseEntity.ok(Usuario);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@RequestMapping(path = "/usuariologado", method = RequestMethod.GET)
	public ResponseEntity<Object> listarUsuarioLogado() {

		ResponseEntity<Object> retorno = null;

		try {

			Usuario usuario = usuarioService.findByLogin(utilService.obterUsuarioRequisicao());

			retorno = ResponseEntity.ok(usuario);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar listar o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@RequestMapping(path = "/atualizarusuariologado", method = RequestMethod.PUT)
	public ResponseEntity<Object> atualizarUsuarioLogado(@RequestBody UsuarioDTO usuarioDto) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			Usuario usuario = usuarioDto.getUsuario();
			String senha = usuarioDto.getSenha();

			if (usuario == null || usuario.getId() == null) {
				response.put("mensagem", "usuário ou Id do Usuário não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			usuario = usuarioService.save(usuario, senha);

			retorno = new ResponseEntity<Object>(usuario, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar atualizar o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

	@Secured({ "ROLE_ADMIN" })
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> excluir(@PathVariable("id") Long id) {

		Map<String, Object> response = new HashMap<>();
		ResponseEntity<Object> retorno = null;

		try {

			if (id == null) {
				response.put("mensagem", "Id do Usuário não pode ser nulo!");
				retorno = new ResponseEntity<Object>(response, HttpStatus.NOT_FOUND);
				return retorno;
			}

			usuarioService.deleteById(id);

			retorno = new ResponseEntity<Object>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			ResponseBase responseSitros = new ResponseBase();
			responseSitros.setMessage("Erro ao tentar excluir o usuário");
			responseSitros.setStatus(Util.FAIL);

			retorno = new ResponseEntity<Object>(responseSitros, HttpStatus.NOT_FOUND);
		}

		return retorno;
	}

}
