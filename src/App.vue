<template>
  <div id="app">
    <h2>tool for mvel </h2>
    <el-button type="primary" @click="createData" size="mini" :disabled="!ruleDisabled">生成</el-button>
    <el-button type="text" sizi="mini" @click="clearRule">清空</el-button>
    <mvel-cpn :list="list" />
    <div class="btn_group" v-if="!list.length">
      <el-button type="text" @click="addNewRule">+</el-button>
      <el-button type="text" @click="addNewRuleBracket">()+</el-button>
    </div>
    <p>{{ mvelStr }}</p>
  </div>
</template>

<script>
import MvelCpn from './components/MvelCpn'
import _ from 'lodash'
import { generateRuleMap, validateRules } from './utils'
export default {
  components: {
    MvelCpn
  },
  data() {
    return {
      mvelStr: '',
      ruleDisabled: false,
      list: [],
      // 带括号、带规则数据
      ruleBracketItem: {
        visible1: false,
        visible3: false,
        bracket: 1,
        props5: '&&',
        children: [
          {
            visible1: false,
            visible3: false,
            props5: '&&',
            rule: {
              not: false,
              props1: 'title',
              get: '',
              props2: 'contains',
              props3: '',
              props4: '&&',

            },
            children: []
          },
        ]
      },
      // 无括号规则数据
      ruleItem: {
        visible1: false,
        visible3: false,
        props5: '&&',
        rule: {
          not: false,
          props1: 'title',
          get: '',
          props2: 'contains',
          props3: '',
          props4: '&&',
        },
        children: []
      },

    }
  },
  mounted() {
  },
  watch: {
    list: {
      handler(newList, oldList) {
        if (!newList.length) {
          return false
        }
        this.mvelStr = ''
        const validres = validateRules(newList)
        this.ruleDisabled = validres
      },
      deep: true
    }
  },
  methods: {
    // 清空规则
    clearRule() {
      this.list = []
      this.ruleDisabled = false
      this.mvelStr = ''
    },
    // 生成数据
    createData() {
      const res = generateRuleMap(this.list)
      this.mvelStr = res
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