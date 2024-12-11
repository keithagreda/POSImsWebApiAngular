import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-or-edit-product',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './create-or-edit-product.component.html',
  styleUrl: './create-or-edit-product.component.scss',
})
export class CreateOrEditProductComponent {
  visible = false;
  constructor() {}
  closeForm() {
    this.visible = false;
  }

  show() {
    this.visible = true;
  }
}
