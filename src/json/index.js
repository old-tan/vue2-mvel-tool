export const list = [
  {
    id: 1,
    children: [
      {
        id: 1,
        name: "星巴克",
        children: [
          {
            id: 1,
            name: '星巴克STARBUCKS',
            pName: '淘鲜达',
            sid: 1,
            type: '食品酒水',
            checked: false,
          },
          {
            id: 2,
            name: "星巴克2",
            pName: '考拉2',
            sid: 1,
            type: '食品酒水2',
            checked: false,
          },
          {
            id: 3,
            name: "星巴克3",
            pName: '考拉3',
            sid: 1,
            type: '食品酒水3',
            checked: false,
          },
          {
            id: 4,
            name: "星巴克4",
            pName: '考拉4',
            sid: 1,
            type: '食品酒水4',
            checked: false,
          },
          {
            id: 5,
            name: "星巴克5",
            pName: '考拉5',
            sid: 1,
            type: '食品酒水5',
            checked: false,
          },
        ]
      }
    ]
  },
  {
    id: 2,
    children: [
      {
        id: 2,
        name: "星巴克/STARBUCKS",
        children: [
          {
            id: 11,
            name: "STARBUCKS11",
            pName: '天猫11',
            sid: 2,
            type: '食品酒水11',
            checked: false,
          },
          {
            id: 12,
            name: "STARBUCKS-12",
            pName: '天猫12',
            sid: 2,
            type: '食品酒水12',
            checked: false,
          },
          {
            id: 13,
            name: "STARBUCKS-13",
            pName: '天猫13',
            sid: 2,
            type: '食品酒水13',
            checked: false,
          },
          {
            id: 14,
            name: "STARBUCKS-14",
            pName: '天猫14',
            sid: 2,
            type: '食品酒水14',
            checked: false,
          },
          {
            id: 15,
            name: "STARBUCKS-15",
            pName: '天猫15',
            sid: 2,
            type: '食品酒水15',
            checked: false,
          },
        ]
      }
    ]
  },
  {
    id: 3,
    children: [
      {
        id: 3,
        name: "星巴克咖啡",
        children: [
          {
            id: 21,
            name: "星巴克咖啡1",
            pName: '天猫111',
            sid: 3,
            type: '食品酒水1',
            checked: false,
          },
          {
            id: 22,
            name: "星巴克咖啡2",
            pName: '天猫222',
            sid: 3,
            type: '食品酒水2',
            checked: false,
          },
          {
            id: 23,
            name: "星巴克咖啡3",
            pName: '天猫333',
            sid: 3,
            type: '食品酒水3',
            checked: false,
          },
        ]
      }
    ]
  },
  {
    id: 4,
    children: [
      {
        id: 4,
        name: "星巴克饮品",
        children: [
          {
            id: 25,
            name: "星巴克饮品1",
            pName: '京东111',
            sid: 4,
            type: '饮品',
            checked: false,
          },
          {
            id: 26,
            name: "星克饮品2",
            pName: '京东222',
            sid: 4,
            type: '饮品',
            checked: false,
          },
          {
            id: 27,
            name: "星克饮品3",
            pName: '京东333',
            sid: 4,
            type: '饮品',
            checked: false,
          },
        ]
      }
    ]
  }
]

// export const ruleList = [{ "visible": false, "visible1": false, "bracket": 1, "props5": "&&", "children": [{ "visible": false, "visible1": false, "bracket": 1, "props5": "&&", "children": [{ "visible": false, "visible1": false, "bracket": 1, "props5": "&&", "children": [{ "visible": false, "visible1": false, "props5": "&&", "rule": { "not": false, "props1": "title", "props2": "contain", "props3": "", "props4": "&&" }, "children": [] }] }] }] }]
// export const ruleList = [{"visible":false,"visible1":false,"bracket":1,"props5":"&&","children":[{"visible":false,"visible1":false,"bracket":1,"props5":"&&","children":[{"visible":false,"visible1":false,"props5":"&&","rule":{"not":false,"props1":"title","props2":"contain","props3":"","props4":"&&"},"children":[]}]}]}]
// export const ruleList = [{"visible":false,"visible1":false,"bracket":1,"props5":"&&","children":[{"visible":false,"visible1":false,"props5":"&&","rule":{"not":false,"props1":"title","props2":"contain","props3":"","props4":"&&"},"children":[]}]}]
export const ruleList = [{ "visible": false, "visible1": false, "props5": "&&", "rule": { "not": false, "props1": "title", "props2": "contain", "props3": "", "props4": "&&" }, "children": [] }]