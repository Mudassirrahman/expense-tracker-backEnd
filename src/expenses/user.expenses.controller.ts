import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, SetMetadata } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import { ExpenseGuard } from './guard/expense.guard';

@Controller('expenses')
export class UserExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @SetMetadata('roles', ['USER'])
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.createExpense(expense);
  }

  @Get()
  @SetMetadata('roles', ['USER'])
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAllExpenses();
  }
  @Get()
  @SetMetadata('roles', ['USER'])
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  async getAllExpenses() {
    const expenses = await this.expensesService.getAllExpenses();
    return expenses;
  }

  @Get(':id')
  @SetMetadata('roles', ['USER'])
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  async getExpenseById(@Param('id') id: number) {
    const expense = await this.expensesService.getExpenseById(id);
    return expense;
  }

}
