import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { UserFilterResponse } from '../../../interface/user-filter-response';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private api:ApiService) { }
getcurrentUser(){
  return this.api.Get('/User/GetCurrent');
};
getUsersList(data:UserFilterResponse,queryParam:any){
  return this.api.Post('/User/GetList',queryParam,data);
};
}
