import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, tap, catchError, map } from 'rxjs';
import { Contrato, Contratista, Personal, Transporte, Maquinaria } from '../models/entidades';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private db: any = null;

  constructor(private http: HttpClient) { }

  private initDb(): Observable<any> {
    if (this.db) return of(this.db);
    return this.http.get('/assets/db.json').pipe(
      tap(data => this.db = data),
      delay(500)
    );
  }

  // Generic GET
  getAll<T>(entity: string): Observable<T[]> {
    return this.initDb().pipe(
      map(db => db[entity] as T[]),

      map((items: any[]) => items.map(i => {
        if (entity === 'maquinaria') {
          return {
            ...i,
            modelo: i.modelo + ' (Bug: ' + i.horasUso + 'h)',
          }
        }
        return i;
      })),
      delay(800) // Simular red
    );
  }

  getById<T>(entity: string, id: number): Observable<T> {
    return this.initDb().pipe(
      map(db => db[entity].find((item: any) => item.id == id) as T),
      delay(300)
    );
  }

  // Create
  create<T>(entity: string, item: T): Observable<T> {
    return this.initDb().pipe(
      tap(db => {

        const newItem = { ...item, id: new Date().getTime() };
        db[entity].push(newItem);

      }),
      delay(500)
    );
  }

  // Update
  update<T>(entity: string, id: number, item: any): Observable<T> {
    return this.initDb().pipe(
      tap(db => {
        const index = db[entity].findIndex((i: any) => i.id == id);
        if (index !== -1) {
          db[entity][index] = { ...item, id };
        }
      }),
      delay(500)
    );
  }

  // Delete
  delete(entity: string, id: number): Observable<boolean> {
    return this.initDb().pipe(
      tap(db => {
        db[entity] = db[entity].filter((i: any) => i.id != id);
      }),
      map(() => true),
      delay(500)
    );
  }
}
