<template>
  <div class="rule_wrap">
    <div v-for="(item, index) in list" class="rule_box">
      <div v-show="item.bracket">
        <span>(</span>
      </div>
      <div class="rule_main">

        <div class="rule_item" v-if="item.rule">
          <span class="not" v-if="item.rule.not">{{ item.rule.not ? 'NOT' : '' }}</span>

          <el-dropdown :class="item.rule.props1 === 'Base_Info' ? '' : 'marR20'" class="pointer blue"
            @command="(command) => handleCommand1(item, command)" trigger="click">
            <span class="el-dropdown-link">
              {{ item.rule.props1 }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops1" :command="el.value">
                <div style="display: flex; justify-content: space-between;">
                  <span>{{ el.label }}</span>
                  <span style="color: #999;margin-left: 10px;">{{ el.name }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-popover class="marR20" v-show="item.rule.props1 === 'Base_Info'" placement="top" width="160"
            v-model="item.visible1" @show="showSelPop(index)">
            <el-input :ref="`inp1${index}`" v-model="selValue" placeholder="请输入内容" size="mini"></el-input>
            <div style="text-align: right; margin: 5px 0 0">
              <el-button size="mini" type="text" @click="item.visible1 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="setGet(item)">确定</el-button>
            </div>
            <el-button slot="reference" type="text">{{ `.get(${item.rule.get ? item.rule.get : '?'})` }}</el-button>
          </el-popover>

          <el-dropdown class="marR20 pointer" @command="(command) => handleCommand2(item, command)" trigger="click">
            <span class="el-dropdown-link">
              {{ item.rule.props2 === 'contains' ? '包含' : item.rule.props2 }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops2" :command="el.value">{{ el.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-popover class="marR20" placement="top" v-model="item.visible3" @show="showPop(index)">
            <el-input :ref="`inp3${index}`" v-model="inpValue" placeholder="请输入内容" size="mini"></el-input>
            <div style="text-align: right; margin: 5px 0 0">
              <el-button size="mini" type="text" @click="item.visible3 = false">取消</el-button>
              <el-button type="primary" size="mini" @click="setInp(item)">确定</el-button>
            </div>
            <span slot="reference" class="blue pointer">{{ item.rule.props3 ? item.rule.props3 : "'?'" }}</span>
          </el-popover>

          <el-dropdown class="marR20 pointer" v-show="index !== (list.length - 1)"
            @command="(command) => handleCommand3(item, command)" trigger="click">
            <span class="el-dropdown-link">
              {{ item.rule.props4 === '&&' ? '且' : '或' }}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="el in ops3" :command="el.value">{{ el.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="btn_group marR20" v-if="!item.children.length">
          <el-button v-if="item.rule" type="text" @click="notRule(item)">!</el-button>
          <el-button type="text" @click="addRule(item, index)">+</el-button>
          <el-button v-if="item.rule" type="text" @click="addBracket(item, index)">()</el-button>
          <el-button type="text" @click="addRuleBracket(item, index)">()+</el-button>
          <el-button v-if="item.rule" type="text" @click="delRule(item, index)">-</el-button>
        </div>
        <p class="red" v-show="item.rule && ((!item.rule.get && item.rule.props1 === 'Base_Info') || !item.rule.props3)">
          输入内容不可为空，请点击“?”输入</p>
      </div>
      <mvel-cpn :list="item.children" />
      <div v-show="item.bracket" class="bracket">
        <span class="marR20">)</span>
        <el-dropdown class="marR20 pointer" v-show="index !== (list.length - 1)"
          @command="(command) => handleCommand4(item, command)" trigger="click">
          <span class="el-dropdown-link">
            {{ item.props5 === '&&' ? '且' : '或' }}
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
        <p v-if="item.bracket" class="red" v-show="!item.children.length">
          括号内未添加任何语句</p>
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
      ops1: [
        {
          label: 'title',
          name: '商品标题',
          value: 'title',
        },
        {
          label: 'brand_name',
          name: '品牌名',
          value: 'brand_name',
        },
        {
          label: 'stantard_brand_name',
          name: '标准品牌名',
          value: 'stantard_brand_name',
        },
        {
          label: 'standard_brand_id',
          name: '标准品牌ID',
          value: 'standard_brand_id',
        },
        {
          label: 'standardlastcategoryid',
          name: '标准末级分类ID',
          value: 'standardlastcategoryid',
        },
        {
          label: 'Base_Info',
          name: '商品属性，可通过get方法获取指定key的value',
          value: 'Base_Info',
        },
        {
          label: 'base_info_str',
          name: '商品属性字符串，通过contains进行模糊匹配',
          value: 'base_info_str',
        },
        {
          label: 'platform_id',
          name: '平台ID',
          value: 'platform_id',
        },
        {
          label: 'shopId',
          name: '平台ID',
          value: 'shopId',
        },
      ],
      ops2: [
        {
          label: '包含',
          value: 'contains',
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
      ],
      ops3: [
        {
          label: '且',
          value: '&&',
        },
        {
          label: '或',
          value: '||',
        },
      ],
    }
  },
  methods: {
    // 下啦赋值
    handleCommand1(item, command) {
      item.rule.props1 = command
      command === 'Base_Info' ? item.rule.props2 = '==' : null
    },
    handleCommand2(item, command) {
      item.rule.props2 = command
    },
    handleCommand3(item, command) {
      item.rule.props4 = command
    },
    handleCommand4(item, command) {
      item.props5 = command
    },
    // 显示 .get popover
    showSelPop(index) {
      this.selValue = ''
      this.$nextTick(() => {
        let id = `inp1${index}`
        this.$refs[id][0].focus();
      })
    },
    // 设置 .get(x)
    setGet(item) {
      item.visible1 = false
      this.selValue.trim() ? item.rule.get = this.selValue : this.selValue = ''
    },
    // 显示 popover
    showPop(index) {
      this.inpValue = ''
      this.$nextTick(() => {
        let id = `inp3${index}`
        this.$refs[id][0].focus();
      })
    },
    // 设置 popover 值
    setInp(item) {
      item.visible3 = false
      this.inpValue.trim() ? item.rule.props3 = this.inpValue : this.inpValue = ''
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
  align-items: center;

  >p {
    /* position: absolute;
    left: 0;
    bottom: -20px; */
    font-style: italic;
    font-size: 12px;

    &.red {
      color: red;
    }
  }
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
  align-items: center;
  position: relative;

  >p {
    /* position: absolute;
    left: 0;
    bottom: -20px; */
    font-style: italic;
    font-size: 12px;

    &.red {
      color: red;
    }
  }

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