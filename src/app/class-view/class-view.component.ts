import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeNGConfig} from "primeng/api";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-class-view',
  standalone: true,
  imports: [CommonModule],
  providers: [FormBuilder, PrimeNGConfig, HttpClient],
  templateUrl: './class-view.component.html',
  styleUrl: './class-view.component.css'
})
export class ClassViewComponent implements OnInit{
  classForm: FormGroup;
  studentForm: FormGroup;
  promoteForm: FormGroup;
  practiceForm: FormGroup;
  gradeForm: FormGroup;
  classes = [];
  students = [];
  selectedClass: any;
  selectedAssignment: any;

  readonly BASE_URL_CLASS = 'http://localhost:8080/classes';
  readonly BASE_URL_STUDENT = 'http://localhost:8080/users';
  readonly BASE_URL_FILE = 'http://localhost:8080/files';

  private fb = inject(FormBuilder)
  private primengConfig = inject(PrimeNGConfig)
  private http = inject(HttpClient)

  ngOnInit(): void {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      // Include other necessary form controls for class creation
    });

    this.studentForm = this.fb.group({
      studentName: ['', Validators.required],
      studentEmail: ['', [Validators.required, Validators.email]],
      // Include other necessary form controls for adding a student
    });

    this.assignmentForm = this.fb.group({
      assignmentName: ['', Validators.required],
      dueDate: ['', Validators.required],
      // Include other necessary form controls for creating an assignment
    });

    this.gradeForm = this.fb.group({
      grade: ['', Validators.required],
      // Include other necessary form controls for grading an assignment
    });

    // Load initial data, such as existing classes, students, and assignments
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.http.get(`${this.BASE_URL_FILE}`).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createClass(): void {
    if (this.classForm.valid) {
      this.http.post(`${this.BASE_URL_CLASS}/add`, this.classForm.value).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  addStudent(): void {
    if (this.studentForm.valid) {
      this.http.post(`${this.BASE_URL_STUDENT}/classroom`, { ...this.studentForm.value, classId: this.selectedClass.id }).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  promoteToCoTeacher(studentId: string): void {
    this.http.put(`${this.BASE_URL_CLASS}/add-co-teacher`, { ...this.promoteForm.value, classId: this.selectedClass.id }).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createAssignment(): void {
    if (this.practiceForm.valid) {
      this.http.post(`${this.BASE_URL_CLASS}/add-practice`, { ...this.practiceForm.value, classId: this.selectedClass.id }).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  gradeAssignment(): void {
    if (this.gradeForm.valid && this.selectedAssignment) {
      this.http.put(`${this.BASE_URL_FILE}/grade`, this.gradeForm.value).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
