// 全局数据管理
window.__TEST_LIST__ = {
    data: ["test_1", "test_2"]
};

window.__TEST_DATA__ = {};

// 加载指定的测试数据
async function loadTestData(testName) {
    try {
        const response = await fetch(`./static/${testName}.json`);
        if (response.status === 200) {
            const data = await response.json();
            window.__TEST_DATA__[testName] = data;
            return data;
        }
        console.error(`加载 ${testName} 失败`);
        return null;
    } catch (error) {
        console.error(`加载 ${testName} 出错:`, error);
        return null;
    }
}

// 初始化加载所有测试数据
window.__TEST_LIST__.data.forEach(testName => {
    loadTestData(testName);
});