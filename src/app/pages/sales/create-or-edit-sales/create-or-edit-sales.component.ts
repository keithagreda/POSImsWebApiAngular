import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-create-or-edit-sales',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
  ],
  templateUrl: './create-or-edit-sales.component.html',
  styleUrl: './create-or-edit-sales.component.scss',
})
export class CreateOrEditSalesComponent {}
