import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm"
import { User } from "../users/user.entity"
import { Category } from "../category/category.entity"

@Entity()
export class Products {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: GLfloat

    @Column()
    description: string

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @Column()
    categoryId: number;
}