import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { PermissionFilter } from '../../../../features/permissions/interface/permission-filter';
import { PermissionCreate } from '../../../../features/permissions/interface/permission-create';
import { PermissionUpdate } from '../../../../features/permissions/interface/permission-update';

@Injectable({
  providedIn: 'root'
})
export class PermissionApiService {


constructor(private api:ApiService) { }

getPermissionsList(queryParam:any,data:PermissionFilter){
  return this.api.Get('/Permission/GetList',queryParam);
};
getPermissionById(PermissionId:string){
  return this.api.Get('/Permission/GetById',{permissionId:PermissionId});
};
getPermissionByName(PermissionName:string){
  return this.api.Get('/Permission/GetByName',{permissionName: PermissionName});
};
CreatePermission(data :PermissionCreate){
  return this.api.Post('/Permission/Create',null,data);
};
UpdatePermission(data :PermissionUpdate){
  return this.api.Put('/Permission/Update',null,data);
};
DeletePermissionById(PermissionId :string){
  return this.api.Delete('/Permission/DeleteById',{permissionId:PermissionId});
};
DeletePermissionListById(PermissionIds :string[]){
  return this.api.Delete('/Permission/DeleteListById',null,PermissionIds);
};
}
