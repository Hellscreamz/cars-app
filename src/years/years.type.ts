import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class YearsType {
  @Field({ nullable: true })
  year?: string;

  @Field({ nullable: true })
  make?: string;

  @Field({ nullable: true })
  model?: string;

  @Field({ nullable: true })
  trim?: string;

  @Field({ nullable: true })
  make_model_id?: string;

  @Field({ nullable: true })
  make_id?: string;

  @Field({ nullable: true })
  json?: string;
}
