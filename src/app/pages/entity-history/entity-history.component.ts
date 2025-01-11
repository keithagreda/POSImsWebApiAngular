import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { MaterialModule } from 'src/app/material.module';
import {
  EntityHistoryDto,
  EntityHistoryService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-entity-history',
  standalone: true,
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    DialogModule,
    SidebarModule,
  ],
  templateUrl: './entity-history.component.html',
  styleUrl: './entity-history.component.scss',
})
export class EntityHistoryComponent {
  displayedColumns: string[] = [
    'entityname',
    'action',
    'changes',
    'changeTime',
    'changedBy',
  ];
  loading = false;
  dataSource: EntityHistoryDto[] = [];
  filterText = '';
  constructor(private _entityHistoryService: EntityHistoryService) {}
  ngOnInit(): void {
    this.getEntityHistory();
  }

  getEntityHistory() {
    this._entityHistoryService
      .getAllEntityHistory(this.filterText, null, null)
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.dataSource = res.data.items ?? [];
            console.log(this.dataSource);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
