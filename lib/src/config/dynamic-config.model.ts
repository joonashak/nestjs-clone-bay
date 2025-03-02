import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

/**
 * @group Types
 */
@Schema({ collection: "dynamic-config" })
export class DynamicConfig {
  @Prop()
  allowedCharacters: number[];

  @Prop()
  allowedCorporations: number[];

  @Prop()
  allowedAlliances: number[];

  /**
   * Controls new user registration.
   *
   * When an unknown user successfully authenticates through SSO, they are
   * registered and a new user is created within `nestjs-clone-bay`, if this is
   * set to `true`. Authentication allowlists must still be satisfied.
   *
   * Disabling new user registration does not prevent users from registering
   * alts.
   *
   * _Default: `true`_
   */
  @Prop({ default: true })
  allowNewUsers: boolean;

  /**
   * Controls whether authentication allowlists are applied to existing users.
   *
   * Turning this _OFF_ effectively makes the authentication allowlists filter
   * who can register as a new user.
   *
   * When this is _ON_, the restriction will also be imposed on local logins,
   * not only on SSO authentication. However, this is applied only on the main
   * character, possible alts are not checked.
   *
   * _Default: `false`_
   */
  @Prop({ default: false })
  applyAllowlistsToExistingUsers: boolean;
}

export type DynamicConfigDocument = DynamicConfig & mongoose.Document;
export const DynamicConfigSchema = SchemaFactory.createForClass(DynamicConfig);
