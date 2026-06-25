import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
  // Controls whether the modal is visible
  isVisible: boolean = false;

  // The employee to be deleted (passed from parent)
  employeeName: string = '';
  private employeeToDelete: Employee | null = null;

  // @Output() sends events BACK to the parent component
  @Output() confirmed = new EventEmitter<Employee>();
  @Output() cancelled = new EventEmitter<void>();

  // This method is called by the parent to show the modal
  show(employee: Employee) {
    this.employeeToDelete = employee;
    this.employeeName = `${employee.firstName} ${employee.lastName}`;
    this.isVisible = true;
  }

  // Called when user clicks "Delete"
  onConfirm() {
    if (this.employeeToDelete) {
      this.confirmed.emit(this.employeeToDelete); // Send employee back to parent
    }
    this.close();
  }

  // Called when user clicks "Cancel" or backdrop
  onCancel() {
    this.cancelled.emit(); // Notify parent that user cancelled
    this.close();
  }

  // Close the modal
  private close() {
    this.isVisible = false;
    this.employeeToDelete = null;
    this.employeeName = '';
  }
}
