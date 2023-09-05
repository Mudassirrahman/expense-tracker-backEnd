import { UserEntity } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  subName: string;

  @Column()
  date: Date;

  @Column()
  quantity: string;

  @Column()
  where: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  user: UserEntity;
}
