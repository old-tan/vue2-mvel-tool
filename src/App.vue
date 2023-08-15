<template>
  <div id="app">
    <h2>tool for mvel </h2>
    <!-- <el-button type="primary" @click="getData">生成</el-button> -->
    <mvel-cpn :list="list" />
    <div class="btn_group" v-if="!list.length">
      <el-button type="text" @click="addNewRule">+</el-button>
      <el-button type="text" @click="addNewRuleBracket">()+</el-button>
    </div>
  </div>
</template>

<script>
import MvelCpn from './components/MvelCpn'
import _ from 'lodash'
export default {
  components: {
    MvelCpn
  },
  data() {
    return {
      list: [],
      // 带括号、带规则数据
      ruleBracketItem: {
        visible: false,
        visible1: false,
        bracket: 1,
        props5: '&&',
        children: [
          {
            visible: false,
            visible1: false,
            props5: '&&',
            rule: {
              not: false,
              props1: 'title',
              props2: 'contain',
              props3: '',
              props4: '&&',

            },
            children: []
          },
        ]
      },
      // 无括号规则数据
      ruleItem: {
        visible: false,
        visible1: false,
        props5: '&&',
        rule: {
          not: false,
          props1: 'title',
          props2: 'contain',
          props3: '',
          props4: '&&',
        },
        children: []
      },
    }
  },
  mounted() {
  },
  methods: {
    getData() {
      console.log(this.list)
    },
    // 添加无括号规则
    addNewRule() {
      const newBracketRule = _.cloneDeep(this.ruleItem)
      this.list.push(newBracketRule)
    },
    // 添加带括号规则
    addNewRuleBracket() {
      const newBracketRule = _.cloneDeep(this.ruleBracketItem)
      this.list.push(newBracketRule)
    },
  },
}
</script>

<style lang="scss" scoped>
.btn_group {
  margin-left: 30px;

  .el-button {
    padding: 3px 5px;
    color: #3D3D3D;
    background-color: #CECECE;
  }

  .el-button:hover {
    color: rgb(255, 158, 84)
  }
}
</style>