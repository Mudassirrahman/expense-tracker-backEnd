import { EntityBase } from 'src/base/base.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class UserEntity extends EntityBase {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @OneToMany(() => Expense, (expense) => expense.user)
  expenses: Expense[];

  @Column()
  role: string;


}
