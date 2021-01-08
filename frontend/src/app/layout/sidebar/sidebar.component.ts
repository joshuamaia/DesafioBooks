import { Component, OnInit } from "@angular/core";
import { AuthService } from "../login/auth.service";
import { Router } from "@angular/router";
import swal from "sweetalert2";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  public nomeUsuario: string;

  constructor(public authService: AuthService, private router: Router) {}
  logout(): void {
    let username = this.authService.usuario.nome;
    this.authService.logout();
    swal.fire(
      "Logout",
      `Olá ${username}, Sessão encerrada com êxito!`,
      "success"
    );
    this.router.navigate(["/login"]);
  }

  ngOnInit() {
    this.nomeUsuario = this.authService.usuario.nome;
  }
}
