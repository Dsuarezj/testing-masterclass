const fs = require('fs');
const path = require('path');

const {exec} = require('child_process');

console.log('This script will migrate the current project from vi to vitest');

console.log('Preparing index.html ⏱️');
console.log('Remove public url reference...');
try {
    let indexHtmlPath = path.join('public', 'index.html');
    let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');
    indexHtmlContent = indexHtmlContent.replace(/%PUBLIC_URL%/g, '');

    console.log('Inserting react index script...');
    let indexScript = '<script type="module" src="/src/index.jsx"></script>';
    let insertReference = '</head>';
    indexHtmlContent = indexHtmlContent.replace(insertReference, `${indexScript}\n${insertReference}`);

    console.log('Moving file...');
    fs.writeFileSync(indexHtmlPath, indexHtmlContent);
    fs.renameSync(indexHtmlPath, path.join(__dirname, 'index.html'));

    console.log('index.html is ready 💅');
} catch (error) {
    console.error('🚨 Error reading index.html: ', error.message);
}

console.log('Changing files\' extension to use jsx 📝');
try {
    console.log('Moving index.js to index.jsx ...');
    let indexPath = path.join('src');
    fs.renameSync(indexPath.concat('/index.js'), indexPath.concat('/index.jsx'));
    console.log('Moving App.js to App.jsx ...');
    let appPath = path.join('src', 'pages', 'home');
    fs.renameSync(appPath.concat('/App.js'), appPath.concat('/App.jsx'));
    console.log('Moving App.test.js to App.test.jsx ...');
    fs.renameSync(appPath.concat('/App.test.js'), appPath.concat('/App.test.jsx'));
} catch (error) {
    console.error('🚨 Error moving files: ', error.message);
}

console.log('Start replacing scripts in package.json 📦');
try {
    let packageJsonPath = path.join('./package.json');

    let packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
    const scriptsMapping = {
        '"start": "react-scripts start",': '"start": "vite",',
        '"build": "react-scripts build",': '"build": "vite build",',
        '"test": "react-scripts test",': '"test": "vitest",',
        '"eject": "react-scripts eject"': '"serve": "vite preview"'
    };
    for (let [oldScript, newScript] of Object.entries(scriptsMapping)) {
        packageJsonContent = packageJsonContent.replace(new RegExp(oldScript, 'g'), newScript);
    }
    fs.writeFileSync(packageJsonPath, packageJsonContent);
    console.log('Successfully update scripts 🎛️');
} catch (error) {
    console.error('🚨 Error writing to package.json:', error.message);
}

console.log('Removing and adding dependencies from package.json 🧹');
try {
    const uninstallCommand = 'npm uninstall react-scripts';
    exec(uninstallCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`🚨 Error executing ${uninstallCommand}:`, error.message);
            return;
        }

        const installCommand = 'npm install --save-dev @vitejs/plugin-react @vitest/coverage-v8 jsdom msw vite vitest';
        exec(installCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`🚨 Error executing ${installCommand}:`, error.message);
                return;
            }
        });
    });
} catch (error) {
    console.error('🚨 Error installing dependencies:', error.message);
}

console.log('Creating vite.config.js file 🧪');

const viteConfigContent = `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        base: '/',
        build: {
            outDir: 'build',
        },
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './src/setupTests.js',
            css: true,
            reporters: ['verbose'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*'],
                exclude: [],
            }
        },
    };
});
`;

fs.writeFile('vite.config.js', viteConfigContent, err => {
    if (!err) {
        console.log('Vite config created successfully 🎉');
    } else {
        console.error('🚨 Error writing file:', err.message);
    }
});

console.log('Creating mocks/handler file 🧪');
const directoryPath = 'src/mocks';

const handlerContent = `import { http, HttpResponse } from 'msw'

export const handlers = [
    http.post('http://localhost:3001/warehouse/package', () => {
        return HttpResponse.json({
            status: 'received'
        })
    }),
]
`;

fs.mkdirSync(directoryPath, {recursive: true});

fs.writeFile(path.join(directoryPath, 'handlers.js'), handlerContent, err => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Mock handler created successfully 🎉');
    }
});

console.log('Creating mocks/server file 🧪');

const serverContent = `import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
`;


fs.writeFile(path.join(directoryPath, 'server.js'), serverContent, err => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('Mock server created successfully 🎉');
    }
});


function replaceInFile(filePath, searchValue, replaceValue) {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(new RegExp(`${searchValue}\\b`, 'g'), replaceValue);
    fs.writeFileSync(filePath, newContent, 'utf8');
}

function replaceInDirectory(directoryPath, searchValue, replaceValue) {
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            replaceInDirectory(filePath, searchValue, replaceValue);
        } else if (path.extname(filePath) === '.js') {
            replaceInFile(filePath, searchValue, replaceValue);
        }
    }
}

try {
    console.log('Replacing vi mocks with vi mocks in files...');
    replaceInDirectory('./src', 'jest\\.', 'vi\.');
} catch (error) {
    console.error('🚨 Error replacing in files:', error);
}
console.log("... waiting for process to finish ...");

setTimeout(() => {
    console.log("🚀 Migration completed! Checking ...");
    console.log("Running npm install ☕️")
    const installCommand = 'npm install';
    exec(installCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`🚨 Error executing ${installCommand}:`, error.message);
            return;
        }
        console.log(`Output of ${installCommand}:`, stdout);
    });
    setTimeout(() => {
        console.log("Running npm test 🏎...")

        const testCommand = 'npm test -- --run';
        exec(testCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`🚨 Manually run: npm test. Error executing:`, error.message);
                return;
            }
            console.log(`Output of ${testCommand}:`, stdout);
        });

    }, 15000);
}, 5000);


