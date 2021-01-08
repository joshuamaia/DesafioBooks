import { BaseResourceModel } from '../../../shared/models/base-resource.model';

import { Role } from './role.model';

export class Usuario extends BaseResourceModel {
  constructor(
    public id?: number,
    public cpfCnpj?: string,
    public login?: string,
    public nome?: string,
    public receberEmail?: boolean,
    public email?: string,
    public senha?: string,
    public roles?: Role[]
  ) {
    super();
  }

  static fromJson(jsonData: any): Usuario {
    return Object.assign(new Usuario(), jsonData);
  }
}
