import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = join(__dirname, '../public/static');
const files = readdirSync(staticDir).filter(file => file.endsWith('.json'));
const testData = {};
const testList = [];
const tableColumns = {}

files.forEach(file => {
    if (file === 'data-manager.js') return;
    const content = readFileSync(join(staticDir, file), 'utf8');
    const data = JSON.parse(content);
    if (file === 'table-colums.json'){
        tableColumns['data'] = data;
        return
    };
    const name = file.replace('.json', '');
    testList.push({
        label: data.name ?? name,
        value: name
    });
    testData[name] = JSON.parse(content);
});

// 生成压缩后的内容
const content = `window.__TEST_LIST__={data:${JSON.stringify(testList)}};window.__TEST_DATA__=${JSON.stringify(testData)};window.__TABLE_COLUMNS__=${JSON.stringify(tableColumns)};window.__TEST_DATA_READY__=true;`;

writeFileSync(join(staticDir, 'data-manager.js'), content);
console.log('压缩后的数据管理文件已生成');