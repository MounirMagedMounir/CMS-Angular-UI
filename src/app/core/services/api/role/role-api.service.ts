import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { RoleFilter } from '../../../../features/roles/interface/role-filter';
import { RoleCreate } from '../../../../features/roles/interface/role-create';
import { RoleUpdate } from '../../../../features/roles/interface/role-update';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

constructor(private api:ApiService) { }

getRolesList(queryParam:any,data:RoleFilter){
  return this.api.Post('/Role/GetList',queryParam,data);
};
getRoleById(queryParam:any){
  return this.api.Get('/Role/GetById',queryParam);
};
CreateRole(data :RoleCreate){
  return this.api.Post('/Role/Create',null,data);
};
AddPermissionRole(data :RoleCreate){
  return this.api.Post('/Role/AddPermissions',null,data);
};
UpdateRole(data :RoleUpdate){
  return this.api.Put('/Role/Update',null,data);
};
RemovePermission(RoleId :any){
  return this.api.Delete('/Role/RemovePermission',RoleId);
};
DeleteRoleById(RoleId :any){
  return this.api.Delete('/Role/DeleteById',RoleId);
};
DeleteRoleListById(RoleId :any[]){
  return this.api.Delete('/Role/DeleteListById',null,RoleId);
};
}
