import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { UserFilter } from '../../../interface/user/user-filter';
import { UserCreate } from '../../../interface/user/user-create';
import { UserUpdate } from '../../../interface/user/user-update';
import { RequestQueryParams } from '../../../interface/request-query-params';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private api:ApiService) { }
getCurrentUser(){
  return this.api.Get('/User/GetCurrent');
};
getUsersList(queryParam:RequestQueryParams,data:UserFilter){
  return this.api.Post('/User/GetList',queryParam,data);
};
getUserById(UserId:string){
  return this.api.Get('/User/GetById', { userId: UserId });
};
CreateUser(data :UserCreate){
  return this.api.Post('/User/Create',null,data);
};
UpdateUser(data :UserUpdate){
  return this.api.Put('/User/Update',null,data);
};
DeletePermanentUser(UserId :string){
  return this.api.Delete('/User/DeletePermanent', { userId: UserId },null);
};
DeleteUser(UserId :string){
  return this.api.Delete('/User/Delete',{ userId: UserId },null);
};
}
