import { Binnacle } from "src/binnacle/entities/binnacle.entity";
import { Direction } from "src/direction/entities/direction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity ()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;
    
    @Column("text")
    lastname: string;
            
    @Column("text")
    password: string;

    @Column("text", {unique:true})
    email: string;

    @ManyToOne (   
        () => Direction,
        (direction) => direction.users         
    )
    direction?: Direction;

    @Column("text")
    role: string;
     
    @OneToMany (
        () => Binnacle,
        (binnacle) => binnacle.user
    )
    binnacles: Binnacle;
}
