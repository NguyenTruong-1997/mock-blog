import { SingleArticle, SingleComment } from './../models/article.model';
import { GetProfile } from './../models/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogService } from './blog.service';
import { FormCreateArticle } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class ConnectApiService {
  //#region Properties
  private readonly API_URL = 'https://conduit.productionready.io/api';

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  //#end region

  //#region Constructor
  public constructor(
    private http: HttpClient,
    private blogService: BlogService
  ) {}

  //#end region

  //#region Methods
  private headersAuth() {
    const token = this.blogService.onGetToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  public onGetProfile(username: string) {
    return this.http.get<GetProfile>(this.API_URL + `/profiles/${username}`, {
      headers: this.headersAuth(),
    });
  }

  public onFollowUser(username: string) {
    return this.http.post<GetProfile>(
      this.API_URL + `/api/profiles/${username}/follow`,
      {},
      { headers: this.headersAuth() }
    );
  }

  public onUnfollowUser(username: string) {
    return this.http.delete<GetProfile>(
      this.API_URL + `/api/profiles/${username}/follow`,
      { headers: this.headersAuth() }
    );
  }

  public onGetListArticles() {

  }

  public onGetFeedArticles() {

  }

  public onGetArticleBySlug(slug: string) {
    return this.http.get<GetProfile>(this.API_URL + `/articles/${slug}`, {
      headers: this.headers,
    });
  }

  public onCreateArticle(form: any) {
    return this.http.post<SingleArticle>(
      this.API_URL + '/articles',
      { article: form },
      { headers: this.headersAuth() }
    )
  }

  public onUpdateArticle(form: any, slug: string) {
    return this.http.put(this.API_URL + `/articles/${slug}`, 
    { article: form },
    { headers: this.headers }
    );
  }

  public onDeleteArticle(slug: string) {
    return this.http.delete(this.API_URL + `/articles/${slug}`, {
      headers: this.headers,
    });
  } 

  public onAddComment(comment: any, slug: string) {
    return this.http.post(
      this.API_URL + `/articles/${slug}/comments`,
      { comment: comment },
      { headers: this.headersAuth() }
    )
  }

  public onGetComment(slug: string) {
    return this.http.get<SingleComment[]>(
      this.API_URL + `/articles/${slug}/comments`,
      { headers: this.headersAuth() }
    )
  }

  public onDeleteComment(slug: string, id: any) {
    return this.http.delete(
      this.API_URL + `/articles/${slug}/comments/${id}`,
      { headers: this.headersAuth() }
    )
  }

  public onFavoriteArticle(slug: string) {
    return this.http.post(
      this.API_URL + `/articles/${slug}/favorite`,
      {},
      { headers: this.headersAuth() }
    )
  }

  public onUnfavoriteArticle(slug: string) {
    return this.http.delete(
      this.API_URL + `/articles/${slug}/favorite`,
      { headers: this.headersAuth() }
    )
  }

  public onGetTags() {
    return this.http.get(
      this.API_URL + '/tags',
      { headers: this.headers }
    )
  }

  //#end region
}
