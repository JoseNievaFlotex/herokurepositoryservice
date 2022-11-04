import { Entity,CreateDateColumn, Column, PrimaryGeneratedColumn,BeforeInsert, BeforeUpdate } from 'typeorm';
import { hash } from 'bcrypt';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  typeuser: string;

  @Column({ type: 'bit', default: true })
  estado: Boolean;

  @CreateDateColumn({ name: 'created_at', type: 'datetime'  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}