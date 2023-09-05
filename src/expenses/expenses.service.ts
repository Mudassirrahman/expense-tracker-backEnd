// src/expenses/expenses.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expensesRepository: Repository<Expense>,
  ) {}

  async createExpense(expense: Expense): Promise<Expense> {
    return this.expensesRepository.save(expense);
  }

  async findAllExpenses(): Promise<Expense[]> {
    return this.expensesRepository.find();
  }

  async getAllExpenses(): Promise<Expense[]> {
    return await this.expensesRepository.find();
  }

  async getExpenseById(id: number): Promise<Expense | undefined> {
    // Create FindOneOptions with where clause to find by ID
    const options: FindOneOptions<Expense> = {
      where: { id }, // Find by ID
    };
    return await this.expensesRepository.findOne(options);
  }

  async deleteExpense(id: number): Promise<void> {
    const expense = await this.getExpenseById(id);
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    await this.expensesRepository.remove(expense);
  }

  async updateExpense(id: number, updatedExpense: Expense): Promise<Expense> {
    const expense = await this.getExpenseById(id);
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    // Update the fields you want from updatedExpense
    if (updatedExpense.type) {
      expense.type = updatedExpense.type;
    }
    if (updatedExpense.name) {
      expense.name = updatedExpense.name;
    }
    // Update other fields as needed

    // Save the updated expense
    return this.expensesRepository.save(expense);
  }

  // Implement other CRUD methods (update, delete, find by ID) here
}
