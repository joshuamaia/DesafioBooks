import { Usuario } from './usuario.model';

export class UsuarioDto {
  constructor(public usuario?: Usuario, public senha?: string) {}

  static fromJson(jsonData: any): UsuarioDto {
    return Object.assign(new UsuarioDto(), jsonData);
  }
}
