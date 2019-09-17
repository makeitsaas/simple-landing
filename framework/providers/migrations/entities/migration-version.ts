import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class MigrationVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

}
