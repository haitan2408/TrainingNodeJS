import {Rectangle} from "./Rectangle";

export class Square extends Rectangle{
    constructor(name: string,
                width: number) {
        super(width, width, name);
    }

}
