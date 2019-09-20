import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomTemplate } from './custom-template';
import { Page } from './page';

@Entity()
export class HtmlElementData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column({type: 'json', nullable: false})
    settings: any = {};

    @Column({type: 'json', nullable: false})
    fields: any = {};

    @Column({type: 'json', nullable: false})
    translations: any = {};

    @Column({length: 4094})
    css: string = '';

    @ManyToOne(type => CustomTemplate, {nullable: true})
    customTemplate?: Promise<CustomTemplate>;

    @ManyToOne(type => HtmlElementData, {nullable: true})
    parent?: Promise<HtmlElementData|void>;

    @OneToMany(type => HtmlElementData, element => element.parent, {onDelete: 'SET NULL'})
    children: Promise<HtmlElementData[]>;

    @ManyToOne(type => Page, {cascade: true, nullable: false})
    page: Promise<Page>;
}
