import { BaseResourceModel } from "../../../shared/models/base-resource.model";

export class Role extends BaseResourceModel {
  constructor(public id?: number, public nome?: string) {
    super();
  }

  static fromJson(jsonData: any): Role {
    return Object.assign(new Role(), jsonData);
  }
}
