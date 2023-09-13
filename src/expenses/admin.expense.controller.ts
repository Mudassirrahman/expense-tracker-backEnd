import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import {} from '../authguard/user-expense.guard';
import { AdminAuthGuard } from 'src/authguard/admin-expense.guard';

@Controller('admin/expenses') // Define a separate route for admin expenses
export class AdminExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.createExpense(expense);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAllExpenses();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  async getExpenseById(@Param('id') id: number) {
    return this.expensesService.getExpenseById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
    return this.expensesService.updateExpense(id, expense);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @SetMetadata('roles', ['ADMIN'])
  remove(@Param('id') id: number): Promise<void> {
    return this.expensesService.deleteExpense(id);
  }

}
