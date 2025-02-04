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
import { DateTime } from 'luxon';
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
        timeOpened: [null], // no changes here
        timeClosed: [null], // no changes here
      },
      {
        validators: this.dateRangeValidator, // Apply here at group level if necessary
      }
    );
    // this.setDateTimeFilterToCurrDay();
    this.getAllInventory();
  }

  setDateTimeFilterToCurrDay() {
    this.filterForm.get('timeOpened')?.setValue(new Date());
    this.filterForm.get('timeClosed')?.setValue(new Date());
  }

  getAllInventory() {
    const timeOpened = this.filterForm.get('timeOpened')?.value;
    const timeClosed = this.filterForm.get('timeClosed')?.value;

    this.loading = true;
    this._inventoryService
      .getAllInventory(
        this.filterForm.get('productName')?.value,
        timeOpened,
        // from, //
        undefined,
        undefined,
        timeClosed,
        // to, //
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

    if (timeOpened == undefined && timeClosed == undefined) {
      return null; // Valid
    }

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

  clearDates() {
    this.filterForm.get('timeOpened')?.setValue(null);
    this.filterForm.get('timeClosed')?.setValue(null);
    const timeOpened = this.filterForm.get('timeOpened')?.value;
    const timeClosed = this.filterForm.get('timeClosed')?.value;
    console.log(timeOpened);
    console.log(timeClosed);
  }
}
