import { Entity, BaseEntity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { ObjectID } from 'mongodb';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
	@Field(() => ID)
	@ObjectIdColumn()
	id: ObjectID;

	@Field()
	@Column()
	title: string;

	@Field()
	@Column()
	body: string;

	@Field({ nullable: true })
	@Column()
	image?: string;
}
