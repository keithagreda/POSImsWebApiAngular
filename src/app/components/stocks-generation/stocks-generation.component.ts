import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import {
  GetStocksGenerationDto,
  StocksService,
} from 'src/app/services/nswag/nswag.service';

@Component({
  selector: 'app-stocks-generation',
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './stocks-generation.component.html',
  styleUrl: './stocks-generation.component.scss',
})
export class StocksGenerationComponent implements OnInit {
  displayedColumns1: string[] = ['productName', 'generatedQty', 'difference'];
  dataSource1: GetStocksGenerationDto[] = [];
  constructor(private _stocksService: StocksService) {}
  ngOnInit(): void {
    this._stocksService.getStocksGeneration(4).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.dataSource1 = res.data;
        }
      },
      error: (err) => {},
    });
  }
}
