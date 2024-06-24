import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: false })
    ppURL: string
}

export const UserSchema = SchemaFactory.createForClass(User);