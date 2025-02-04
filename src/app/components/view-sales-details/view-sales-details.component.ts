import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import {
  SalesService,
  ViewSalesHeaderDto,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-view-sales-details',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './view-sales-details.component.html',
  styleUrls: ['./view-sales-details.component.scss'],
})
export class ViewSalesDetailsComponent implements OnInit {
  visible = false;
  loading = false;
  filterText = '';
  isMobile = false;
  isPrint = false;
  viewSalesHeaderDto: ViewSalesHeaderDto[] = [];
  constructor(private _salesService: SalesService) {}
  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.checkScreenSize();
    this.viewSales();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize(); // Check screen size on resize
  }

  checkScreenSize(): void {
    this.isMobile = window.matchMedia('(max-width: 410px)').matches;
    console.log(this.isMobile);
  }

  viewSales() {
    this._salesService.viewSales(null, this.filterText, null, null).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log(res.data);
          this.viewSalesHeaderDto = res.data.items ?? [];
        }
      },
      error: (err) => {},
    });
  }

  show() {
    this.visible = true;
  }
  closeForm() {
    this.visible = false;
  }

  printDiv(divId: string) {
    const printElement = document.getElementById(divId);
    if (!printElement) {
      console.log('Element with id: ' + divId + ' not found');
      return;
    }
    const printContents = printElement.innerHTML;
    const originalContents = document.body.innerHTML;

    const styles = `
    <style>
      .sales-card {
        width: 360px;
        height: 300px;
        margin: 0 auto;
      }
    </style>
  `;

  document.body.innerHTML = `
    <html>
      <head>
        <title>Print</title>
        ${styles}
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `;
  setTimeout(() => {
    window.print();
    this.isPrint = false;
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore the original content
  }, 5000);
  }
}
