import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CreateOrEditStorageLocComponent } from './create-or-edit-storage-loc/create-or-edit-storage-loc.component';
import {
  GetStorageLocationForDropDownDto,
  StorageLocationService,
} from 'src/app/services/nswag/nswag.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-storage-location',
  standalone: true,
  imports: [
    MaterialModule,
    DialogModule,
    CommonModule,
    CreateOrEditStorageLocComponent,
  ],
  templateUrl: './storage-location.component.html',
  styleUrl: './storage-location.component.scss',
})
export class StorageLocationComponent implements OnInit {
  @ViewChild(CreateOrEditStorageLocComponent)
  createOrEditStorageLocComponent!: CreateOrEditStorageLocComponent;
  displayedColumns1: string[] = ['name', 'action'];
  storageLocation: GetStorageLocationForDropDownDto[] = [];
  visible = false;
  constructor(
    private _storageLocation: StorageLocationService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getStorageLocation();
  }

  getStorageLocation() {
    this._storageLocation.getAllStorageLocation().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.storageLocation = res.data;
        }
        if (!res.isSuccess) {
          console.warn(res.message);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  showCreateModal() {
    this.createOrEditStorageLocComponent.show();
  }
}
