import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient) { }
  serviceURL = environment.serviceURL;
  // To do list of tasks
  getTaskList():Observable<any[]>{
    return this.http.get<any[]>(`${this.serviceURL}getList`);
  }

  //add task
  addTask(formData:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.serviceURL}addTask`, formData);
  }

  // update a task
  updateTask(id: number, taskData: any): Observable<any> {
    return this.http.put(`${this.serviceURL}editTask/${id}`, taskData);
  }
  

  //delete a task
  deleteTask(id: number):Observable<any[]>{
    return this.http.delete<any[]>(`${this.serviceURL}deleteTask/${id}`);
  }
}
