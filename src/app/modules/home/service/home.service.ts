import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog.service';

@Injectable()
export class HomeService {
  private readonly API_URL = 'https://conduit.productionready.io/api';

  public constructor(
    private http: HttpClient,
    private blogService: BlogService
  ) {}

  private headersAuth() {
    const token = this.blogService.onGetToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    });
    return headers;
  }

  tag$ = new BehaviorSubject<{}>({ type: 'all', filters: {} });
  tag = this.tag$.asObservable();

  tagName$ = new BehaviorSubject<string>('');
  tagName = this.tagName$.asObservable();

  setTag(value: any) {
    this.tag$.next(value);
  }

  setTagName(value: any) {
    this.tagName$.next(value);
  }

  public onFavoriteArticlePost(slug: string) : Observable<any> {
    return this.http.post(
      this.API_URL + `/articles/${slug}/favorite`,
      {},
      { headers: this.headersAuth() }
    );
  }

  public onFavoriteArticleDel(slug: string) : Observable<any> {
    return this.http.delete(this.API_URL + `/articles/${slug}/favorite`, {
      headers: this.headersAuth(),
    });
  }
}
