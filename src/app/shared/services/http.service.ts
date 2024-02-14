import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) { }

  private makeParams(params: { [key: string]: any } = {}) {
    let httpParams = new HttpParams()

    for (let key in params) {
      httpParams = httpParams.append(key, params[key])
    }

    return httpParams
  }

  private url(endpoint: string): string {
    let apiUrl = "http://localhost:3000"
    // return `${environment.apiUrl}/${endpoint}`
    return `${apiUrl}/${endpoint}`
  }

  public get<T>(endpoint: string, params = {}): Observable<T> {
    return this.handleError(this.http.get<T>(this.url(endpoint), { params: this.makeParams(params) }))
  }

  public getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.handleError(this.http.get<T>(`${this.url(endpoint)}/${id}`))
  }

  public post<T>(endpoint: string, body: T): Observable<T> {
    return this.handleError(this.http.post<T>(this.url(endpoint), body))
  }

  public put<T>(endpoint: string, id: string | number, body: T): Observable<T> {
    return this.handleError(this.http.put<T>(`${this.url(endpoint)}/${id}`, body))
  }

  public patch<T>(endpoint: string, id: string | number, body: T): Observable<T> {
    return this.handleError(this.http.patch<T>(`${this.url(endpoint)}/${id}`, body))
  }

  public delete<T>(endpoint: string, id: string | number): Observable<T> {
    return this.handleError(this.http.delete<T>(`${this.url(endpoint)}/${id}`))
  }

  private handleError<T>(obs: Observable<T>) {
    return obs.pipe(
      first(),
      catchError((err: HttpErrorResponse) => throwError(() => { throw err }))
    )
  }
}
