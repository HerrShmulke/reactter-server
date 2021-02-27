import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findById(id: number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  async create(post: CreatePostDto): Promise<InsertResult> {
    const newPost: Post = this.postRepository.create();
    newPost.message = post.message;

    return this.postRepository.insert(newPost);
  }
}
