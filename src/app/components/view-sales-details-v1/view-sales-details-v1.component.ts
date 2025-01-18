import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import {
  SalesHeaderDto,
  SalesService,
  ViewSalesHeaderDto,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-view-sales-details-v1',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './view-sales-details-v1.component.html',
  styleUrl: './view-sales-details-v1.component.scss',
})
export class ViewSalesDetailsV1Component implements OnInit {
  @Input() viewSalesHeaderDto: ViewSalesHeaderDto = new ViewSalesHeaderDto();
  visible = false;
  loading = false;
  filterText = '';
  isMobile = false;
  constructor(private _salesService: SalesService) {}
  ngOnInit(): void {
    this.checkScreenSize();
    // this.viewSales();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize(); // Check screen size on resize
  }

  checkScreenSize(): void {
    this.isMobile = window.matchMedia('(max-width: 410px)').matches;
    console.log(this.isMobile);
  }

  show(show?: ViewSalesHeaderDto) {
    if (show != null) {
      this.viewSalesHeaderDto = show;
    }
    this.visible = true;
  }
  closeForm() {
    this.visible = false;
  }
  // viewSales() {
  //   this._salesService.viewSales(this.salesHeaderId, this.filterText, null, null).subscribe({
  //     next: (res) => {
  //       if (
  //         res.isSuccess &&
  //         res.data &&
  //         res.data.items &&
  //         res.data.items.length > 0
  //       ) {
  //         this.viewSalesHeaderDto = res.data.items[0];
  //       } else {
  //         console.warn('No sales data available');
  //         this.viewSalesHeaderDto = new ViewSalesHeaderDto(); // Reset or handle empty state
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Error fetching sales data:', err);
  //     },
  //   });
  // }
}
