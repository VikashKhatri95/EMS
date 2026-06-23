import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResult } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  // CHANGE THIS PORT to match your launchSettings.json!
  private apiUrl = 'https://localhost:7235/api/employees';

  constructor(private http: HttpClient) { }

  //getEmployees(): Observable<Employee[]> {
  //  return this.http.get<Employee[]>(this.apiUrl);
  //}

  // UPDATED: Now accepts pagination parameters
  getEmployees(
    page: number = 1,
    pageSize: number = 10,
    searchTerm: string = '',
    sortBy: string = '',
    sortDirection: string = 'asc'
  ): Observable<PagedResult<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy).set('sortDirection', sortDirection);
    }

    return this.http.get<PagedResult<Employee>>(this.apiUrl, { params });
  }


  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
