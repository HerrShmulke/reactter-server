import * as argon2 from 'argon2';
import { Post } from 'src/post/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany((type) => Post, (post) => post.owner)
  @JoinTable()
  ownedPosts: Post[];

  @ManyToMany((type) => Post)
  @JoinTable()
  postsLikes: Post[];

  @Column({ name: 'password', nullable: false })
  private _password: string;

  async setPassword(pass: string) {
    this._password = await argon2.hash(pass);
  }

  async getPassword(): Promise<string> {
    return this._password;
  }
}
