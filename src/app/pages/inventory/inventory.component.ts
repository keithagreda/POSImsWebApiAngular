import { Component, ViewChild } from '@angular/core';
import { CurrentStocksComponent } from 'src/app/components/current-stocks/current-stocks.component';
import { MaterialModule } from 'src/app/material.module';
import { InventoryService } from 'src/app/services/nswag/nswag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MaterialModule, CurrentStocksComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  @ViewChild(CurrentStocksComponent)
  currentStocksComponent!: CurrentStocksComponent;
  constructor(private _inventoryService: InventoryService) {}

  closeInventory() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with this action?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the confirmed action here
        this._inventoryService.closeInventory().subscribe({
          next: (res) => {
            if (res.isSuccess) {
              Swal.fire(
                'Confirmed!',
                'Your action has been confirmed.',
                'success'
              );
              this.currentStocksComponent.getCurrentStocks();
              return;
            }
            Swal.fire(
              'Error!',
              'An error occurred while processing your request.',
              'error'
            );
          },
          error: (err) => {
            Swal.fire(
              'Error!',
              'An error occurred while processing your request.',
              'error'
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Handle the cancelled action here
        Swal.fire('Cancelled', 'Your action has been cancelled.', 'error');
      }
    });
  }
}
