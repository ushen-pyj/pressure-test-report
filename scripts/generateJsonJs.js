import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 获取文件的现有哈希值
function getExistingHash(directory, baseName) {
    const files = readdirSync(directory);
    const modernFile = files.find(f => f.startsWith(baseName + '-') && !f.includes('legacy'));
    const legacyFile = files.find(f => f.startsWith(baseName + '-legacy-'));
    
    if (!modernFile) return null;
    
    const hash = modernFile.replace(baseName + '-', '').replace('.js', '');
    const hashLegacy = legacyFile.replace(baseName + '-', '').replace('.js', '');
    return [hash, hashLegacy];
}

const staticDir = join(__dirname, '../dist/static');
const distDir = join(__dirname, '../dist/assets');

if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
}

const files = readdirSync(staticDir).filter(file => file.endsWith('.json'));

files.forEach(file => {
    const content = readFileSync(join(staticDir, file), 'utf8');
    const name = basename(file, '.json');
    const hash = getExistingHash(distDir, name);
    const hashLegacy = hash[1];
    const hashModern = hash[0];
    if (!hash) {
        console.log(`未找到 ${name} 的现有文件，请先构建项目`);
        return;
    }

    const data = JSON.parse(content);

    // 生成并覆盖现代版本
    const modernContent = `export const data=${JSON.stringify(data.data)};export default ${JSON.stringify(data)};`;
    writeFileSync(join(distDir, `${name}-${hashModern}.js`), modernContent);

    // 生成并覆盖 legacy 版本
    const legacyContent = `System.register([],(function(t,e){"use strict";return{execute:function(){const e=t("data",${JSON.stringify(data.data)});t("default",${JSON.stringify(data)})}}}));`;
    writeFileSync(join(distDir, `${name}-${hashLegacy}.js`), legacyContent);

    console.log(`已更新 ${name} ${hashModern} ${hashLegacy} 的现代版本和 legacy 版本文件`);
});

console.log('所有文件处理完成！');