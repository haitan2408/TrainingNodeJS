import { Schema, model } from "mongoose";

interface IUser {
    username: string;
    password: string;
    google: {
        id: {
            type: string,
        },
    },
    role: string;
}

const userSchema = new Schema<IUser>({
    google: {
        id: {
            type: String
        }
    },
    username: String,
    password: String,
    role: String
})

const UserModel = model<IUser>('User', userSchema);

export { UserModel };
