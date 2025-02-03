import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MaterialModule } from 'src/app/material.module';
import {
  CurrentInventoryDto,
  GetInventoryDto,
  InventoryService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-inventory-logs',
  standalone: true,
  imports: [
    MaterialModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    ProgressSpinnerModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory-logs.component.html',
  styleUrl: './inventory-logs.component.scss',
})
export class InventoryLogsComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'received',
    'begQty',
    'sales',
    'invBegTime',
    'invEndTime',
  ];
  dataSource: GetInventoryDto[] = [];
  loading = false;
  filterForm: FormGroup;

  constructor(
    private _inventoryService: InventoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group(
      {
        productName: [''],
        timeOpened: ['', [Validators.required]], // no changes here
        timeClosed: ['', [Validators.required]], // no changes here
      },
      {
        validators: this.dateRangeValidator, // Apply here at group level if necessary
      }
    );
    this.getAllInventory();
  }

  getAllInventory() {
    this.loading = true;
    this._inventoryService
      .getAllInventory(
        this.filterForm.get('timeOpened')?.value,
        undefined,
        undefined,
        this.filterForm.get('timeClosed')?.value,
        undefined,
        undefined
      )
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.isSuccess) {
            this.dataSource = res.data.items ?? [];
          }
        },
        error: (err) => {
          this.loading = false;
        },
      });
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const timeOpened = group.get('timeOpened')?.value;
    const timeClosed = group.get('timeClosed')?.value;

    // Check if the timeClosed is later than timeOpened
    if (timeOpened && timeClosed && timeClosed < timeOpened) {
      return { dateRangeInvalid: true };
    }
    return null; // Valid
  }

  onFilter() {
    if (this.filterForm.valid) {
      this.getAllInventory();
    }
  }
}
