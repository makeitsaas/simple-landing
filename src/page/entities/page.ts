import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
    elementsData: Promise<HtmlElementData[]>
}
