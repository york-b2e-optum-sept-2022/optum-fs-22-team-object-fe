import {EPermission} from "../enum/EPermission";

export interface IAccount {
  email: string;
  password: string;
  permission: EPermission;
}
