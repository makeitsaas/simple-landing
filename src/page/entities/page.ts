import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HtmlElementData } from './html-element-data';

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => HtmlElementData, element => element.page, {onDelete: 'CASCADE'})
    elementsData: Promise<HtmlElementData[]>
}
