// src/expenses/expenses.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expenses.service';
import { UserExpensesController } from './user.expenses.controller';
import { Expense } from './entities/expense.entity';
import { AdminExpensesController } from './admin.expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesService],
  controllers: [UserExpensesController, AdminExpensesController],
})
export class ExpensesModule {}
