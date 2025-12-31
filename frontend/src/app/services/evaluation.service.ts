import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:3000/api/evaluations';

  // Creamos un "Canal de Noticias" para que la tabla se entere de los cambios
  private _evaluations$ = new BehaviorSubject<any[]>([]);
  public evaluations$ = this._evaluations$.asObservable();

  constructor(private http: HttpClient) { }

  getEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => this._evaluations$.next(data))
    );
  }

  saveEvaluation(evaluation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evaluation).pipe(
      tap(() => this.getEvaluations().subscribe())
    );
  }
}