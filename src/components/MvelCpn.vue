<template>
  <div class="rule_wrap">
    <div v-for="(item, index) in list" class="rule_box">
      <div v-show="item.bracket">
        <span>(</span>
      </div>
      <div class="rule_main">
        <div class="rule_item" v-if="item.rule">
          <span class="not" v-if="item.rule.not">{{ item.rule.not ? 'NOT' : '' }}</span>

          <el-dropdown class="marR20 pointer blue" @command="(command) => handleCommand1(item, command)" trigger="click">
            <span class="el-dropdown-link">
              {{ item.rule.props1 }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops1" :command="el.value">{{ el.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown class="marR20 pointer" @command="(command) => handleCommand2(item, command)" trigger="click">
            <span class="el-dropdown-link">
              <el-popover v-if="item.rule.props2 === '.get(x)'" placement="top" v-model="item.visible1" @show="showSelPop"
                trigger="click">
                <el-input v-model="selValue" placeholder="请输入内容" size="mini"></el-input>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="item.visible1 = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="setSel(item)">确定</el-button>
                </div>
                <span slot="reference" class="pointer">get("<span class="blue">?</span>")</span>
              </el-popover>
              <span v-else>{{ item.rule.props2 }}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops2" :command="el.value">{{ el.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-popover class="marR20" placement="top" v-model="item.visible" @show="showPop">
            <el-input v-model="inpValue" placeholder="请输入内容" size="mini"></el-input>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="setInp(item)">确定</el-button>
            </div>
            <span slot="reference" class="blue pointer">{{ item.rule.props3 ? item.rule.props3 : "'?'" }}</span>
          </el-popover>

          <el-dropdown class="marR20 pointer" v-show="index !== (list.length - 1)"
            @command="(command) => handleCommand3(item, command)" trigger="click">
            <span class="el-dropdown-link">
              {{ item.rule.props4 }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops3" :command="el.value">{{ el.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="btn_group" v-if="!item.children.length">
          <el-button v-if="item.rule" type="text" @click="notRule(item)">!</el-button>
          <el-button type="text" @click="addRule(item, index)">+</el-button>
          <el-button v-if="item.rule" type="text" @click="addBracket(item, index)">()</el-button>
          <el-button type="text" @click="addRuleBracket(item, index)">()+</el-button>
          <el-button v-if="item.rule" type="text" @click="delRule(item, index)">-</el-button>
        </div>
      </div>
      <mvel-cpn :list="item.children" />
      <div v-show="item.bracket" class="bracket">
        <span class="marR20">)</span>
        <el-dropdown class="marR20 pointer" v-show="index !== (list.length - 1)"
          @command="(command) => handleCommand3(item, command)" trigger="click">
          <span class="el-dropdown-link">
            {{ item.props5 }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="el in ops3" :command="el.value">{{ el.label }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="btn_bracket_group">
          <el-button type="text" @click="addRule(item, index, true)">+</el-button>
          <el-button type="text" @click="addRuleBracket(item, index, true)">()+</el-button>
          <el-button type="text" @click="delRule(item, index, true)">()-</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'MvelCpn',
  props: {
    list: {
      type: Array,
      default: () => []
    },
  },
  mounted() { },
  watch: {},
  data() {
    return {
      selValue: '',
      inpValue: '',
      visible: false,
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
      ops1: [
        {
          label: 'title',
          value: 'title',
        },
        {
          label: 'base_info',
          value: 'base_info',
        },
        {
          label: 'base_info_str',
          value: 'base_info_str',
        },
        {
          label: 'platform_id',
          value: 'platform_id',
        },
      ],
      ops2: [
        {
          label: '包含',
          value: 'contain',
        },
        {
          label: '==',
          value: '==',
        },
        {
          label: '!=',
          value: '!=',
        },
        {
          label: '>',
          value: '>',
        },
        {
          label: '<',
          value: '<',
        },
        {
          label: '>=',
          value: '>=',
        },
        {
          label: '<=',
          value: '<=',
        },
        {
          label: 'xxx.get("?")',
          value: '.get(x)',
        },
      ],
      ops3: [
        {
          label: 'or',
          value: '||',
        },
        {
          label: 'and',
          value: '&&',
        },
      ],
    }
  },
  methods: {
    // 下啦赋值
    handleCommand1(item, command) {
      item.rule.props1 = command
    },
    handleCommand2(item, command) {
      item.rule.props2 = command
      item.visible1 = false
    },
    handleCommand3(item, command) {
      item.rule.props4 = command
    },
    // 显示 .get popover
    showSelPop() {
      this.selValue = ''
    },
    // 设置 .get(x)
    setSel(item) {
      item.rule.props2 = `.get("${this.selValue}")`
    },
    // 显示 popover
    showPop() {
      this.inpValue = ''
    },
    // 设置 popover 值
    setInp(item) {
      item.rule.props3 = this.inpValue
      item.visible = false
    },
    // 同级追加/当前项追加子项
    isSelf(bracket, out) {
      /** 
       * true: 当前项 追加子项
       * false: 同级 追加
      */
      let isAddChild = false
      /**
       * 1. 是否有括号
       *  （1）. 无：同级 追加
       *  （2）. 有
       *      a. 括号外：同级 追加
       *      b. 括号内：当前项 追加子项
       */
      !bracket
        ? isAddChild = false
        : out
          ? isAddChild = false
          : isAddChild = true

      return isAddChild
    },
    // 规则取反
    notRule(item) {
      item.rule.not = !item.rule.not
    },
    // 添加规则
    addRule(item, index, out) {
      const ruleData = _.cloneDeep(this.ruleItem)
      const isAddChild = out ? this.isSelf(item.bracket, out) : this.isSelf(item.bracket)
      isAddChild
        ? this.list[index].children.push(ruleData)
        : this.list.splice(index + 1, 0, ruleData)
    },
    // 添加括号
    addBracket(item, index) {
      const curRule = _.cloneDeep(item.rule)
      const ruleBracketData = _.cloneDeep(this.ruleBracketItem)
      ruleBracketData.children[0].rule = curRule
      const isAddChild = this.isSelf(item.bracket)
      isAddChild ? null : this.list.splice(index, 1, ruleBracketData)
    },
    // 添加带括号规则
    addRuleBracket(item, index, out) {
      const ruleBracketData = _.cloneDeep(this.ruleBracketItem)
      const isAddChild = out ? this.isSelf(item.bracket, out) : this.isSelf(item.bracket)
      isAddChild
        ? this.list[index].children.push(ruleBracketData)
        : this.list.splice(index + 1, 0, ruleBracketData)
    },
    // 删除规则/括号
    delRule(item, index, out) {
      const curChildren = _.cloneDeep(item.children)
      out ? this.list.splice(index, 1, ...curChildren) : this.list.splice(index, 1)
    },

  },
}
</script>

<style lang="scss" scoped>
.rule_box {
  padding: 5px 0;
  margin-left: 20px;
}

.bracket {
  display: flex;
}

.btn_group {
  padding: 5px 0;
  margin-left: 20px;

  .el-button {
    width: 25px;
    padding: 3px 0;
    text-align: center;
    box-sizing: border-box;
    color: #3D3D3D;
    background-color: #CECECE;
  }

  .el-button:hover {
    color: rgb(255, 158, 84)
  }
}

.btn_bracket_group {
  margin-left: 20px;

  .el-button {
    width: 25px;
    padding: 3px 0;
    text-align: center;
    box-sizing: border-box;
    margin-right: 10px;
    color: #ed3030;
    background-color: #cfd15c;
  }

  .el-button:hover {
    color: rgb(255, 158, 84);
  }
}

.not {
  margin-right: 10px;
}

.marR20 {
  margin-right: 20px;
}

.rule_main {
  display: flex;

  &:hover {
    background-color: rgb(255, 158, 84, .2);
  }

  .rule_el,
  .rule_item {
    display: flex;
    align-items: center;
  }



  .blue {
    color: #3662EC;
  }

  .pointer {
    cursor: pointer;
  }
}
</style>