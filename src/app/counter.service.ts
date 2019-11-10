import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Counter } from './counter';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  initialValue = [12, 6, 78];

  constructor(private http: HttpClient) { }

  reset(){
    this.initialValue = [0, 0, 0];
  }

  async increment(id: number) : Promise<number> {
    var newPromiseValue = await this.patchCounter(id).pipe(
      switchMap(() => this.getCounter(id)),
      map(counter => counter.value) 
    ).toPromise();
    return newPromiseValue;
  }

  getCounter(id: number) : Observable<Counter> {
    var url = 'https://lp4a-backend-a2019.herokuapp.com/counters/' + id + '.json';
    return this.http.get<Counter>(url);
  }

  getCounters() : Observable<Counter[]> {
    var url = 'https://lp4a-backend-a2019.herokuapp.com/counters.json';
    return this.http.get<Counter[]>(url);
  }

  getCountersArray() : Array<Counter> {
    var counters : Array<Counter> = [];
    this.getCounters()
      .subscribe((remoteCounters) => {
        remoteCounters.forEach((remoteCounter) => {
          counters.push(remoteCounter);
        });
        counters.sort(
          (first : Counter, second : Counter) => first.id - second.id
        );
      }
    );
    return counters;
  }

  patchCounter(id: number) : Observable<Object> {
    var url = 'https://lp4a-backend-a2019.herokuapp.com/counters/' + id + '.json';
    return this.http.patch(url, {});
  }
}