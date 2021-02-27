
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreatePostInput {
    message: string;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;
}

export abstract class IMutation {
    abstract createPost(createPostInput?: CreatePostInput): boolean | Promise<boolean>;
}

export class Post {
    id: string;
    message: string;
}
