import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CustomTemplate } from './custom-template';
import { Page } from './page';
import { HtmlElementDataCommon } from '../../shared/htmlify';

@Entity()
export class HtmlElementData extends HtmlElementDataCommon {
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

    @ManyToOne(type => CustomTemplate, {eager: true, nullable: true})
    customTemplate: CustomTemplate | void;

    @ManyToOne(type => HtmlElementData, {nullable: true})
    parent: HtmlElementData | void;

    @Column()
    position: number = 0;   // position as a child of parent attribute

    @OneToMany(type => HtmlElementData, element => element.parent, {onDelete: 'SET NULL'})
    children: Promise<HtmlElementData[]>;

    @ManyToOne(type => Page, {cascade: true, nullable: false})
    page: Promise<Page>;
}
