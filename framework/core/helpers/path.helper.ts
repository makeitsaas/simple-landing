import * as fs from 'fs';

export const PathHelper = {
    getSrcPath(): string {
        return process.cwd() + '/src';
    },
    getModulesDirectories(): string[] {
        const srcPath = PathHelper.getSrcPath(),
            modules = fs.readdirSync(srcPath);
        return modules.map(m => `${srcPath}/${m}`).filter(p => !/\...?.?$/.test(p));
    },
    getControllersFilesNames(): string[] {
        const modules = PathHelper.getModulesDirectories(),
            controllersByModule = modules.map(m => {
                try {
                    return fs.readdirSync(`${m}/controllers`)
                        .filter(c => /\.controller\.ts$/.test(c))
                        .map(c => `${m}/controllers/${c}`);
                } catch (e) {
                    return [];
                }
            });

        const controllers = controllersByModule.reduce((acc, list) => acc.concat(list), []);
        return controllers;
    }
};
