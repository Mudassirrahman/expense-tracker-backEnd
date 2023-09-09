import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';

@Controller('expenses')
export class UserExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.createExpense(expense);
  }

  @Get()
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAllExpenses();
  }
  @Get()
  async getAllExpenses() {
    const expenses = await this.expensesService.getAllExpenses();
    return expenses;
  }

  @Get(':id')
  async getExpenseById(@Param('id') id: number) {
    const expense = await this.expensesService.getExpenseById(id);
    return expense;
  }

}
