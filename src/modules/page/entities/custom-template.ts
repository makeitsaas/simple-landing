import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CustomTemplateCommon } from '../../../shared/htmlify';

@Entity()
export class CustomTemplate extends CustomTemplateCommon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    html: string = '';

    @Column()
    css: string = '';

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updatedAt: Date;

    getHtml(): string {
        return `<div class="tpl-${this.id}">${this.html}</div>`;
    }

    getCss(): string {
        return this.css.replace(/selector/i, `.tpl-${this.id}`);
    }

}
