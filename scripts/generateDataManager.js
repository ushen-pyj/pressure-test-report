import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = join(__dirname, '../dist/static');
const files = readdirSync(staticDir).filter(file => file.endsWith('.json'));
const testData = {};
const testList = [];

files.forEach(file => {
    if (file === 'testlist.json') return;
    const name = file.replace('.json', '');
    testList.push(name);
    const content = readFileSync(join(staticDir, file), 'utf8');
    testData[name] = JSON.parse(content);
});

// 生成压缩后的内容
const content = `window.__TEST_LIST__={data:${JSON.stringify(testList)}};window.__TEST_DATA__=${JSON.stringify(testData)};window.__TEST_DATA_READY__=true;`;

writeFileSync(join(staticDir, 'data-manager.js'), content);
console.log('压缩后的数据管理文件已生成');