import {EPermission} from "../enum/EPermission";

export interface IAccount {
  id: string;
  permission: EPermission;
  email: string;
  password: string;
}
