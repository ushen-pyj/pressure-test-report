import json
import os
from pathlib import Path

# 获取脚本所在目录
script_dir = Path(__file__).parent
static_dir = script_dir / '../public/static'

# 获取所有 JSON 文件
files = [f for f in os.listdir(static_dir) if f.endswith('.json')]

test_data = {}
test_list = []
table_columns = {}

for file in files:
    if file != 'data-manager.js':
        with open(static_dir / file, 'r', encoding='utf-8') as f:
            content = f.read()
            data = json.loads(content)
            
            if file == 'table-colums.json':
                table_columns['data'] = data
            else:
                name = file.replace('.json', '')
                test_list.append({
                    'label': data.get('name', name),
                    'value': name
                })
                test_data[name] = data

# 生成压缩后的内容
content = f"window.__TEST_LIST__={{data:{json.dumps(test_list)}}};window.__TEST_DATA__={json.dumps(test_data)};window.__TABLE_COLUMNS__={json.dumps(table_columns)};window.__TEST_DATA_READY__=true;"

# 写入文件
with open(static_dir / 'data-manager.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('压缩后的数据管理文件已生成')