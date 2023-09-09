// import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, SetMetadata } from '@nestjs/common';
// import { ExpensesService } from './expenses.service';
// import { Expense } from './entities/expense.entity';
// import { RolesGuard } from 'src/authguard/role.guard';
// import { Role } from 'src/decorators/roles.decorator';

// @Controller('admin/expenses') // Define a separate route for admin expenses
// @UseGuards(RolesGuard) // Apply the roles guard to the entire controller
// export class AdminExpensesController {
//   constructor(private readonly expensesService: ExpensesService) {}

//   @Post()
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   create(@Body() expense: Expense): Promise<Expense> {
//     // Implement create for administrators
//     return this.expensesService.createExpense(expense);
//   }

//   @Get()
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   findAll(): Promise<Expense[]> {
//     // Implement find all for administrators
//     return this.expensesService.findAllExpenses();
//   }

//   @Get(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   async getExpenseById(@Param('id') id: number) {
//     // Implement getExpenseById for administrators
//     return this.expensesService.getExpenseById(id);
//   }

//   @Put(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
//     // Implement update for administrators
//     return this.expensesService.updateExpense(id, expense);
//   }

//   @Delete(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   remove(@Param('id') id: number): Promise<void> {
//     // Implement delete for administrators
//     return this.expensesService.deleteExpense(id);
//   }

//   // Implement other admin-specific CRUD operations
// }

// admin-expenses.controller.ts
// import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
// import { ExpensesService } from './expenses.service';
// import { Expense } from './entities/expense.entity';
// import { RolesGuard } from 'src/authguard/role.guard';
// import { Role } from 'src/decorators/roles.decorator';

// @Controller('admin/expenses') // Define a separate route for admin expenses
// @UseGuards(RolesGuard) // Apply the roles guard to the entire controller
// export class AdminExpensesController {
//   constructor(private readonly expensesService: ExpensesService) {}

//   @Post()
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   create(@Body() expense: Expense): Promise<Expense> {
//     // Implement create for administrators
//     return this.expensesService.createExpense(expense);
//   }

//   @Get()
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   findAll(): Promise<Expense[]> {
//     // Implement find all for administrators
//     return this.expensesService.findAllExpenses();
//   }

//   @Get(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   async getExpenseById(@Param('id') id: number) {
//     // Implement getExpenseById for administrators
//     return this.expensesService.getExpenseById(id);
//   }

//   @Put(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
//     // Implement update for administrators
//     return this.expensesService.updateExpense(id, expense);
//   }

//   @Delete(':id')
//   @Role('admin') // Use custom decorator to specify the role required for this route
//   remove(@Param('id') id: number): Promise<void> {
//     // Implement delete for administrators
//     return this.expensesService.deleteExpense(id);
//   }

//   // Implement other admin-specific CRUD operations
// }

import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './entities/expense.entity';
import { RolesGuard } from 'src/authguard/role.guard';
import { Role } from 'src/decorators/roles.decorator';
import { AdminAccessMiddleware } from 'src/middlewares/admin-access.middleware';

@Controller('admin/expenses') // Define a separate route for admin expenses
@UseGuards(RolesGuard)
export class AdminExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @Role('admin')
  @UseGuards(AdminAccessMiddleware) // Use UseGuards with the middleware here
  create(@Body() expense: Expense): Promise<Expense> {
    return this.expensesService.createExpense(expense);
  }

  @Get()
  @Role('admin')
  @UseGuards(AdminAccessMiddleware) // Use UseGuards with the middleware here
  findAll(): Promise<Expense[]> {
    return this.expensesService.findAllExpenses();
  }

  @Get(':id')
  @Role('admin')
  @UseGuards(AdminAccessMiddleware) // Use UseGuards with the middleware here
  async getExpenseById(@Param('id') id: number) {
    return this.expensesService.getExpenseById(id);
  }

  @Put(':id')
  @Role('admin')
  @UseGuards(AdminAccessMiddleware) // Use UseGuards with the middleware here
  update(@Param('id') id: number, @Body() expense: Expense): Promise<Expense> {
    return this.expensesService.updateExpense(id, expense);
  }

  @Delete(':id')
  @Role('admin')
  @UseGuards(AdminAccessMiddleware) // Use UseGuards with the middleware here
  remove(@Param('id') id: number): Promise<void> {
    return this.expensesService.deleteExpense(id);
  }

  // Implement other admin-specific CRUD operations
}
