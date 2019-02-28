import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';


import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({
  providedIn: 'root'
})

export class HeroService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseUrl+this.heroesUrl)
    .pipe(
      tap(_ => this.log('ดึงข้อมูลวายร้ายทั้งหมด')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`ดึงข้อมูลวายร้าย id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`ค้นหาวายร้ายจาก"${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
  /** POST: add a new hero to the server */
addHero (hero: Hero): Observable<Hero> {
  // const httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
  .pipe(
    tap((newHero: Hero) => this.log(`เพิ่มวายร้าย id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  );
}

  /** PUT: update the hero on the server */
updateHero (hero: Hero): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;
  // const httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  return this.http.put<Hero>(url, hero, httpOptions)
  .pipe(
    tap(_ => this.log(`แก้ไขข้อมูลวายร้าย id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}
/** DELETE: delete the hero from the server */
deleteHero (hero: Hero): Observable<Hero> {
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;
  // const httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  // };
  return this.http.delete<Hero>(url,httpOptions)
  .pipe(
    tap(_ => this.log(`ลบข้อมูลวายร้าย id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.add(`ทำรายการ: ${message}`);
}
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
     
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
     
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
     
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
    private heroesUrl = 'http://5c7366a1cce2a1001490eb58.mockapi.io/api/evill';  // URL to web api
    private baseUrl = '';  // URL to web api
    

}
