import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany('SearchHistory', 'user', {
    cascade: true,
    onDelete: 'CASCADE',
  })
  searchHistories: any[];

  @OneToMany('RecommendationHistory', 'user', {
    cascade: true,
    onDelete: 'CASCADE',
  })
  recommendationHistories: any[];
}
