import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private api:ApiService) { }
getcurrentUser(){
  return this.api.Get('/User/GetCurrent');
};
}
