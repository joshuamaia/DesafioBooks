import { BaseResourceModel } from '../../../shared/models/base-resource.model';
import { Usuario } from '../../usuarios/shared/usuario.model';

export class Livro extends BaseResourceModel {
  constructor(
    public id?: number,
    public usuario?: Usuario,
    public nome?: string,
    public autor?: string,
    public observacao?: string,
    public paginaAtual?: number,
    public nota?: number,
    public ano?: number,
    public dataInicio?: Date,
    public dataFim?: Date
  ) {
    super();
  }

  static fromJson(jsonData: any): Livro {
    return Object.assign(new Livro(), jsonData);
  }
}
