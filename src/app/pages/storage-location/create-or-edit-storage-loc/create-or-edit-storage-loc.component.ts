import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MaterialModule } from 'src/app/material.module';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageLocationService } from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-create-or-edit-storage-loc',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    MaterialModule,
    DropdownModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './create-or-edit-storage-loc.component.html',
  styleUrl: './create-or-edit-storage-loc.component.scss',
})
export class CreateOrEditStorageLocComponent {
  @Output() modalSave = new EventEmitter<any>();
  visible = false;
  createStorageLoc: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _storageLocationService: StorageLocationService,
    private _loadingService: LoadingService,
    private _toastr: ToastrService
  ) {
    this.createStorageLoc = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  show() {
    this.visible = true;
  }

  close() {
    this.visible = false;
    this.createStorageLoc.reset();
  }

  save() {
    this._loadingService.show();
    this._storageLocationService
      .createStorageLocation(this.createStorageLoc.value)
      .subscribe({
        next: (res) => {
          console.log('yow', res);
          this._loadingService.hide();
          if (!res.isSuccess) {
            this._toastr.error(res.message);
            return;
          }
          this._toastr.success(res.message);
          this.visible = false;
          this.modalSave.emit(null);
        },
        error: (err) => {
          this._loadingService.hide();
          this._toastr.error('Something went wrong... ' + err);
        },
      });
  }
}
