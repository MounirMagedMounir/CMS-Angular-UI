import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { RoleFilter } from '../../../../features/roles/interface/role-filter';
import { RoleCreate } from '../../../../features/roles/interface/role-create';
import { RoleUpdate } from '../../../../features/roles/interface/role-update';
import { RequestQueryParams } from '../../../interface/request-query-params';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

constructor(private api:ApiService) { }

getRolesList(queryParam:RequestQueryParams,data:RoleFilter){
  return this.api.Post('/Role/GetList',queryParam,data);
};
getRoleById(RoleId:string){
  return this.api.Get('/Role/GetById',{roleId:RoleId});
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
RemovePermission(RoleId :string){
  return this.api.Delete('/Role/RemovePermission',{roleId:RoleId});
};
DeleteRoleById(RoleId :string){
  return this.api.Delete('/Role/DeleteById',{roleId:RoleId});
};
DeleteRoleListById(RoleIds :string[]){
  return this.api.Delete('/Role/DeleteListById',null,RoleIds);
};
}
