import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreateInput } from 'src/graphql';
import { InsertResult, Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['owner', 'mention', 'mentionBy'],
    });
  }

  findById(id: number): Promise<Post> {
    return this.postRepository.findOne(id, {
      relations: ['owner', 'mention', 'mentionBy'],
    });
  }

  async create(post: PostCreateInput): Promise<Post> {
    const newPost: Post = this.postRepository.create({
      message: post.message,
      mention: {
        id: post.mention,
      },
      owner: {
        id: post.ownerId,
      },
    });

    return this.postRepository.save(newPost);
  }
}
