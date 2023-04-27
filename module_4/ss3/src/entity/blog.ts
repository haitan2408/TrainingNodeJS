import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Blog {
    @PrimaryColumn()
    private readonly id: number;

    @Column({ type: "varchar" })

    private title: string;

    @Column({ type: "longtext" })

    private content: string;


}
