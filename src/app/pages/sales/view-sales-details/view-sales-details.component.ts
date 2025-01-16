import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-view-sales-details',
  standalone: true,
  imports: [
    DialogModule,
        ReactiveFormsModule,
        MaterialModule,
        DropdownModule ,
        CommonModule,
        FormsModule,
  ],
  templateUrl: './view-sales-details.component.html',
  styleUrl: './view-sales-details.component.scss'
})
export class ViewSalesDetailsComponent {
  visible = false;
  constructor() {
    
  }

  show(){
    this.visible = true;
  }
  closeForm(){
    this.visible = false
  }
}
