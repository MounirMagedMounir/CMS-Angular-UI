import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ArticleCreate } from '../../../../features/articles/interface/article-create';
import { ArticleFilter } from '../../../../features/articles/interface/article-filter';
import { ArticleUpdate } from '../../../../features/articles/interface/article-update';
import { RequestQueryParams } from '../../../interface/request-query-params';
import { ArticlesByUserQueryParam } from '../../../../features/articles/interface/articles-by-user-query-param';

@Injectable({
  providedIn: 'root'
})
export class ArticleApiService {


  constructor(private api:ApiService) { }
getCurrentUserArticle(queryParam:RequestQueryParams){
  return this.api.Get('/Article/GetCurrentUser',queryParam);
};
getArticlesList(queryParam:RequestQueryParams,data:ArticleFilter){
  return this.api.Post('/Article/GetList',queryParam,data);
};
getArticleById(ArticleId:string){
  return this.api.Get('/Article/GetById',{articleId: ArticleId});
};
getArticleListByUserId(queryParam:ArticlesByUserQueryParam){
  return this.api.Get('/Article/GetListByUserId',queryParam);
};
CreateArticle(data :ArticleCreate){
  return this.api.Post('/Article/Create',null,data);
};
UpdateArticle(data :ArticleUpdate){
  return this.api.Put('/Article/Update',null,data);
};
UpdateViewCountArticle(ArticleId:string){
  return this.api.Put('/Article/UpdateViewCount',{articleId:ArticleId},null);
};
DeletePermanentArticle(ArticleId :string){
  return this.api.Post('/Article/DeletePermanent',{articleId:ArticleId},null);
};
DeleteArticle(ArticleId :string){
  return this.api.Post('/Article/DeleteById',{articleId:ArticleId},null);
};
}
