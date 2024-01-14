import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import * as dayjs from 'dayjs'

export type AccountDocument = HydratedDocument<Account>;

@Schema({ timestamps: true })
export class Account extends Document {
  @Prop({ required: true })
  public accountId: number;

  @Prop({ required: true })
  public accessToken: string;

  @Prop({ required: true })
  public refreshToken: string;

  @Prop({ required: true })
  public subdomain: string;

  @Prop({
    required: true,
    default: true
  })
  public installed: boolean;

  @Prop({
    required: true,
    default: dayjs().format('YYYY-MM-DD')
  })
  public startUsingDate: string;

  @Prop({
    required: true,
    default: dayjs().add(15, 'days').format('YYYY-MM-DD')
  })
  public finishUsingTime: string;

  @Prop({
    required: true,
    default: true
  })
  public isTestPeriod: boolean;

  @Prop({
    required: true,
    default: false
  })
  public isPaid: boolean;

  @Prop({
    required: true,
    default: true
  })
  public isActive: boolean;

}

export const AccountSchema = SchemaFactory.createForClass(Account);