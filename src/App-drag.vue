<template>
  <div id="app">
    <!-- <test-collapse></test-collapse> -->
    <!-- <nested-draggable :children="newList" /> -->
    <div class="btn-box">
      <button @click="onPrev" :disabled="currentIndex === 0">上一步</button>
      <span>{{ currentIndex }}</span>
      <button @click="onNext" :disabled="currentIndex === (allStepList.length - 1)">下一步</button>
    </div>
    <!-- <button @click="subData">获取提交信息</button> -->
    <div class="app">
      <div class="group-wrap">
        <!-- <draggable class="group" :list="newList" group="g1" :sort="false" draggable> -->
        <div v-for="(item, index) in newList" :key="item.id">
          <draggable class="group-item" :list="item.children" draggable=".item" :group="{ name: 'g2' }"
            @change="(evt) => groupChange(evt, index)">
            <div :class="child.class ? child.class : 'item'" v-for="(child, cIndex) in item.children" :key="child.id">
              <el-collapse v-model="item.activeNames">
                <el-collapse-item :title="child.name" :name="child.id">
                  <div class="item-top">
                    <h4 :class="cIndex === 0 ? 'top' : ''">{{ child.name }} - {{ child.id }}</h4>
                  </div>
                  <draggable class="item-child" :list="child.children" :sort="false" :group="{ name: 'g3' }"
                    @change="(evt) => childChange(evt, index, cIndex)">
                    <div class="child" v-for="el in child.children" :key="el.id">
                      <el-checkbox @change="itemChange(index, cIndex)" v-model="el.checked">{{ }}</el-checkbox>
                      <span :class="el.sid !== child.id ? 'move' : ''">{{ el.id }}</span>
                      <span>{{ el.name }}</span>
                      <!-- <span>{{ el.pName }}</span>
                      <span>{{ el.type }}</span> -->
                    </div>
                  </draggable>
                </el-collapse-item>
              </el-collapse>
            </div>
          </draggable>
        </div>
        <!-- </draggable> -->
      </div>
      <div class="json-pretty">
        <vue-json-pretty :data="mergeData"></vue-json-pretty>
        <vue-json-pretty :data="moveData"></vue-json-pretty>
      </div>
      <!-- <div class="json-pretty">
        <div>
          <h2>checked</h2>
          <vue-json-pretty :data="selectedItems" />
        </div>
        <div>
          <h2>new</h2>
          <vue-json-pretty :data="newList" />
        </div>
        <div>
          <h2>compare</h2>
          <vue-json-pretty :data="compareList" />
        </div>
        <div>
          <h2>origin</h2>
          <vue-json-pretty :data="originList" />
        </div>
      </div> -->
    </div>

  </div>
</template>

<script>
import draggable from 'vuedraggable'
// import NestedDraggable from "./components/NestedDraggable.vue";
import TestCollapse from "./components/TestCollapse";
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { list } from './json'
import { deepClone, deepCompare } from './utils'
import { Avatar } from 'element-ui';
const _ = require('lodash');
// watch 监听各个品牌的数据变化来判断当前品牌是否可以put，向list中添加put：false属性
/* 添加比较函数： 
* 每次子项进出都与原始数据比较是否有变化，有变化则冻结 freeze，无变化解冻
*/
/* 品牌合并规则： 
* 1. 品牌合并后，当前品牌子项不能有任何变化
* 2. 待合并品牌子项没有变化时，可以进行合并
* 3. 被合并品牌在顶部（即主品牌）
*/
export default {
  name: "app",
  components: {
    draggable,
    VueJsonPretty,
    TestCollapse
    // NestedDraggable
  },
  data() {
    return {
      allStepList: [],
      currentIndex: 0,
      newList: [],
      compareList: [],
      originList: [],
      selectedItems: [],
      mergeData: [],
      moveData: [],
      pull: false,
      put: false,
    }
  },
  created() {
    // 数据请求
    this.newList = list
    // 保存源数据
    this.originList = _.cloneDeep(this.newList)
    // 设置ids
    this.setActiveNames()
    // 设置步数数据
    this.allStepList.push(_.cloneDeep(this.newList))
    this.currentIndex = this.allStepList.length - 1
  },
  mounted() {
    const str = '1.00'
    console.log(this.numUnit(str))
    // const strRing = '-101.11'
    // const strRing = ''
    // console.log(this.numUnitRing(strRing))
    // let a = { name: 'airy', age: 18, height: '1.88', num: '2002.22' }
    // const b = { ...a, num: Math.floor(a.num) }
    // console.log(b)
  },
  methods: {

    numUnitRing(payload) {
      const showNum = Math.floor(payload)
      if (!showNum) {
        return '--'
      }
      if (showNum <= -100) {
        return `-100%`
      } else if (showNum >= 1000) {
        return `1000%`
      } else {
        return `${payload}%`
      }
    },
    numUnit(payload) {
      const showNum = Math.floor(payload)
      const showStr = Math.floor(payload).toString()
      if (!showNum) {
        return '--'
      } else if (showNum < 50) {
        return showStr
      } else if (50 <= showNum && showNum < 100) {
        return `50-100`
      } else if (100 <= showNum && showNum < 250) {
        return `100-250`
      } else if (250 <= showNum && showNum < 500) {
        return `250-500`
      } else if (500 <= showNum && showNum < 750) {
        return `500-750`
      } else if (750 <= showNum && showNum < 1000) {
        return `750-1000`
      } else if (1000 <= showNum && showNum < 2500) {
        return `1000-2500`
      } else if (2500 <= showNum && showNum < 5000) {
        return `2500-5000`
      } else if (5000 <= showNum && showNum < 7500) {
        return `5000-7500`
      } else if (7500 <= showNum && showNum < 10000) {
        return `7500-10000`
      } else if (10000 <= showNum && showNum < 25000) {
        return `1万-2.5万`
      } else if (25000 <= showNum && showNum < 50000) {
        return `2.5万-5万`
      } else if (50000 <= showNum && showNum < 75000) {
        return `5万-7.5万`
      } else if (75000 <= showNum && showNum < 100000) {
        return `7.5万-10万`
      } else if (100000 <= showNum && showNum < 250000) {
        return `10万-25万`
      } else if (250000 <= showNum && showNum < 500000) {
        return `25万-50万`
      } else if (500000 <= showNum && showNum < 750000) {
        return `50万-75万`
      } else if (750000 <= showNum && showNum < 1000000) {
        return `75万-100万`
      } else if (1000000 <= showNum && showNum < 2500000) {
        return `100万-250万`
      } else if (2500000 <= showNum && showNum < 5000000) {
        return `250万-500万`
      } else if (5000000 <= showNum && showNum < 7500000) {
        return `500万-750万`
      } else if (7500000 <= showNum && showNum < 10000000) {
        return `750万-1000万`
      } else if (10000000 <= showNum && showNum < 25000000) {
        return `1000万-2500万`
      } else if (25000000 <= showNum && showNum < 50000000) {
        return `2500万-5000万`
      } else if (50000000 <= showNum && showNum < 75000000) {
        return `5000万-7500万`
      } else if (75000000 <= showNum && showNum < 100000000) {
        return `7500万-1亿`
      } else if (100000000 <= showNum) {
        return `1亿+`
      }
    },
    // 步数数据更新
    addToAnythOrReplace(arr, originData) {
      originData.push(_.cloneDeep(arr))
      originData.length > 5 ? originData.shift() : null
    },
    // 步数变化
    stepChange() {
      this.currentIndex = this.allStepList.length - 1
    },
    // 上一步
    onPrev() {
      this.currentIndex--
      console.log(this.currentIndex)
      this.newList = this.allStepList[this.currentIndex]
      if (this.currentIndex < 0) {
        this.currentIndex = 0
      }
    },
    // 下一步
    onNext() {
      this.currentIndex++
      this.newList = this.allStepList[this.currentIndex]
      if (this.currentIndex > 4) {
        this.currentIndex = 4
      }

    },
    // 最终提交数据
    handleResData() {
      // 先清空
      this.moveData = []
      this.mergeData = []
      this.compareList = _.cloneDeep(this.newList)
      this.compareList.forEach((item, index) => {
        if (item.children.length > 1) {
          // 对 merge 数据合并到主品牌（索引为 0）
          this.compareList[index].children[0].children = item.children.reduce((acc, cur) => acc.concat(cur.children), [])
        }
      })
      // // 获取 迁移/合并 数据
      this.compareList.filter(c => c.children.length > 0).forEach((item, index) => {
        const ids = item.ids
        // move [{"platform_id": "9", "brand_id": "94578", "new_std_brand_id": "10-94578"},...]
        const itemMoveData = item.children[0].children.filter(d => !ids.includes(d.sid)).map(l => {
          const { sid, id } = l
          return { sid, id, new_std_brand_id: item.children[0].id }
        })
        this.moveData = this.moveData.concat([...itemMoveData])
        // merge // {"std_brand_ids": "10-905050132,10-905050131", "new_std_brand_id": "10-28247"}
        if (ids.length > 1) {
          const [toid, ...rest] = ids
          this.mergeData = [...this.mergeData, { toid, fromid: rest.join(',') }]
        }
      })
    },
    // checkbox change 事件
    itemChange(index, cIndex) {
      this.selectedItems = this.newList[index].children[cIndex].children.filter(item => item.checked)
      this.addToAnythOrReplace(this.newList, this.allStepList)
      this.stepChange()
    },
    // 品牌change
    groupChange(evt, index) {
      // console.log(evt, index)
      this.setIds()
      this.handleResData()
      if (evt.added) {
        this.addToAnythOrReplace(this.newList, this.allStepList)
        this.stepChange()
      }
    },
    // 子项change
    childChange(evt, index, cIndex) {
      // console.log(evt, index, cIndex)
      // 排序
      this.moveSort(evt, index, cIndex)
      this.setIds()
      this.handleResData()
      if (evt.added) {
        this.addToAnythOrReplace(this.newList, this.allStepList)
        this.stepChange()
      }
    },
    // 设置 折叠 ids
    setActiveNames() {
      this.newList.forEach((item, index) => {
        let activeNames = []
        item.children.forEach(el => {
          activeNames = activeNames.concat(el.id)
        })
        this.$set(this.newList[index], 'activeNames', activeNames)
      })
    },
    // 设置 ids
    setIds() {
      // dragList 设置 merge ids
      this.newList.forEach((item, index) => {
        let ids = []
        item.children.forEach(el => {
          ids = ids.concat(el.id)
        })
        this.$set(this.newList[index], 'ids', ids)
      })
      this.compareList = _.cloneDeep(this.newList)
    },
    // 合并/迁移排序 
    moveSort(evt, index, cIndex) {
      // 清空checked
      this.newList = this.clearChecked(this.newList)
      // 移动时，移除draggable默认添加项
      this.newList[index].children[cIndex].children.splice(0, this.newList[index].children[cIndex].children.length, ...this.newList[index].children[cIndex].children.filter(itemA => !this.selectedItems.map(itemB => itemB.id).includes(itemA.id)))
      // 只向被添加元素向顶部追加选中项：selectedItems
      if (evt.added) {
        this.newList[index].children[cIndex].children.splice(0, 0, ...this.selectedItems)
      }
    },

    // 清空选中
    clearChecked(items) {
      return items.map(item => {
        if (Array.isArray(item.children)) {
          item.children = this.clearChecked(item.children);
        }
        if (item.checked) {
          item.checked = false;
        }
        return item;
      })
    },
  },
}
</script>

<style>
.app {
  display: flex;
}

.btn-box {
  display: flex;
}

.btn-box button[disabled] {
  cursor: not-allowed;
}

.freeze {
  color: orange;
}

.drag {
  color: brown;
}

.json-pretty {
  display: flex;
}

.json-pretty>div {
  padding: 0 10px;
}

.group-wrap,
.group {
  display: flex;
  justify-content: space-between;
}

.group-item,
.item-child {
  min-height: 30px;
  min-width: 150px;
  margin: 0 10px;
  padding: 10px;
}

.group-item {
  width: 210px;
  min-height: 300px;
  border: 1px solid #d4259d;
}

.item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-top p {
  display: flex;
  flex-wrap: wrap;
}

.item-top h4.top {
  color: orange;
}

.item-child {
  border: 1px solid #8317bd;
}

.group-item h4 {
  cursor: move;
}

.child {
  display: flex;
  cursor: move;
}

.child:hover {
  background-color: antiquewhite;
}

.child span {
  padding: 5px;
  font-size: 12px;
}

.child span.move {
  color: orange;
}
</style>
