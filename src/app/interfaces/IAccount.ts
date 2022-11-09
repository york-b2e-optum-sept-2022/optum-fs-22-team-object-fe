import {EPermission} from "../enum/EPermission";

export interface IAccount {
  email: string;
  password: string;
  PermissionLevel: EPermission | null;
  userID: String;
  permission: String;
}
