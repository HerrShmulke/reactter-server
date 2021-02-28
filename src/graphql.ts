
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class PostCreateInput {
    message: string;
}

export class UserRegisterInput {
    name: string;
    password: string;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createPost(postCreateInput?: PostCreateInput): boolean | Promise<boolean>;

    abstract registerUser(userRegisterInput?: UserRegisterInput): boolean | Promise<boolean>;
}

export class Post {
    id: string;
    message: string;
}

export class User {
    id: string;
    name: string;
    avatarUrl?: string;
}
