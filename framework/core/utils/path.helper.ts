import * as fs from 'fs';

export const PathHelper = {
    getSrcDirectory(): string {
        const distPrefix = process.env.PATH_DIST_PREFIX ? '/dist':'';
        return process.cwd() + distPrefix + '/src';
    },
    getAppModulesDirectory(): string {
        return PathHelper.getSrcDirectory() + '/modules';
    },
    getFrameworkDirectory(): string {
        return `${__dirname}/../..`;
    },
    getSubdirectories(path: string): string[] {
        return fs.readdirSync(path)
            .map(subdir => `${path}/${subdir}`).filter(name => !/\...?.?$/.test(name))
    },
    getSrcModulesDirectories(): string[] {
        return PathHelper.getSubdirectories(PathHelper.getAppModulesDirectory());
    },
    getSrcControllersFilesNames(): string[] {
        const modules = PathHelper.getSrcModulesDirectories(),
            controllersByModule = modules.map(m => {
                try {
                    return fs.readdirSync(`${m}/controllers`)
                        .filter(c => /\.controller\.(ts|js)$/.test(c))
                        .map(c => `${m}/controllers/${c}`);
                } catch (e) {
                    return [];
                }
            });

        return controllersByModule.reduce((acc, list) => acc.concat(list), []);
    },
    getAllEntitiesFilesNames(): string[] {
        const entitiesSrc = PathHelper.getEntitiesInModules(PathHelper.getAppModulesDirectory()),
                entitiesFramework = PathHelper.getEntitiesInModules(PathHelper.getFrameworkDirectory() + '/providers');

        return [...entitiesSrc, ...entitiesFramework];
    },
    getEntitiesInModules(modulesDirectory: string): string[] {
        const modules = PathHelper.getSubdirectories(modulesDirectory),
            entitiesByModule = modules.map(m => {
                try {
                    return fs.readdirSync(`${m}/entities`)
                        .filter(entity => /\.(ts|js)$/.test(entity))
                        .map(entity => `${m}/entities/${entity}`);
                } catch (e) {
                    return [];
                }
            });

        return entitiesByModule.reduce((acc, list) => acc.concat(list), []);
    }
};
