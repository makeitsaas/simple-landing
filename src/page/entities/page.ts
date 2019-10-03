import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { HtmlElementData } from './html-element-data';

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: false})
    ownerUserUuid: string;

    @OneToMany(type => HtmlElementData, element => element.page, {onDelete: 'CASCADE'})
    elementsData: Promise<HtmlElementData[]>;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;
}
