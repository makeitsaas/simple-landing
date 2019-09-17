import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MigrationVersion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    version: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

}
