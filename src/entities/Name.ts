import { ObjectType, Field, ID } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";

@ObjectType({ description: "The Name model" })
export class Name {
  @Field(() => ID)
  id: String;

  @Field()
  @DBProperty({ required: true })
  name: String;
}

export const NameModel = getModelForClass(Name);
