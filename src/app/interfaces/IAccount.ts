import {EPermission} from "../enum/EPermission";

export interface IAccount {
  email: string;
  password: string;
  PermissionLevel: EPermission | null;
  userID: string;
  permission: String;
  id: string
}
