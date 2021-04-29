import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeadlineDTO} from '../../model/deadlineDTO';

const API_URL = 'http://127.0.0.1:3000/deadlines/';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) {
  }

  getDeadlines(): Observable<any> {
    return this.http.get(API_URL, {responseType: 'text'});
  }

  getDeadline(deadlineId: string): Observable<string> {
    return this.http.get(API_URL + deadlineId, {responseType: 'text'});
  }

  createDeadline(deadlineDTO: DeadlineDTO): Observable<any> {
    return this.http.post(API_URL, deadlineDTO, {responseType: 'text'});
  }

  updateDeadline(deadlineDTO: any): Observable<any> {
    return this.http.put(API_URL + deadlineDTO._id, deadlineDTO, {responseType: 'text'});
  }

  deleteDeadline(deadlineId: string): Observable<any> {
    return this.http.delete(API_URL + deadlineId, {responseType: 'text'});
  }
}
