# 使用 ElementUI 的 Table 相关组件

- 按需注册相关组件

```javaScript
import { Button, Table, TableColumn } from "element-ui";

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
```

- 你所写的组件中 data 下需要

```javaScript
data() {
  return {
    "_yourData": [{
      name: "LaoTang",
      age: 23,
      phone: "232553"
      // ......
    }]
  }
}
```

- 组件的标签

```html
<el-table> <el-table-column></el-table-column> </el-table>
```

- 标签熟悉
  > - el-table:
  >   > 1.  data: 表格数据
  >   > 2.  stripe: 是否隔行变色
  >   > 3.  border: 是否拥有边框
  > - el-table-column:
  >   > 1.  prop: 数据的熟悉
  >   > 2.  label: 给当前列命名
  >   > 3.  fixed: 固定列（默认 left）
  > - 自由属性(slot-scope="scope")
  >   > 1.  scope.\$index: 获取当前行索引
  >   > 2.  scope.row: 获取当前行数据（eg: scope.row.name）

```html
<el-table :data="userList" stripe border height="500" style="width: 100%">
  <el-table-column prop="id" label="编号"> </el-table-column>
  <el-table-column prop="name" label="姓名"> </el-table-column>
  <el-table-column prop="age" label="年龄"> </el-table-column>
  <el-table-column prop="phone" label="电话"> </el-table-column>
  <el-table-column prop="address" label="地址"> </el-table-column>
  <el-table-column prop="e-mail" label="电子邮箱"> </el-table-column>
  <el-table-column fixed="right" prop="<a>删除</a>" label="操作">
    <template slot-scope="scope">
      <el-button
        @click="delData(scope.$index, scope.row.id, userList)"
        type="text"
        size="small"
        >删除</el-button
      >
      <el-button
        @click="compileData(scope.$index, scope.row.id, userList)"
        type="text"
        size="small"
        >编辑</el-button
      >
    </template>
  </el-table-column>
</el-table>
```
