import {Schema, model} from "mongoose";

interface IPhoneBook {

    name: string;

    address: string;

    email: string;

    phone: string

}



const phoneBookSchema = new Schema<IPhoneBook>({

    name: String,

    address: String,

    email: String,

    phone: String

})



const PhoneBook = model<IPhoneBook>('PhoneBook', phoneBookSchema);



export { PhoneBook };
