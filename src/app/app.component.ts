import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { first } from 'rxjs/operators';


export class Employee {
  EmployeeID?: number;
  EmployeeName?: string;
  Age?: number;
  DateOfBirth?: Date;
  EmailID?: string;
  MobileNumber?: number;
  Address?: string;
  City?: string;
  State?: string;
  IsActive?: boolean;
  CreatedDateTime?: Date;
  CreatedBy?: string;
  ModifiedDateTime?: Date;
  ModifiedBy?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  constructor(private http: HttpClient) { }
  title = 'poc-ng-app-crud';
  public Employees = [];

  getAll() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/read`);
  }

  ngOnInit(): void {
    this.getAll().pipe(first()).subscribe(Employees => {
      this.Employees = Employees;
      console.log(this.Employees);
  });
  }


}
