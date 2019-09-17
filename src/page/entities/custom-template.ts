import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class CustomTemplate {
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
