//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-employee-form',
//  templateUrl: './employee-form.component.html',
//  styleUrl: './employee-form.component.css'
//})
//export class EmployeeFormComponent {

//}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = { id: 0, firstName: '', lastName: '', email: '', department: '' };
  isEditMode = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployee(+id).subscribe(data => this.employee = data);
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => this.router.navigate(['/']));
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => this.router.navigate(['/']));
    }
  }
}
