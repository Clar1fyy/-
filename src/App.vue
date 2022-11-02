<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="getInputValue" />
    <a-button type="primary" @click="addList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="getItemChecked(item.id,$event)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeList(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{overplusItem}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="listState === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="listState === 'undone' ? 'primary' : 'default'"  @click="changeList('undone')">未完成</a-button>
          <a-button :type="listState === 'done' ? 'primary' : 'default'"  @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    getInputValue (e) {
      this.$store.commit('valueChange', e.target.value)
    },
    addList () {
      if (this.inputValue.trim().length <= 0) return this.$message.warning('你写啊倒是')
      this.$store.commit('addList')
    },
    removeList (id) {
      this.$store.commit('remove', id)
    },
    getItemChecked (id, e) {
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('checkedBox', param)
    },
    clean () {
      this.$store.commit('cleanItem')
    },
    changeList (key) {
      this.$store.commit('changeViewKey', key)
    }
  },
  computed: {
    ...mapState(['inputValue', 'listState']),
    ...mapGetters(['overplusItem', 'infoList'])
  },
  created () {
    this.$store.dispatch('getList')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
