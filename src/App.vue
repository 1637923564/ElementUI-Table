<template>
  <div id="app">
    <h1>用户列表</h1>
    <el-button type="primary" plain @click="addData">添加用户</el-button>
    <template>
      <el-table
        :data="userList"
        stripe
        border
        height="500"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
        <el-table-column
          prop="e-mail"
          label="电子邮箱">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="<a>删除</a>"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="delData(scope.$index, scope.row.id, userList)" type="text" size="small">删除</el-button>
            <el-button @click="compileData(scope.$index, scope.row.id, userList)"  type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import { Message, MessageBox, Notification } from "element-ui";

export default {
  name: "app",
  data() {
    return {
      userList: []
    };
  },
  methods: {
    // 增
    addData() {
      this.openForm()
        .then(() => {
          let addData = this.createHTMLObj();
          axios({
            method: "POST",
            url: "http://localhost:12345/users",
            data: addData
          }).then(res => {
            this.userList.push(res.data);
            Notification.success("用户添加成功");
          });
        })
        .catch(() => {
          Notification.info("已取消用户添加");
        });
    },
    // 改
    compileData(tarIndex, row, userList) {
      this.openForm(userList[tarIndex])
        .then(() => {
          let compileData = this.createHTMLObj();
          axios({
            method: "PUT",
            url: `http://localhost:12345/users/${row}`,
            data: compileData
          })
            .then(res => {
              let tar = userList.findIndex(item => item.id === res.data.id);
              userList.splice(tar, 1, res.data);
              Notification({
                type: "success",
                message: "用户信息修改成功"
              });
            })
            .catch(() => {
              Notification.error("编辑失败");
            });
        })
        .catch(() => {
          Notification.info("已取消用户修改");
        });
    },
    // 删
    delData(tarIndex, row, userList) {
      MessageBox({
        title: "提示",
        message: "用户数据删除后将无法恢复，是否删除？",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios
            .delete(`http://localhost:12345/users/${row}`)
            .then(() => {
              userList.splice(tarIndex, 1);
            })
            .then(() => {
              Notification.success("用户已成功删除");
            });
        })
        .catch(() => {
          Notification.info("已取消删除操作");
        });
    },
    openForm() {
      if (arguments.length === 0) {
        return MessageBox({
          title: "用户信息",
          message: `<from id="form">
          <table>
            <tr>
              <td><lable for="name">姓名：</lable></td>
              <td><input type="text" name="name" /></td>
            </tr>
            <tr>
              <td><lable for="age">年龄：</lable></td>
              <td><input type="text" name="age" /></td>
            </tr>
            <tr>
              <td><lable for="phone">电话：</lable></td>
              <td><input type="text" name="phone" /></td>
            </tr>
            <tr>
              <td><lable for="address">地址：</lable></td>
              <td><input type="text" name="address" /></td>
            </tr>
            <tr>
              <td><lable for="e-mail">e-mail：</lable></td>
              <td><input type="text" name="e-mail" /></td>
            </tr>
          </table>
          </from>`,
          confirmButtonText: "确认",
          cancleButtonText: "取消",
          showCancelButton: true,
          dangerouslyUseHTMLString: true
        });
      } else {
        return MessageBox({
          title: "用户信息",
          message: `<from id="form">
            <table>
              <tr>
                <td><lable for="name">姓名：</lable></td>
                <td><input value="${
                  arguments[0].name
                }" type="text" name="name" /></td>
              </tr>
              <tr>
                <td><lable for="age">年龄：</lable></td>
                <td><input value="${
                  arguments[0].age
                }" type="text" name="age" /></td>
              </tr>
              <tr>
                <td><lable for="phone">电话：</lable></td>
                <td><input value="${
                  arguments[0].phone
                }" type="text" name="phone" /></td>
              </tr>
              <tr>
                <td><lable for="address">地址：</lable></td>
                <td><input value="${
                  arguments[0].address
                }" type="text" name="address" /></td>
              </tr>
              <tr>
                <td><lable for="e-mail">e-mail：</lable></td>
                <td><input value="${
                  arguments[0]["e-mail"]
                }" type="text" name="e-mail" /></td>
              </tr>
            </table>
            </from>`,
          confirmButtonText: "确认",
          cancleButtonText: "取消",
          showCancelButton: true,
          dangerouslyUseHTMLString: true
        });
      }
    },
    createHTMLObj() {
      let input = document.querySelectorAll("input");
      let addData = {};
      for (var index = 0, len = input.length; index < len - 1; index++) {
        addData[input[index].name] = input[index].value;
      }
      return addData;
    }
  },
  created() {
    axios.get("http://localhost:12345/users").then(res => {
      this.userList = res.data;
      Message({
        message: "用户列表加载成功",
        type: "success"
      });
    });
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
}
</style>
