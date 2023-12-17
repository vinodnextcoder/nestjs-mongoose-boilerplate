import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type UserDocument = HydratedDocument<RefresToken>;

@Schema({timestamps: true})
export class RefresToken {
  @Prop({ type : String })
  user_id: string;
  @Prop({ type : Boolean })
  is_revoked: Boolean;
  @Prop({ type : Date })
  expires: Date;
  @Prop({default: now()})
  createdAt: Date;
  @Prop({default: now()})
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(RefresToken);