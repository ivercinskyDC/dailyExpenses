import {Component, OnInit} from '@angular/core';
import {GoogleSheetsService} from "./GoogleSheets.service";
import {Expense} from "./Expenses.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title :string = 'Expenses!';
  expenses :Expense[];
  new_expense :Expense = {date: "", amount:0, location: "", id:0};
  constructor(private  googleSheetsService: GoogleSheetsService) { }

  ngOnInit() {
    this.getExpenses();
  }
  getExpenses() : void {
    this.expenses = this.googleSheetsService.getExpenses()
  }

  handleExpenseSubmit() :void {
    this.new_expense.id = this.expenses.length + 1;
    var newone :Expense = {...this.new_expense};
    newone.id = this.expenses.length + 1;
    console.log(newone);
    this.expenses.push(newone);
    this.new_expense.amount = 0;
    this.new_expense.location = "";
    this.new_expense.date = "";

  }
}
