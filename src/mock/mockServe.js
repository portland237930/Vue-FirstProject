// 引入mock
import Mock from "mockjs"
// 引入json文件
import banner from "./banner.json"
import floor from "./floor.json"
// 使用Mock模拟数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })