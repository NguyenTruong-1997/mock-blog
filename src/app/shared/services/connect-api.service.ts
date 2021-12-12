import {
  MultiArticle,
  SingleArticle,
  MultiComment,
  Tags,
  SingleComment,
} from './../models/article.model';
import { GetProfile } from './../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConnectApiService {
  //#region Properties
  private readonly API_URL = 'https://conduit.productionready.io/api';

  //#end region

  //#region Constructor
  public constructor(private http: HttpClient) {}

  //#end region

  //#region Methods

  public onGetProfile(username: string) {
    return this.http.get<GetProfile>(this.API_URL + `/profiles/${username}`);
  }

  public onFollowUser(username: string) {
    return this.http.post<GetProfile>(
      this.API_URL + `/profiles/${username}/follow`,
      {}
    );
  }

  public onUnfollowUser(username: string) {
    return this.http.delete<GetProfile>(
      this.API_URL + `/profiles/${username}/follow`
    );
  }

  public onGetMultiArticlesByAuthor(offset: number, author: string) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=10&offset=${offset}&author=${author}`
    );
  }

  public onGetMultiArticlesByFavorited(offset: number, favorited: string) {
    return this.http.get<MultiArticle>(
      this.API_URL +
        `/articles/?limit=10&offset=${offset}&favorited=${favorited}`
    );
  }

  public onGetMultiArticlesByTag(limit:number ,offset: number, tag: string) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=${limit}&&offset=${offset}&tag=${tag}`
    );
  }

  public onGetGlobalFeedArticles(limit:number , offset: number) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/?limit=${limit}&offset=${offset}`
    );
  }

  public onGetMyFeedArticles(limit:number ,offset: number) {
    return this.http.get<MultiArticle>(
      this.API_URL + `/articles/feed??limit=${limit}&offset=${offset}`
    );
  }

  public onGetArticleBySlug(slug: string) {
    return this.http.get<SingleArticle>(this.API_URL + `/articles/${slug}`);
  }

  public onCreateArticle(form: any) {
    return this.http.post<SingleArticle>(this.API_URL + '/articles', {
      article: form,
    });
  }

  public onUpdateArticle(form: any, slug: string) {
    return this.http.put<SingleArticle>(this.API_URL + `/articles/${slug}`, {
      article: form,
    });
  }

  public onDeleteArticle(slug: string) {
    return this.http.delete(this.API_URL + `/articles/${slug}`);
  }

  public onAddComment(comment: any, slug: string) {
    return this.http.post<SingleComment>(
      this.API_URL + `/articles/${slug}/comments`,
      { comment: comment }
    );
  }

  public onGetComment(slug: string) {
    return this.http.get<MultiComment>(
      this.API_URL + `/articles/${slug}/comments`
    );
  }

  public onDeleteComment(slug: string, id: any) {
    return this.http.delete(this.API_URL + `/articles/${slug}/comments/${id}`);
  }

  public onFavoriteArticle(slug: string) {
    return this.http.post<SingleArticle>(
      this.API_URL + `/articles/${slug}/favorite`,
      {}
    );
  }

  public onUnfavoriteArticle(slug: string) {
    return this.http.delete<SingleArticle>(
      this.API_URL + `/articles/${slug}/favorite`
    );
  }

  public onGetTags() {
    return this.http.get<Tags>(this.API_URL + '/tags');
  }

  //#end region
}
