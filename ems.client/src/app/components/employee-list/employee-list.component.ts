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

  // NEW: Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  totalPages: number = 0;

  // NEW: Loading state
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  //loadEmployees() {
  //  this.employeeService.getEmployees().subscribe(data => {
  //    this.employees = data;
  //    this.filteredEmployees = data;
  //  });
  //}

  loadEmployees() {
    this.isLoading = true; // Show spinner
    this.employeeService.getEmployees(
      this.currentPage,
      this.pageSize,
      this.searchTerm,
      this.sortColumn,
      this.sortDirection
    ).subscribe({
      next: (result) => {
        this.employees = result.data;
        this.filteredEmployees = result.data;
        this.totalRecords = result.totalRecords;
        this.totalPages = result.totalPages;
        this.isLoading = false; // Hide spinner on success
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.isLoading = false; // Hide spinner even on error
      }
    });
  }


  deleteEmployee(id: number) {
    if (confirm('Are you sure?')) {
      this.isLoading = true; // NEW: Show spinner while deleting;
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          // If we delete the last item on the page, go to previous page
          if (this.employees.length === 1 && this.currentPage > 1) {
            this.currentPage--;
          }
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onSearch() {
    this.currentPage = 1; // Reset to first page when searching
    this.loadEmployees(); // Reload from backend with new search term
  }

  // NEW: This runs when a column header is clicked
  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.loadEmployees(); // Reload from backend with new sort
  }

  // NEW: Reset the sort to original order
  resetSort() {
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.loadEmployees(); // Reload from backend without sort
  }

  // NEW: Go to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadEmployees();
    }
  }

  // NEW: Go to previous page
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  // NEW: Go to next page
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  // NEW: Get array of page numbers for display
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at a time

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // NEW: Helper method for template
  getEndRecord(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }

}
