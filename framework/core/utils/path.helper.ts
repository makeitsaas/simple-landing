import * as fs from 'fs';

export const PathHelper = {
    getSrcDirectory(): string {
        return process.cwd() + '/src';
    },
    getFrameworkDirectory(): string {
        return `${__dirname}/../..`;
    },
    getSubdirectories(path: string): string[] {
        return fs.readdirSync(path)
            .map(subdir => `${path}/${subdir}`).filter(name => !/\...?.?$/.test(name))
    },
    getSrcModulesDirectories(): string[] {
        return PathHelper.getSubdirectories(PathHelper.getSrcDirectory());
    },
    getSrcControllersFilesNames(): string[] {
        const modules = PathHelper.getSrcModulesDirectories(),
            controllersByModule = modules.map(m => {
                try {
                    return fs.readdirSync(`${m}/controllers`)
                        .filter(c => /\.controller\.ts$/.test(c))
                        .map(c => `${m}/controllers/${c}`);
                } catch (e) {
                    return [];
                }
            });

        return controllersByModule.reduce((acc, list) => acc.concat(list), []);
    },
    getAllEntitiesFilesNames(): string[] {
        const entitiesSrc = PathHelper.getEntitiesInModules(PathHelper.getSrcDirectory()),
                entitiesFramework = PathHelper.getEntitiesInModules(PathHelper.getFrameworkDirectory() + '/providers');

        return [...entitiesSrc, ...entitiesFramework];
    },
    getEntitiesInModules(modulesDirectory: string): string[] {
        const modules = PathHelper.getSubdirectories(modulesDirectory),
            entitiesByModule = modules.map(m => {
                try {
                    return fs.readdirSync(`${m}/entities`)
                        .filter(entity => /\.ts$/.test(entity))
                        .map(entity => `${m}/entities/${entity}`);
                } catch (e) {
                    return [];
                }
            });

        return entitiesByModule.reduce((acc, list) => acc.concat(list), []);
    }
};
