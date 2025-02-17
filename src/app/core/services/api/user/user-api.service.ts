import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { UserFilterResponse } from '../../../interface/user/user-filter-response';
import { UserCreate } from '../../../interface/user/user-create';
import { UserUpdate } from '../../../interface/user/user-update';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private api:ApiService) { }
getcurrentUser(){
  return this.api.Get('/User/GetCurrent');
};
getUsersList(queryParam:any,data:UserFilterResponse){
  return this.api.Post('/User/GetList',queryParam,data);
};
getUserById(queryParam:any){
  return this.api.Get('/User/GetById',queryParam);
};
CreateUser(data :UserCreate){
  return this.api.Post('/User/Create',null,data);
};
UpdateUser(data :UserUpdate){
  return this.api.Put('/User/Update',null,data);
};
DeletePermanentUser(UserId :any){
  return this.api.Post('/User/DeletePermanent',UserId,null);
};
DeleteUser(UserId :any){
  return this.api.Post('/User/Delete',UserId,null);
};
}
