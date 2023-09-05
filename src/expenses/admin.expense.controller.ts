import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';

@Controller('admin/expenses') // Define a separate route for admin expenses
export class AdminExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() expense: Expense): Promise<Expense> {
    // Implement create for administrators
    return this.expensesService.createExpense(expense);
  }

  @Get()
  findAll(): Promise<Expense[]> {
    // Implement find all for administrators
    return this.expensesService.findAllExpenses();
  }

  @Get(':id')
  async getExpenseById(@Param('id') id: number) {
    // Implement getExpenseById for administrators
    return this.expensesService.getExpenseById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
    // Implement update for administrators
    return this.expensesService.updateExpense(id, expense);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    // Implement delete for administrators
    return this.expensesService.deleteExpense(id);
  }

  // Implement other admin-specific CRUD operations
}
