import path from 'path';
import fs from 'fs-extra';

export const copyFiles = (directoryToSearch, directoryToCopyTo, pattern, log = false) => {
    fs.readdirSync(directoryToSearch).forEach((file) => {
        const filePath = directoryToSearch + '/' + file;
        const copyPath = directoryToCopyTo + '/' + file;
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            copyFiles(filePath, copyPath, pattern);
        }
        if (stat.isFile() && filePath.endsWith(pattern)) {
            if (log) console.log('copy file with pattern', pattern, 'from', directoryToSearch, 'to', directoryToCopyTo);
            fs.copy(filePath, copyPath, (err) => {
                if (log) console.log('file', filePath, 'copied to:', copyPath);
            });
        }
    });
};

export const copyFile = (sourceFile, targetFile, log = false) => {
    fs.copySync(sourceFile, targetFile);
    if (log) console.log('file', sourceFile, 'copied to:', targetFile);
};

export const removeFiles = (directoryToSearch, pattern) => {
    fs.readdirSync(directoryToSearch).forEach((file) => {
        const filePath = path.resolve(directoryToSearch, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            removeFiles(filePath, pattern);
        }
        if (stat.isFile() && filePath.endsWith(pattern)) {
            fs.unlink(filePath);
        }
    });
};
