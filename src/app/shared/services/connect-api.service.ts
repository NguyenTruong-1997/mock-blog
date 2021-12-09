import {
  MultiArticle,
  SingleArticle,
  MultiComment,
  Tags,
  SingleComment,
} from './../models/article.model';
import { GetProfile } from './../models/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogService } from './blog.service';

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
      'Authorization': `Bearer ${token}`,
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
      this.API_URL + `/profiles/${username}/follow`,
      {},
      { headers: this.headersAuth() }
    );
  }

  public onUnfollowUser(username: string) {
    return this.http.delete<GetProfile>(
      this.API_URL + `/profiles/${username}/follow`,
      { headers: this.headersAuth() }
    );
  }

  public onGetMultiArticlesByAuthor(offset: number, author: string) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=10&offset=${offset}&author=${author}`,
      {
        headers: this.headersAuth(),
      }
    );
  }

  public onGetMultiArticlesByFavorited(offset: number, favorited: string) {
    return this.http.get<MultiArticle>(
      this.API_URL +
        `/articles/?limit=10&offset=${offset}&favorited=${favorited}`,
      {
        headers: this.headersAuth(),
      }
    );
  }

  public onGetMultiArticlesByTag(offset: number, tag: string) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=10&offset=${offset}&tag=${tag}`,
      {
        headers: this.headersAuth(),
      }
    );
  }

  public onGetGlobalFeedArticles(offset: number) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=10&offset=${offset}`,
      {
        headers: this.headersAuth(),
      }
    );
  }

  public onGetMyFeedArticles(offset: number) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/feed?limit=10&offset=${offset}`,
      {
        headers: this.headersAuth(),
      }
    );
  }

  public onGetArticleBySlug(slug: string) {
    return this.http.get<SingleArticle>(this.API_URL + `/articles/${slug}`, {
      headers: this.headers,
    });
  }

  public onCreateArticle(form: any) {
    return this.http.post<SingleArticle>(
      this.API_URL + '/articles',
      { article: form },
      { headers: this.headersAuth() }
    );
  }

  public onUpdateArticle(form: any, slug: string) {
    return this.http.put<SingleArticle>(
      this.API_URL + `/articles/${slug}`,
      { article: form },
      { headers: this.headersAuth() }
    );
  }

  public onDeleteArticle(slug: string) {
    return this.http.delete(this.API_URL + `/articles/${slug}`, {
      headers: this.headersAuth(),
    });
  }

  public onAddComment(comment: any, slug: string) {
    return this.http.post<SingleComment>(
      this.API_URL + `/articles/${slug}/comments`,
      { comment: comment },
      { headers: this.headersAuth() }
    );
  }

  public onGetComment(slug: string) {
    return this.http.get<MultiComment>(
      this.API_URL + `/articles/${slug}/comments`,
      { headers: this.headersAuth() }
    );
  }

  public onDeleteComment(slug: string, id: any) {
    return this.http.delete(this.API_URL + `/articles/${slug}/comments/${id}`, {
      headers: this.headersAuth(),
    });
  }

  public onFavoriteArticle(slug: string) {
    return this.http.post<SingleArticle>(
      this.API_URL + `/articles/${slug}/favorite`,
      {},
      { headers: this.headersAuth() }
    );
  }

  public onUnfavoriteArticle(slug: string) {
    return this.http.delete<SingleArticle>(
      this.API_URL + `/articles/${slug}/favorite`,
      { headers: this.headersAuth() }
    );
  }

  public onGetTags() {
    return this.http.get<Tags>(this.API_URL + '/tags', {
      headers: this.headers,
    });
  }

  //#end region
}
