local json = require("cjson")
local lfs = require("lfs")

-- 获取脚本所在目录
local function script_path()
    local str = debug.getinfo(2, "S").source:sub(2)
    return str:match("(.*/)")
end

-- 读取文件内容
local function read_file(path)
    local file = io.open(path, "r")
    if not file then return nil end
    local content = file:read("*all")
    file:close()
    return content
end

-- 写入文件
local function write_file(path, content)
    local file = io.open(path, "w")
    if not file then return false end
    file:write(content)
    file:close()
    return true
end

-- 获取目录下所有JSON文件
local function get_json_files(dir)
    local files = {}
    for file in lfs.dir(dir) do
        if file:match("%.json$") then
            table.insert(files, file)
        end
    end
    return files
end

-- 主逻辑
local script_dir = script_path()
local static_dir = script_dir .. "../public/static"
local files = get_json_files(static_dir)

local test_data = {}
local test_list = {}
local table_columns = {}

for _, file in ipairs(files) do
    if file ~= "data-manager.js" then
        local content = read_file(static_dir .. "/" .. file)
        if content then
            local data = json.decode(content)
            
            if file == "table-colums.json" then
                table_columns.data = data
            else
                local name = file:gsub("%.json$", "")
                table.insert(test_list, {
                    label = data.name or name,
                    value = name
                })
                test_data[name] = data
            end
        end
    end
end

-- 生成压缩后的内容
local content = string.format(
    "window.__TEST_LIST__={data:%s};window.__TEST_DATA__=%s;window.__TABLE_COLUMNS__=%s;window.__TEST_DATA_READY__=true;",
    json.encode(test_list),
    json.encode(test_data),
    json.encode(table_columns)
)

-- 写入文件
local success = write_file(static_dir .. "/data-manager.js", content)
if success then
    print("压缩后的数据管理文件已生成")
else
    print("生成文件失败")
end