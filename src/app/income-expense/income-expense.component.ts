import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: [
  ],
})
export class IncomeExpenseComponent implements OnInit {

  incomeForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
