import { Model } from "./model";

export class User extends Model {
  id?: String;
  name?: String;
  email?: String;
  createdAt?: Date;
}