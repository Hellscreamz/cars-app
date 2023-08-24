import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class VinInput {
  @Field()
  vin: string;
}

@ObjectType()
export class MakeType {
  @Field()
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class MakeModelType {
  @Field()
  id: number;

  @Field()
  make_id: number;

  @Field()
  name: string;

  @Field()
  make: MakeType;
}

@ObjectType()
export class TrimType {
  @Field()
  id: number;

  @Field()
  make_model_id: number;

  @Field()
  year: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  msrp: number;

  @Field()
  invoice: number;

  @Field()
  created: string;

  @Field()
  modified: string;

  @Field(() => MakeModelType)
  make_model: MakeModelType;
}

@ObjectType()
export class SpecsType {
  @Field()
  body_class: string;

  @Field()
  drive_type: string;

  @Field()
  engine_model: string;

  @Field()
  fuel_type_primary: string;

  @Field()
  manufacturer_name: string;

  @Field()
  steering_location: string;

  @Field()
  transmission_speeds: string;

  @Field()
  transmission_style: string;

  @Field()
  vehicle_type: string;
}

@ObjectType()
export class VinType {
  @Field()
  vin: string;

  @Field(() => [TrimType])
  trims: TrimType[];

  @Field(() => SpecsType)
  specs: SpecsType;
}
