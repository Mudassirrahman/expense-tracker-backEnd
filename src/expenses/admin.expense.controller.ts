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
import { RolesGuard } from 'src/authguard/role.guard';
import { Role } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/authguard/jwt.guard';
import { ExpenseGuard } from './guard/expense.guard';

@Controller('admin/expenses') // Define a separate route for admin expenses
export class AdminExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Role('admin')
  create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.createExpense(expense);
  }

  @Get()
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Role('admin')
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAllExpenses();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Role('admin')
  async getExpenseById(@Param('id') id: number) {
    return this.expensesService.getExpenseById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Role('admin')
  update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
    return this.expensesService.updateExpense(id, expense);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, ExpenseGuard)
  @SetMetadata('roles', ['ADMIN'])
  @Role('admin')
  remove(@Param('id') id: number): Promise<void> {
    return this.expensesService.deleteExpense(id);
  }

  // Implement other admin-specific CRUD operations
}
