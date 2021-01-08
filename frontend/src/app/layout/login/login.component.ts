import { Component, OnInit } from "@angular/core";

import swal from "sweetalert2";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { Usuario } from "src/app/pages/usuarios/shared/usuario.model";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  titulo: string = "Por favor Faça Login!";
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      swal.fire(
        "Login",
        `Olá ${this.authService.usuario.nome} já está autenticado!`,
        "info"
      );
      this.router.navigate(["/alterarsenha"]);
    }
  }

  login(): void {
    if (this.usuario.login == null || this.usuario.senha == null) {
      swal.fire("Login Erro", "Usuário ou senha vazios!", "error");
      return;
    }

    this.authService.login(this.usuario).subscribe(
      (response) => {
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
        this.router.navigate(["/alterarsenha"]);
        swal.fire(
          "Login",
          `Olá ${usuario.nome}, sessão iniciada com êxito!`,
          "success"
        );
      },
      (err) => {
        if (err.error.error_description === "User is disabled") {
          swal.fire("Error Login", "Usuário desabilitado!!", "error");
        } else if (err.error.error_description === "Bad credentials") {
          swal.fire("Error Login", "Usuário ou senha incorretos!", "error");
        }
      }
    );
  }
}
