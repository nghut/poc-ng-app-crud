import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { first } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) { }
  title = 'Web app';
  public Employees: IEmployee[] = [];

  displayedColumns: string[] = [ 'EmployeeID'
    , 'EmployeeName'
    , 'DateOfBirth'
    , 'Age'
    , 'EmailID'
    , 'MobileNumber'
    , 'Address'
    , 'City'
    , 'State'
  ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Funtions
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getEmployees() {
    return this.http.get<IEmployee[]>(`${environment.apiUrl}/read`);
  }

  deleteEmployee(d) {
    return this.http.post<IStatus>(`${environment.apiUrl}/delete`, d);
  }

  onLoadEmployee() {
    this.getEmployees().pipe(first()).subscribe(data => {
      this.dataSource.data = data;
  });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.onLoadEmployee();
  }


  // Events
  // Add Employee
  openAddEmpDialog(d): void {
    let rowData: IEmployee = {};
    if (d !== '') {
      rowData = d;
    }
    const dialogRef = this.dialog.open(AddEmpDialogComponent, {
      width: '750px',
      data: rowData
    });
    dialogRef.afterClosed().subscribe(result => {
       this.onLoadEmployee();
    });
  }

  onClickDeleteEmployee(d) {
    const employeeID: any = { EmployeeID : d };
    this.deleteEmployee(employeeID).pipe(first()).subscribe(data => {
      const jsonData = data;
      if (jsonData.Code === 1) {
        this.openSnackBar(jsonData.Message, '');
        this.onLoadEmployee();
      } else {
        this.openSnackBar(jsonData.Message, '');
      }
  });
  }
}


export interface IStatus {
  Code?: number;
  Message?: string;
}

export interface IEmployee {
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
  selector: 'app-add-emp-dialog',
  templateUrl: './Shared/add-emp-dialog.component.html',
})
export class AddEmpDialogComponent {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEmpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEmployee
    ) {}

    // Method
  updateEmployee(d) {
    return this.http.post<IStatus>(`${environment.apiUrl}/update`, d);
  }

  addEmployee(d) {
    return this.http.post<IStatus>(`${environment.apiUrl}/create`, d);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onClickUpdateEmployee(d) {
    if (isNullOrUndefined(d.EmployeeID)) {
      d.DateOfBirth = null;
      this.addEmployee(d).pipe(first()).subscribe(data => {
        const jsonData = data;
        if (jsonData.Code === 1) {
          this.openSnackBar(jsonData.Message, '');
          this.onClickCloseDialog();
        } else {
          this.openSnackBar(jsonData.Message, '');
        }
    });
    } else {
    this.updateEmployee(d).pipe(first()).subscribe(data => {
      const jsonData = data;
      if (jsonData.Code === 1) {
        this.openSnackBar(jsonData.Message, '');
        this.onClickCloseDialog();
      } else {
        this.openSnackBar(jsonData.Message, '');
      }
  });
}

  }

    onClickCloseDialog(): void {
    this.dialogRef.close();
  }
}
