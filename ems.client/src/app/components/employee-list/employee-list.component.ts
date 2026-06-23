import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm: string = '';
  filteredEmployees: Employee[] = [];
  // NEW: Sorting properties
  sortColumn: string = ''; // Which column is being sorted
  sortDirection: 'asc' | 'desc' = 'asc'; // Sort direction

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = this.employees;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp =>
        emp.firstName.toLowerCase().includes(term) ||
        emp.lastName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.department.toLowerCase().includes(term)
      );
    }

    // If a sort is active, reapply it after filtering
    if (this.sortColumn) {
      this.filteredEmployees.sort((a, b) => {
        let valueA = '';
        let valueB = '';

        if (this.sortColumn === 'firstName') {
          valueA = a.firstName.toLowerCase();
          valueB = b.firstName.toLowerCase();
        } else if (this.sortColumn === 'email') {
          valueA = a.email.toLowerCase();
          valueB = b.email.toLowerCase();
        } else if (this.sortColumn === 'department') {
          valueA = a.department.toLowerCase();
          valueB = b.department.toLowerCase();
        }

        if (valueA < valueB) {
          return this.sortDirection === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return this.sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }

  // NEW: This runs when a column header is clicked
  sortBy(column: string) {
    // If clicking the same column, toggle direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If clicking a different column, start with ascending
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Apply sorting to the filtered employees
    this.filteredEmployees.sort((a, b) => {
      let valueA = '';
      let valueB = '';

      // Get the values based on which column we're sorting
      if (column === 'firstName') {
        valueA = a.firstName.toLowerCase();
        valueB = b.firstName.toLowerCase();
      } else if (column === 'email') {
        valueA = a.email.toLowerCase();
        valueB = b.email.toLowerCase();
      } else if (column === 'department') {
        valueA = a.department.toLowerCase();
        valueB = b.department.toLowerCase();
      }

      // Compare and return based on direction
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}
