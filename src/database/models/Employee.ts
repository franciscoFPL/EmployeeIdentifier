import Mongoose from "../MongoDB";
import { hash } from "bcrypt";

import { NextFunction } from "express";

const EmployeeSchema = new Mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      select: true
    },
    last_name: {
      type: String,
      required: true,
      select: true
    },
    email: {
      type: String,
      required: true,
      select: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    age: {
      type: Number,
      required: true,
      select: true
    },
    salary: {
      type: Number,
      required: true,
      select: true
    },
    occupation: {
      type: String,
      required: true,
      select: true
    },
    employer: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      select: true
    }
  },
  {
    timestamps: true
  }
).index({ first_name: "text" });

EmployeeSchema.pre("save", async function(
  this: any,
  next: NextFunction
): Promise<void> {
  const password: string = this.get("password");

  if (password && this.isModified("password")) {
    this.set("password", await hash(password, 10));
  }

  next();
});

export interface IEmployee extends Mongoose.Document {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  occupation: string;
  age: number;
  salary: number;
  employer: Mongoose.Types.ObjectId;
}

export const Employee: Mongoose.Model<IEmployee> = Mongoose.model<IEmployee>(
  "Employee",
  EmployeeSchema
);