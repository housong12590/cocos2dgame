/**
 * Created by huangxinping on 2/13/14.
 *
 * 全局数据变量
 *
 */

// 当前关卡
var g_current_level = 1;

// 关卡描述
var g_state_level = [
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
//    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1

];

// 关卡最大值
var g_level_max = 24;

// 关卡问题回答提示
var g_level_answer_tip = true;

// 获取到的得分（通关后会有显示）
var g_current_score = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];

// 引导页显示
var g_guide_state = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];

// 声音开关
var g_audio_state = true;

// 方向枚举
var DIRECTION_UP = 0;
var DIRECTION_DOWN = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 3;

// 是否本地服务
var LOCAL_SERVICE = 0;

// 游戏中使用数据
var level_config = [
    { // 关卡1
        torch:[
            [160,768-656+20],
            [167,768-527+20],
            [179,768-384+20],
            [52,768-503+20],
            [140,768-208+20],
            [44,768-51+20],
            [145,768-52+20],
            [417,768-63+20],
            [471,768-467+20],
            [581,768-639+20],
            [670,768-450+20],
            [614,768-294+20],
            [577,768-179+20],
            [748,768-249+20],
            [821,768-302+20],
            [825,768-56+20],
            [820,768-556+20],
            [951,768-202+20],
            [958,768-267+20],
            [983,768-413+20]
        ],
        answer:[ // 问题列表
            {
                title:"Who is the first disseminator or reviewer of A Dream of Red Mansions?",
                keys:["A.Gao E    ","B.Cheng Weiyuan   ","C.Ghost Stories","D.Chin-yen Chai"],
                result:4
            },
            {
                title:"Who is not one of First Register of Twelve Beauties of Jinling?",
                keys:["A.Miaoyu  ","B.Qiaojie  ","C.Xue Baoqin ","D.Shi Xiangyun"],
                result:4
            },
            {
                title:"Which one is the hometown of Lin Daiyu?",
                keys:["A.Suzhou    ","B.Hangzhou   ","C.Yangzhou   ","D.Jinling"],
                result:4
            },
            {
                title:"Who manages the funeral of Qin Keqing?",
                keys:["A.Madam You  ","B.Wang Xifeng ","C.Jia Lian ","D.Jia Zheng"],
                result:4
            },
            {
                title:"Who said “Girls are made of water, men of mud”?",
                keys:["A.Liu Xianglian ","B.Jia Baoyu ","C.Lin Daiyu ","D.Shi Xiangyun"],
                result:4
            }
        ],
        roleDirection:3, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:2,
                position:[710,768-661]
            },
            {
                type:1,
                position:[88,768-646]
            }
        ],
        doorOffset:[18,0], // 门的偏移
        grid:[70,70], // 网格大小
        gridOffset:[20,0], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [0,0,2,0,0,0,6,6,6,3,6,1,0,6],
            [6,6,6,6,6,0,6,6,0,0,0,0,0,6],
            [6,6,6,6,6,0,6,0,0,0,6,6,0,6],
            [6,0,0,0,6,0,6,5,6,0,0,6,0,6],
            [6,0,6,0,6,0,6,0,6,0,0,0,0,6],
            [6,0,6,0,6,0,6,0,6,6,6,6,0,6],
            [6,0,6,0,6,0,0,0,6,5,0,6,0,6],
            [6,5,6,0,0,0,0,0,6,0,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡2
        torch:[
            [184,768-20],
            [440,768-46],
            [173,768-165],
            [441,768-170],
            [598,768-174],
            [727,768-109],
            [887,768-108],
            [980,768-163],
            [754,768-235],
            [986,768-239],
            [218,768-316],
            [505,768-340],
            [819,768-329],
            [985,768-363],
            [59,768-490],
            [261,768-483],
            [463,768-478],
            [632,768-482],
            [798,768-550],
            [156,768-643],
            [580,768-630],
            [946,768-634]
        ],
        answer:[ // 问题列表
            {
                title:"Where dose Miaoyu live?",
                keys:["A.Iron Threshold Temple   ","B.House of Reunion","C.Reed Snow Cottage     ","D.Green Lattice Nunnery"],
                result:4
            },
            {
                title:"In Grand View Garden, what is the name of Li Wan’s house?",
                keys:["A.Paddy-Sweet Cottage   ","B.Studio of Autumn Freshness","C.Alpinia Park          ","D.the Pavilion of Variegated Splendour"],
                result:4
            },
            {
                title:"Who is very clever and competent but marries a man far away from home?",
                keys:["A.Yingchun  ","B.Xue Baoqin  ","C.Tanchun  ","D.Shi Xiangyun"],
                result:4
            },
            {
                title:"Who is cowardly and trampled to die by her husband?",
                keys:["A.Tanchun  ","B.Xiangling  ","C.Yingchun  ","D.Qin Keqing"],
                result:4
            },
            {
                title:"Who does this sentence “Too much cunning in plotting and scheming is the cause of her own undoing” refer to?",
                keys:["A.Wang Xifeng  ","B.Qin Keqing ","C.Lin Daiyu","D.Jia Yuanchun"],
                result:4
            },
        ],
        roleDirection:2, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:1,
                position:[797,768-119]
            }
        ],
        doorOffset:[4,25], // 门的偏移
        grid:[75,75], // 网格大小
        gridOffset:[-13,36-75], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,3,0,0,0,5,6,0,0,5,0,0,0,6],
            [6,6,6,6,0,0,6,0,6,6,6,6,0,6],
            [6,0,0,0,0,0,1,0,0,0,6,0,0,6],
            [6,0,6,6,0,6,0,0,0,0,0,0,0,2],
            [6,0,6,0,0,6,6,0,0,0,6,6,0,6],
            [6,0,6,0,0,0,0,0,0,0,0,0,0,6],
            [6,6,6,6,6,0,6,6,6,5,6,6,0,6],
            [6,0,0,0,0,0,0,0,6,0,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡3
        torch:[
            [198,768-67],
            [431,768-37],
            [728,768-58],
            [30,768-184],
            [137,768-207],
            [504,768-195],
            [972,768-162],
            [325,768-300],
            [690,768-260],
            [950,768-262],
            [710,768-320],
            [172,768-368],
            [574,768-390],
            [40,768-450],
            [421,768-457],
            [814,768-435],
            [263,768-535],
            [710,768-516],
            [30,768-598],
            [932,768-616],
            [580,768-628]
        ],
        answer:[ // 问题列表
            {
                title:"Who dose “Cold Fragrance Pills” belong to?",
                keys:["A.Xue Baochai    ","B.Lin Daiyu   ","C.Baoyu   ","D.Li Wan"],
                result:4
            },
            {
                title:"Who does this sentence “Her dusky arched eyebrows were knitted and yet not frowning, her speaking eyes held both merriment and sorrow” describe?",
                keys:["A.Qin Keqing     ","B.Jia Yingchun  ","C.Second Sister ","D.Lin Daiyu"],
                result:4
            },
            {
                title:"Who are thought by readers as the shadows of Baochai and Daiyu?",
                keys:["A.Baoqin; Qingwen  ","B.Xiren; Qingwen ","C.Xiren; Xiangling ","D.Baoqin; Xiangling"],
                result:4
            },
            {
                title:"Who does this poem “Nothing avail her gentleness and compliance; Osmanthus and orchid with her fragrance vie; But this prize is borne off by an actor, and luck passes the young master by.” Describe?",
                keys:["A.Qingwen ","B.Xiangling  ","C.Xiren   ","D.Mingyan"],
                result:4
            },
            {
                title:"Who does those words “proper, charming, generous, tactful, and accommodating ways” refer to?",
                keys:["A.Lin Daiyu","B.Xue Baochai  ","C.Jia Tanchun ","D.Shi Xiangyun"],
                result:4
            },
        ],
        roleDirection:2, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,1],
                    [8,1]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [8,5],
                    [12,5]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [1,8],
                    [4,8]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[12,35], // 门的偏移
        grid:[75,75], // 网格大小
        gridOffset:[-15,-30], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,3,6,0,0,0,0,0,0,6,1,0,0,6],
            [6,0,0,0,6,0,6,6,6,6,6,0,0,6],
            [6,0,6,0,6,0,5,0,0,6,0,0,6,6],
            [6,0,6,0,6,0,0,0,0,6,0,0,0,2],
            [6,0,6,0,6,6,6,6,0,0,0,0,0,6],
            [6,0,0,0,0,6,0,0,0,6,6,6,0,6],
            [6,0,6,6,0,6,0,6,6,6,0,0,0,6],
            [6,0,0,0,5,6,0,0,0,5,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡4
        torch:[
            [184,768-50],
            [422,768-54],
            [788,768-46],
            [929,768-48],
            [62,768-88],
            [566,768-116],
            [826,768-142],
            [43,768-190],
            [304,768-216],
            [490,768-214],
            [976,768-264],
            [346,768-316],
            [172,768-346],
            [826,768-360],
            [58,768-504],
            [422,768-470],
            [716,768-483],
            [973,768-495],
            [46,768-607],
            [580,768-642],
            [875,768-643]
        ],
        answer:[ // 问题列表
            {
                title:"Who can represent “Her heart is loftier than the sky, but her person is of low degree”?",
                keys:["A.Tanchun   ","B.Qingwen  ","C.Jia Yuanchun  ","D.Miaoyu"],
                result:4
            },
            {
                title:"Who does those words describe “Her gold-filigree tiara was set with jewels and pearls. Her hair-clasps, in the form of five phoenixes facing the sun, had pendants of pearls.”?",
                keys:["A.Lin Daiyu  ","B.Xue Baochai  ","C.Wang Xifeng  ","D.Qin Keqing"],
                result:4
            },
            {
                title:"Who does the poem “Alas for her wifely virtue, her wit to sing of willow-down, poor maid! Buried in snow the broken golden hairpin and hanging in the wood the belt of jade.” talk about?",
                keys:["A.Tanchun; Yingchun  ","B.Baochai; Daiyu  ","C.Yuanchun; Daiyu  ","D.Baochai; Yuanchun"],
                result:4
            },
            {
                title:"Who does the poem “Absurdly he courts care and melancholy and raves like any madman in his folly; for though endowed with handsome looks is he, his heart is lawless and refractory.” talk about?",
                keys:["A.Baoyu   ","B.Jia Lian   ","C.Jia Rong  ","D.Jia Huan"],
                result:4
            },
            {
                title:"Who does those words “my dreadful son, the bane of my life, who torments us all in this house like a real devil” and “First in this world for uselessness is he, Second to none in his deficiency” refer to?",
                keys:["A.Xue Pan  ","B.Jia Zhen    ","C.Jia Lian  ","D.Baoyu"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [1,2],
                    [4,2]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [8,4],
                    [10,4]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [2,6],
                    [4,6]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:1,
                position:[412,768-210]
            }
        ],
        doorOffset:[20,15], // 门的偏移
        grid:[73,73], // 网格大小
        gridOffset:[0,-14], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,6,0,0,0,0,6,1,0,0,0,0,6],
            [6,0,0,0,0,6,0,0,0,5,0,6,0,6],
            [6,6,6,0,6,6,6,0,0,0,0,6,0,6],
            [6,6,6,0,6,0,0,0,0,0,0,0,0,6],
            [0,0,0,2,0,0,0,0,0,6,5,6,0,6],
            [6,6,0,0,0,6,0,0,0,0,0,6,0,6],
            [6,0,0,5,0,6,6,6,0,6,6,6,0,6],
            [6,0,0,6,0,0,0,0,0,6,3,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡5
        torch:[
            [51,768-82],
            [219,768-40],
            [421,768-45],
            [803,768-45],
            [824,768-112],
            [64,768-249],
            [571,768-130],
            [286,768-258],
            [498,768-247],
            [666,768-231],
            [963,768-261],
            [163,768-352],
            [46,768-497],
            [242,768-468],
            [466,768-474],
            [755,768-431],
            [974,768-401],
            [155,768-657],
            [372,768-648],
            [580,768-647],
            [737,768-647],
            [949,768-649]
        ],
        answer:[ // 问题列表
            {
                title:"Which one of the following sentences is not from A Dream of Red Mansions?",
                keys:["A.Unfit to mend the azure sky, I passed some years on earth to no avail;","B.Girls are made of water, men of mud,’ he declares. ‘I feel clean and refreshed when I’m with girls but find men dirty and stinking.","C.Shall I compare thee to a summer's day? Thou art more lovely and more temperate.","D.“All men long to be immortals, yet to riches and rank each aspires;"],
                result:4
            },
            {
                title:"Who was kidnapped at an early age?",
                keys:["A.Yuanyang  ","B.Qingwen  ","C.Xiren  ","D.Xiangling"],
                result:4
            },
            {
                title:"Which two characters does the following two sentences belong to? “She was tall and slim, with an oval face, well-defined eyebrows and lovely dancing eyes. She seemed elegant and quick-witted with an air of distinction. To look at her was to forget everything vulgar.” And “Her cheeks were the texture of newly ripened lichees, her nose as sleek as goose fat. Gentle and demure, she looked very approachable.”",
                keys:["A.Tanchun; Yingchun   ","B.Tanchun; Xue Baochai  ","C.Shi Xiangyun; Yingchun  ","D.Shi Xiangyun; Xue Baochai"],
                result:4
            },
            {
                title:"Who is the most dissocial and coldest one of the four Jia girls?",
                keys:["A.Yuanchun  ","B.Yingchun  ","C.Tanchun  ","D.Xichun"],
                result:4
            },
            {
                title:"5.Which one is a maid of Lin Daiyu?",
                keys:["A.Xueyan  ","B.Qingwen  ","C.Sheyue ","D.Yinger"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [10,8],
                    [12,8]
                ]
            },
            {
                "direction":1,
                "fat":[
                    [5,4],
                    [5,7]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[20,10], // 门的偏移
        grid:[73,73], // 网格大小
        gridOffset:[0,-14], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,0,0,0,0,0,0,0,0,0,6,6,6],
            [0,2,0,0,0,4,6,6,5,0,0,0,4,6],
            [6,0,6,6,0,0,6,0,0,6,0,0,0,6],
            [6,0,0,0,0,0,0,1,0,0,0,0,0,6],
            [6,0,6,0,0,0,6,0,0,0,0,5,0,6],
            [6,0,6,6,6,0,6,0,0,6,6,6,0,6],
            [6,0,6,0,0,0,0,0,0,6,0,0,0,6],
            [6,0,5,0,0,0,0,4,6,6,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,3,6]
        ]
    },
    { // 关卡6
        torch:[
            [210,768-49],
            [421,768-51],
            [609,768-50],
            [789,768-53],
            [38,768-122],
            [371,768-152],
            [565,768-191],
            [818,768-159],
            [988,768-189],
            [136,768-225],
            [495,768-271],
            [702,768-250],
            [37,768-453],
            [195,768-431],
            [797,768-426],
            [977,768-401],
            [463,768-491],
            [136,768-532],
            [637,768-564],
            [797,768-538],
            [80,768-623],
            [229,768-634],
            [848,768-638]
        ],
        answer:[ // 问题列表
            {
                title:"Where did they hold their poetry club for the first time?",
                keys:["A.Paddy-Sweet Cottage   ","B.Alpinia Park","C.Studio of Autumn Freshness      ","D.the Pavilion of Variegated Splendour"],
                result:4
            },
            {
                title:"What is the relationship between Jia Huan and Baoyu, and Jia Lan and Baoyu?",
                keys:["A.Nephew; Brother  ","B.Brother; Nephew ","C.Nephew; Nephew ","D.Brother; Brother"],
                result:4
            },
            {
                title:"Which one is the maid of Yingchun?",
                keys:["A.Siqi   ","B.Ruhua  ","C.Caiyun  ","D.Xiaohong"],
                result:4
            },
            {
                title:"Who does Yinger belong to?",
                keys:["A.Xue Baochai   ","B.Lin Daiyu  ","C.Jia Baoyu  ","D.Jia Yingchun"],
                result:4
            },
            {
                title:"How does Second Sister kill herself?",
                keys:["A.Drowning herself   ","B.Take poison   ","C.Hang herself  ","D.Swallow gold"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,1],
                    [5,1]
                ]
            },
            {
                "direction":1,
                "fat":[
                    [3,4],
                    [3,7]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [7,4],
                    [12,4]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[20,2], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-20,-28], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,4,6,0,0,0,6,4,1,0,0,6,6,6],
            [6,0,0,0,0,6,6,6,0,0,0,6,4,6],
            [6,0,6,6,5,0,6,0,0,6,0,6,2,0],
            [6,0,6,0,0,0,6,0,0,0,0,0,0,6],
            [6,0,0,0,0,0,0,0,0,0,0,6,0,6],
            [6,0,6,0,0,0,0,0,0,0,6,6,0,6],
            [6,0,6,0,6,6,6,6,6,0,6,0,0,6],
            [3,5,0,5,0,0,4,6,6,0,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡7
        torch:[
            [95,768-177],
            [228,768-102],
            [585,768-36],
            [779,768-32],
            [970,768-133],
            [782,768-231],
            [532,768-289],
            [195,768-396],
            [640,768-392],
            [973,768-360],
            [113,768-504],
            [349,768-541],
            [502,768-519],
            [820,768-503],
            [236,768-655],
            [954,768-635]
        ],
        answer:[ // 问题列表
            {
                title:"“A Torn Fan Wins a Smile from a Maid”, who is the maid?",
                keys:["A.Zijuan  ","B.Qiuwen   ","C.Qingwen ","D.Yinger"],
                result:4
            },
            {
                title:"What is the family name of Xiren?",
                keys:["A.Jin      ","B.Li    ","C.Liu    ","D.Hua"],
                result:4
            },
            {
                title:"“The lisper loves to rattle away,” “Fancy saying ai instead of er like that”, who is she?",
                keys:["A.Xue Baoqin   ","B.Shi Xiangyun  ","C.Xing Xiuyan  ","D.Tanchun"],
                result:4
            },
            {
                title:"Their poetry club has two names, what is the second name and who is the hostess of it?",
                keys:["A.Chrysanthemum Society; Lin Daiyu  ","B.Peach-Blossom Society; Lin Daiyu","C.Peach-Blossom Society; Xue Baochai ","D.Chrysanthemum Society; Jia Baoyu"],
                result:4
            },
            {
                title:"What are the alias names of Lin Daiyu, Xue Baochai and Li Wan in the poetry club?",
                keys:["A.Goddess of the Bamboos; Lady of the Alpinia; The Old Peasant of Sweet Paddy","B.Queen of the Bamboos; Lady of the Alpinia; The Old Peasant of Sweet Paddy","C.Goddess of the Bamboos; Lady of the Alpinia; Master of Autumn Freshness","D.Queen of the Bamboos; The Stranger Under the Plantain; The Old Peasant of Sweet Paddy"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [1,6],
                    [5,6]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [9,7]
                     ]
                }
            ],
            change:[
                {
                    type:0,
                    info:[
                        [12,3]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:3,
                position:[621,768-284]
            }
        ],
        doorOffset:[0,15], // 门的偏移
        grid:[73,73], // 网格大小
        gridOffset:[0,-10], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,0,6,6,6,6],
            [6,6,4,6,6,4,6,0,0,2,0,6,4,6],
            [6,6,0,0,0,5,6,0,0,0,0,6,0,6],
            [3,0,0,0,6,0,4,0,0,0,6,6,0,6],
            [6,0,0,0,0,0,6,6,6,0,0,0,5,6],
            [6,6,6,0,0,0,0,0,6,0,6,0,0,6],
            [6,0,0,0,0,0,6,0,4,0,7,0,0,6],
            [6,6,6,5,6,0,6,0,6,0,6,6,6,6],
            [4,0,0,0,0,0,6,0,0,0,0,1,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡8
        torch:[
            [169,768-119],
            [592,768-62],
            [786,768-54],
            [969,768-133],
            [63,768-247],
            [582,768-222],
            [793,768-229],
            [298,768-362],
            [676,768-409],
            [974,768-361],
            [524,768-499],
            [819,768-504],
            [81,768-584],
            [365,768-562],
            [236,768-676],
            [954,768-634]
        ],
        answer:[ // 问题列表
            {
                title:"Who is a page boy of Baoyu?",
                keys:["A.Wanger   ","B.Caiming  ","C.Jia Yucun   ","D.Mingyan"],
                result:4
            },
            {
                title:"Which of the followings does Xichun do well in?",
                keys:["A.Paper-cutting  ","B.Weaving  ","C.Painting    ","D.Singing "],
                result:4
            },
            {
                title:"“Old Friend of Pillowed Iridescence” is the alias name of  _? “The Stranger Under the Plantain” is the alias name of   _?",
                keys:["A.Jia Tanchun; Shi Xiangyun    ","B.Jia Tanchun; Jia Xichun  ","C.Shi Xiangyun; Jia Tanchun     ","D.Jia Yingchun; Jia Tanchun"],
                result:4
            },
            {
                title:"Who does this poem describe? “Love boundless as sea and sky is but illusion;When lovers meet, lust must be king.”",
                keys:["A.Qin Keqing  ","B.Xiren  ","C.Qingwen  ","D.Wang Xifeng "],
                result:4
            },
            {
                title:"Who passed away first among the “Twelve beauties of Jinling”?",
                keys:["A.Lin Daiyu  ","B.Qin Keqing  ","C.Miaoyu    ","D.Li Wan"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [7,6]
                    ]
                }
            ],
            change:[
                {
                    type:0,
                    info:[
                        [1,5]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[25,5], // 门的偏移
        grid:[73,73], // 网格大小
        gridOffset:[2,-5], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,4,6,6,4,6,6,6,0,0,0,0,6,6],
            [6,0,0,0,5,0,0,6,0,0,0,0,0,6],
            [6,7,6,0,0,0,0,6,0,6,6,0,0,6],
            [6,0,0,0,0,0,0,6,0,6,3,0,0,6],
            [6,0,6,6,6,6,5,6,0,6,0,6,0,6],
            [6,0,0,0,0,0,0,0,0,0,0,0,0,6],
            [6,4,2,0,6,6,6,6,0,6,0,6,6,6],
            [6,6,0,0,6,4,0,0,5,0,1,0,0,6],
            [6,6,0,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡9
        torch:[
            [392,768-26],
            [669,768-45],
            [1010,768-35],
            [213,768-114],
            [828,768-134],
            [532,768-177],
            [43,768-244],
            [983,768-244],
            [204,768-312],
            [398,768-285],
            [901,768-381],
            [374,768-495],
            [661,768-494],
            [937,768-501],
            [34,768-553],
            [413,768-648],
            [836,768-647]
        ],
        answer:[ // 问题列表
            {
                title:"Who is the author of A Dream of Red Mansions?",
                keys:["A.Mo Yan ","B.Lu Xun   ","C.Cao Xueqin   ","D.Shakespeare"],
                result:4
            },
            {
                title:"Who are they? “One is an immortal flower of fairyland, the other fair flawless jade”.",
                keys:["A.Jia Baoyu; Lin Daiyu  ","B.Lin Daiyu; Jia Baoyu ","C.Jia Baoyu; Qin Zhong  ","D.Xue Baochai; Lin Daiyu"],
                result:4
            },
            {
                title:"At the funeral of Qin Keqing, who praised Jia Baoyu as “Your son is truly a dragon’s colt or young phoenix. May I venture to predict that in time to come this young phoenix may even surpass the old one?”?",
                keys:["A.Prince of Dongping  ","B.the Prince of Nanan ","C.the Prince of Xining   ","D.the Prince of Beijing"],
                result:4
            },
            {
                title:"At which Festival did Yuanchun visit her family?",
                keys:["A.Lantern Festival       ","B.Mid-autumn Festival  ","C.Dragon Boat Festival   ","D.the Double Ninth Festival"],
                result:4
            },
            {
                title:"“First cup to taste, second to quench a fool’s thirst, third to water an ox or donkey”, who said it?",
                keys:["A.Lin Daiyu     ","B.Jia Baoyu    ","C.Miaoyu    ","D.Shi Xiangyun"],
                result:4
            },
        ],
        roleDirection:2, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [1,4]
                    ]
                },
                {
                    type:1,
                    info:[
                        [4,8]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [4,8]
                    ]
                },
                {
                    type:0,
                    info:[
                        [11,7]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:3,
                position:[919,768-152]
            }
        ],
        doorOffset:[10,20], // 门的偏移
        grid:[73,73], // 网格大小
        gridOffset:[-1,-14], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
            // 5 - 碗)
            [6,3,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,6,6,0,0,0,0,0,6,0,0,2,0],
            [6,0,6,0,7,5,0,6,6,6,0,6,6,6],
            [6,0,6,0,0,0,0,0,0,0,0,0,0,6],
            [6,0,6,0,0,6,6,6,6,0,0,0,8,0],
            [6,0,0,0,0,0,0,5,0,0,0,0,6,6],
            [6,0,0,0,0,6,6,0,6,0,0,0,0,6],
            [6,0,6,6,6,6,0,0,6,6,6,0,6,6],
            [6,0,0,1,0,0,0,8,0,0,6,5,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡10
        torch:[
            [119,768-89],
            [571,768-41],
            [785,768-31],
            [653,768-201],
            [972,768-143],
            [892,768-244],
            [88,768-263],
            [287,768-298],
            [736,768-381],
            [973,768-364],
            [796,768-424],
            [504,768-459],
            [41,768-568],
            [391,768-553],
            [223,768-633]
        ],
        answer:[ // 问题列表
            {
                title:"“In Concave Crystal Lodge girls composing a poem lament their loneliness”, who are the girls?",
                keys:["A.Xue Baochai; Lin Daiyu  ","B.Lin Daiyu; Tanchun  ","B.Shi Xiangyun; Xue Baoqin ","D.Lin Daiyu; Shi Xiangyun"],
                result:4
            },
            {
                title:"“Proud recluse, with what hermit are you taking refuge? All flowers must bloom, what makes you bloom so late?” this poem is written by Lin Daiyu. What flower does this poem talk about?",
                keys:["A.Osmanthus   ","B.Lotus   ","C.Chrysanthemum  ","D.Plum blossom"],
                result:4
            },
            {
                title:"“The only clean things in that East Mansion of yours are those two stone lions at the gate”. Who said it?",
                keys:["A.Qingwen   ","B.Third Sister  ","C.Jiao Da  ","D.Liu Xianglian"],
                result:4
            },
            {
                title:"Who had written ten riddles in the form of quatrains, about famous places she had visited in different provinces?",
                keys:["A.Xue Baochai   ","B.Xing Xiuyan  ","C.Xue Baoqin   ","D.Shi Xiangyun"],
                result:4
            },
            {
                title:"Which of the followings is not one of the “Four Great Families” in A Dream of Red Mansions?",
                keys:["A.Jia family   ","B.Cao family    ","C.Xue family   ","D.Wang family"],
                result:4
            },
        ],
        roleDirection:0, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [2,6]
                    ]
                },
                {
                    type:1,
                    info:[
                        [4,7]
                    ]
                }
            ],
            change:[

            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[24,33], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-20,-44], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,6,0,0,6,0,3,6,4,0,0,6,6,6],
            [6,0,0,1,6,0,5,6,0,0,5,0,4,6],
            [6,0,0,0,6,0,6,6,6,0,0,0,6,6],
            [6,6,0,5,6,0,0,8,0,0,6,0,6,6],
            [6,4,0,0,6,0,0,0,0,0,6,0,0,6],
            [6,6,0,6,6,0,6,6,6,0,6,0,0,6],
            [6,6,0,0,0,0,0,7,6,0,0,0,0,6],
            [6,0,0,0,6,6,0,0,0,0,6,6,2,0],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡11
        torch:[
            [105,768-49],
            [506,768-64],
            [656,768-64],
            [845,768-55],
            [334,768-144],
            [591,768-126],
            [975,768-134],
            [29,768-236],
            [449,768-255],
            [742,768-204],
            [975,768-271],
            [28,768-424],
            [389,768-397],
            [602,768-405],
            [768,768-407],
            [137,768-539],
            [402,768-553],
            [637,768-520],
            [757,768-503],
            [975,768-491],
            [193,768-640],
            [589,768-642],
            [882,768-642]
        ],
        answer:[ // 问题列表
            {
                title:"Who sent Qiutong as a concubine to Jia Lian?",
                keys:["A.Jia Zheng  ","B.Jia Zhen  ","C.Lady Xing  ","D.Jia She"],
                result:4
            },
            {
                title:"When they were searching the Grand View Garden, who contradicted Wang Xifeng and hit Wang Shanbao’s wife on her face?",
                keys:["A.Tanchun   ","B.Qingwen  ","C.Xichun  ","D.Xiren"],
                result:4
            },
            {
                title:"Which one of the poets does Lin Daiyu like least?",
                keys:["A.Li Bai   ","B.Du Fu  ","C.Bai Juyi   ","D.Li Shangyin"],
                result:4
            },
            {
                title:"Which of the followings is not the alias name of A Dream of Red Mansions?",
                keys:["A.Record of the Passionate Monk  ","B.Precious Mirror of Love","C.The Twelve Beauties of Jinling   ","D.The match of the gold and jade"],
                result:4
            },
            {
                title:"“An ambitious girl loses her handkerchief as an enticement”, who is the girl?",
                keys:["A.Lin Daiyu  ","B.Qingwen  ","C.Zhuier  ","D.Xiaohong"],
                result:4
            },
        ],
        roleDirection:2, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [2,1],
                    [6,1]
                ]
            },
            {
                "direction":1,
                "fat":[
                    [9,8],
                    [9,7]
                ]
            },
            {
                "direction":0,
                "fat":[
                    [1,3],
                    [3,3]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [3,3]
                    ]
                },
                {
                    type:1,
                    info:[
                        [3,8]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [8,6]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:3,
                position:[240,768-146]
            },
            {
                type:3,
                position:[597,768-226]
            },
            {
                type:3,
                position:[813,768-237]
            },
            {
                type:3,
                position:[441,768-353]
            },
            {
                type:3,
                position:[492,768-517]
            },
            {
                type:3,
                position:[862,768-528]
            }
        ],
        doorOffset:[21,12], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[2,-5], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
            [3,0,0,0,5,0,0,6,6,9,0,0,2,0],
            [6,6,6,6,6,0,0,6,0,0,0,0,6,6],
            [6,0,0,0,1,0,6,6,6,0,6,6,6,6],
            [6,0,0,6,0,0,0,0,6,0,6,0,0,6],
            [6,0,0,6,0,6,6,0,6,0,6,0,7,6],
            [6,0,0,6,0,0,0,0,0,0,0,0,5,6],
            [6,5,6,6,0,6,6,6,6,0,6,6,6,6],
            [6,0,9,0,0,0,0,9,0,0,0,0,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡12
        torch:[
            [138,768-54],
            [409,768-54],
            [861,768-47],
            [269,768-137],
            [672,768-149],
            [838,768-149],
            [142,768-299],
            [303,768-303],
            [984,768-225],
            [572,768-376],
            [415,768-428],
            [884,768-451],
            [995,768-464],
            [149,768-541],
            [365,768-526],
            [672,768-537],
            [34,768-619],
            [303,768-686],
            [841,768-655]
        ],
        answer:[ // 问题列表
            {
                title:"After married Second Sister in secret, where did Jia Lian go?",
                keys:["A.Yangzhou  ","B.Suzhou  ","C.Jinling  ","D.Pinganzhou"],
                result:4
            },
            {
                title:"“A pretty maid wrongly accused dies an untimely death；lovely actresses sever worldly ties，and join a Nunnery”. Who is the “pretty maid” and who is the “lovely actress”?",
                keys:["A.Qingwen; Ruiguan   ","B.Wuer; Fangguan ","C.Jinchuan; Ouguan    ","D.Qingwen; Fangguan"],
                result:4
            },
            {
                title:"What are the words on Baoyu’s jade?",
                keys:["A.Never Lose, Never Forget, Eternal Life, Lasting Prosperity ","B.Never Leave, Never Abandon, Fresh Youth, Eternally Lasting.","C.Unfit to mend the azure sky, I passed some years on earth to no avail;","D.Pages full of fantastic talk, penned with bitter tears;"],
                result:4
            },
            {
                title:"Who loves Jia Qiang among the twelve actresses?",
                keys:["A.Ouguan  ","B.Lingguan  ","C.Fangguan  ","D.Ruiguan"],
                result:4
            },
            {
                title:"Who gave “a string of beads” as a gift to Baoyu?",
                keys:["A.The prince of Beijing ","B.Jiang Yuhan ","C.Qin Zhong ","D.Liu Xianglian"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [6,5],
                    [6,8]
                ]
            },
            {
                "direction":1,
                "fat":[
                    [12,4],
                    [12,7]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [1,6]
                    ]
                },
                {
                    type:0,
                    info:[
                        [12,7]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [5,8]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:3,
                position:[404,768-285]
            },
            {
                type:3,
                position:[154,768-659]
            },
            {
                type:3,
                position:[788,768-663]
            }
        ],
        doorOffset:[13,10], // 门的偏移
        grid:[76,74], // 网格大小
        gridOffset:[-16,-24], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,0,6,4,6,6,6,6,6],
            [6,0,0,0,0,0,2,6,0,0,0,8,0,6],
            [6,5,6,6,6,6,0,6,9,6,0,6,0,6],
            [6,1,0,0,0,0,0,0,0,6,9,6,0,6],
            [6,8,6,0,6,6,6,6,0,6,0,6,0,6],
            [6,0,6,0,9,0,0,6,7,6,0,6,0,6],
            [6,0,6,6,6,6,0,0,0,0,0,6,5,6],
            [3,0,6,0,5,6,0,6,6,6,6,6,0,6],
            [6,0,0,0,0,0,0,0,0,0,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡13
        torch:[
            [62,768-38],
            [331,768-39],
            [571,768-42],
            [709,768-40],
            [886,768-29],
            [189,768-152],
            [487,768-165],
            [617,768-185],
            [983,768-186],
            [867,768-388],
            [978,768-431],
            [453,768-332],
            [742,768-463],
            [264,768-422],
            [55,768-427],
            [342,768-525],
            [47,768-588],
            [215,768-637],
            [859,768-656]
        ],
        answer:[ // 问题列表
            {
                title:"Who is a character from A Dream of Red Mansions?",
                keys:["A.Pan Jinlian  ","B.Pan Youan  ","C.Pan An  ","D. Pan Renmei"],
                result:4
            },
            {
                title:"“Favorites of fortune pray for better fortune. An absurd, loving girl falls deeper in love”, who is the girl?",
                keys:["A.Xue Baochai  ","B.Shi Xiangyun  ","C.Jia Tanchun  ","D.Lin Daiyu"],
                result:4
            },
            {
                title:"Who took Baoyu to go around the “Illusory Land of Great Void”?",
                keys:["A.the Goddess of Disenchantment   ","B.Qin Keqing","C.Xiren                        ","D.Jianmei"],
                result:4
            },
            {
                title:"Who had drunk the “maple-dew tea” of Baoyu’s?",
                keys:["A.Wang Shanbao’s wife  ","B.Concubine Zhao  ","C.Nanny Wang  ","D.Nanny Li"],
                result:4
            },
            {
                title:"Who went to study in the clan school of Jia family with Baoyu?",
                keys:["A.Mingyan  ","B.Li Gui   ","C.Qin Zhong  ","D.Jin Rong "],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,8],
                    [5,8]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [5,7]
                    ]
                },
                {
                    type:0,
                    info:[
                        [2,7]
                    ]
                }
            ],
            change:[
                {
                    type:0,
                    info:[
                        [1,3]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[27,15], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-13,-24], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,0,6,6],
            [6,5,4,0,8,0,3,6,4,9,0,2,0,6],
            [6,0,6,6,6,0,6,4,6,0,0,6,0,6],
            [6,0,6,0,0,0,0,0,0,0,0,6,0,6],
            [6,0,0,7,0,0,6,6,0,0,9,6,0,6],
            [6,0,0,0,0,0,0,6,0,5,6,6,0,6],
            [6,1,0,6,0,0,0,0,0,0,6,0,0,6],
            [6,6,0,6,6,0,6,6,0,0,0,0,0,6],
            [6,5,0,0,0,0,6,6,4,6,0,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡14
        torch:[
            [59,768-26],
            [331,768-24],
            [569,768-28],
            [888,768-17],
            [191,768-147],
            [421,768-162],
            [575,768-170],
            [812,768-191],
            [989,768-179],
            [43,768-344],
            [196,768-345],
            [421,768-358],
            [536,768-477],
            [871,768-426],
            [979,768-423],
            [343,768-517],
            [47,768-564],
            [207,768-654],
            [438,768-646],
            [762,768-595],
            [987,768-594]
        ],
        answer:[ // 问题列表
            {
                title:"Who has diagnosed Keqing’s illness?",
                keys:["A.Leng Zixing   ","B.Feng Ziying  ","C.Zhang Youshi  ","D.Jia Rong"],
                result:4
            },
            {
                title:"In chapter 35, what design does Yinger make a net for Baoyu?",
                keys:["A.double squares  ","B.chains  ","C.willow-catkins   ","D.plum-blossom"],
                result:4
            },
            {
                title:"In chapter 39, You're not to make fun of her, you baggage, warned the Lady Dowager. She's an honest village woman, how can she stand up to your teasing? who is she here?",
                keys:["A.Concubine Zhou  ","B.Lai Da’s wife  ","C.Granny Liu    ","D.Nanny Li"],
                result:4
            },
            {
                title:"In Green Lattice Nunnery, what kind of tea and water does Miaoyu make for the Lady Dowager?",
                keys:["A.maple-dew tea; dew  ","B.Patriarch’s Eyebrows;  Rain-water","C.Liuan tea; Snow-water  ","D.Patriarch’s Eyebrows; Snow-water3"],
                result:4
            },
            {
                title:"Who worked as a maid of Wang Xifeng and a concubine of Jia Lian at the same time?",
                keys:["A.Pinger  ","B.Second Sister  ","C.Qiutong  ","D.Yingchun"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [8,5],
                    [12,5]
                ]
            },
            {
                "direction":1,
                "fat":[
                    [12,1],
                    [12,4]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,6],
                    [3,1]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [6,5]
                    ]
                },
                {
                    type:1,
                    info:[
                        [4,8]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [7,3]
                    ]
                },
                {
                    type:1,
                    info:[
                        [10,5]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:4,
                position:[758,768-136]
            },
            {
                type:4,
                position:[616,768-451]
            }
        ],
        doorOffset:[34,18], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-13,-24], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,0,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,2,7,0,6,0,5,0,0,0,1,0,3],
            [6,0,6,0,0,6,0,6,0,6,6,0,0,6],
            [6,0,5,0,0,0,0,0,0,0,6,0,0,6],
            [6,0,6,0,0,4,0,6,0,0,6,6,0,6],
            [6,0,6,0,0,6,0,6,0,0,0,0,0,6],
            [6,0,0,0,0,0,0,6,6,0,6,6,0,6],
            [6,6,6,6,6,6,0,0,6,0,6,0,0,6],
            [6,9,0,0,0,0,0,0,0,0,6,5,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡15
        torch:[
            [52,768-39],
            [321,768-40],
            [561,768-41],
            [878,768-31],
            [208,768-162],
            [519,768-148],
            [806,768-180],
            [981,768-198],
            [399,768-221],
            [34,768-361],
            [201,768-365],
            [409,768-373],
            [848,768-322],
            [198,768-488],
            [331,768-535],
            [527,768-498],
            [971,768-436],
            [33,768-583],
            [429,768-646],
            [683,768-645],
            [979,768-614]
        ],

        answer:[ // 问题列表
            {
                title:"Who mends a peacock-feather cape for Baoyu?",
                keys:["A.Xi Ren  ","B.Sheyue   ","C.Qiuwen   ","D.Qingwen"],
                result:4
            },
            {
                title:"Where did they grill venison?",
                keys:["A.Happy Red Court       ","B.Warm Scented Arbour","C.Green Lattice Nunnery    ","D.Reed Snow Cottage"],
                result:4
            },
            {
                title:"“This duck’s head is not that serving-maid, how can its head be smeared with oil of osmanthus?” who said it?",
                keys:["A.Wang Xifeng  ","B.Shi Xiangyun   ","C.Xue Baochai   ","D.the Lady Dowager "],
                result:4
            },
            {
                title:"“Baoyu covers up a girl’s theft to protect his sister”. Who is she?",
                keys:["A.Xi Chun   ","B.Tanchun    ","C.Lin Daiyu    ","D.Shi Xiangyun"],
                result:4
            },
            {
                title:"“A chaste girl in sad seclusion writes poems on five beauties”, who is not one of the five beauties?",
                keys:["A.Lady Yu  ","B.Green Peal   ","C.Red Whisk   ","D.Diau Charn"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [10,1],
                    [11,1]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [8,3],
                    [8,6]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [1,6]
                    ]
                },
                {
                    type:1,
                    info:[
                        [5,6]
                    ]
                },
                {
                    type:1,
                    info:[
                        [5,8]
                    ]
                },
                {
                    type:1,
                    info:[
                        [9,1]
                    ]
                },
                {
                    type:0,
                    info:[
                        [10,4]
                    ]
                }
            ],
            change:[
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:4,
                position:[639,768-503]
            },
            {
                type:4,
                position:[482,768-345]
            },
            {
                type:4,
                position:[897,768-142]
            }
        ],
        doorOffset:[33,25], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-27,-24], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,0,6,6,6,6,6,6,6,6],
            [6,0,0,0,0,2,0,6,4,0,0,0,5,6],
            [6,4,0,6,4,0,0,6,0,6,0,6,6,6],
            [6,6,5,6,6,6,0,6,0,6,0,0,0,6],
            [6,0,0,0,1,6,9,0,0,6,0,6,0,6],
            [6,0,0,6,0,6,6,6,0,6,0,6,0,6],
            [6,0,6,6,0,0,0,0,7,0,0,6,0,6],
            [6,0,0,6,6,6,0,6,6,6,6,6,0,6],
            [6,0,5,0,0,0,0,0,0,0,3,0,0,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡16
        torch:[
            [56,768-55],
            [327,768-53],
            [565,768-58],
            [885,768-43],
            [375,768-192],
            [592,768-188],
            [797,768-180],
            [967,768-188],
            [68,768-351],
            [203,768-373],
            [462,768-384],
            [797,768-293],
            [203,768-502],
            [341,768-547],
            [535,768-505],
            [962,768-453],
            [57,768-586],
            [425,768-638],
            [763,768-635],
            [893,768-629]
        ],
        answer:[ // 问题列表
            {
                title:"In chapter 39, As for Xifeng, why, even if she had the strength of the Conqueror of Chu who could lift a tripod weighing a thousand catties, how could she handle everything without ______here?",
                keys:["A.Xiaohong  ","B.Siqi    ","C.Pinger   ","D.Xiren"],
                result:4
            },
            {
                title:"When they were searching Grand View Garden, where didn’t they search?",
                keys:["A.Bamboo Lodge    ","B.Alpinia Park  ","C.Happy Red Court   ","D.Paddy-Sweet Cottage"],
                result:4
            },
            {
                title:"“Only a stork can be seen in the pine-shadowed court, no oriole sings in the snow which has drifted like pear-blossom.” Who wrote this poem?",
                keys:["A.Lin Daiyu    ","B.Jia Baoyu   ","C.Shi Xiangyun  ","D.Xue Baochai"],
                result:4
            },
            {
                title:"“A centipede even when dead won’t fall to the ground.’ We must start killing each other first before our family can be completely destroyed.” Who said it?",
                keys:["A.Jia Zheng  ","B.Jia Lian  ","C.Wang Xifeng  ","D.Tanchun"],
                result:4
            },
            {
                title:"“Do take her away quickly. You can beat her, kill her or sell her; I shan’t care in the least.” Who said it? And who did she talk about?",
                keys:["A.Tanchun; Shishu  ","B.Xichun; Siqi  ","C.Xichun; Ruhua  ","D.Yingchun; Siqi"],
                result:4
            },
        ],
        roleDirection:0, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [1,3],
                    [1,3]
                ]
            },
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [2,8],
                    [4,8]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [8,6],
                    [4,6]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [8,1]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [2,6]
                    ]
                },
                {
                    type:1,
                    info:[
                        [6,6]
                    ]
                }
            ]
        },
        transport:[ // 传送门
        ],
        fixed: [ // 固定物
            {
                type:4,
                position:[478,768-489]
            },
            {
                type:4,
                position:[184,768-338]
            },
            {
                type:4,
                position:[619,768-133]
            }
        ],
        doorOffset:[20,-2], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-13,-24], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,4,6,6,6,6,6,6,6,6,6,6,6,6],
            [6,0,9,0,0,0,0,0,0,0,0,0,1,6],
            [6,0,0,6,0,6,0,0,6,6,6,4,6,6],
            [6,0,6,6,0,0,6,0,0,0,0,0,0,6],
            [6,5,0,0,0,0,6,0,6,0,6,0,0,6],
            [6,6,6,0,0,0,6,0,6,0,6,0,0,6],
            [6,5,0,0,7,0,0,9,0,0,0,5,0,6],
            [6,0,6,6,6,0,6,6,6,0,6,0,0,6],
            [6,0,0,0,0,0,0,4,6,0,0,2,0,6],
            [6,3,6,6,6,6,6,6,6,6,6,0,6,6]

        ]
    },
    { // 关卡17
        torch:[
            [328,768-54],
            [565,768-50],
            [885,768-45],
            [191,768-170],
            [335,768-187],
            [589,768-185],
            [967,768-185],
            [41,768-347],
            [204,768-366],
            [461,768-338],
            [808,768-293],
            [322,768-479],
            [523,768-480],
            [742,768-484],
            [962,768-451],
            [58,768-589],
            [646,768-599],
            [869,768-594],
            [391,768-663]
        ],
        answer:[ // 问题列表
            {
                title:"“ Qin Zhong amuses himself in Steamed-Bread Convent” , who does he have sex with in Steamed-Bread Convent?",
                keys:["A.Baoyu   ","B.Jingxu   ","C.Zhineng   ","D.Zhishan"],
                result:4
            },
            {
                title:"Who took the Stone to the dust world?",
                keys:["A.The Reverend Void; Nu Wa    ","B.The Reverend Void; Zhen Shiyin","C.Buddhist monk; Taoist priest   ","D.Zhen Shiyin; Jia Yucun"],
                result:4
            },
            {
                title:"Where did Lin Daiyu’s mother pass away?",
                keys:["A.Suzhou   ","B.Yangzhou     ","C.Hangzhou    ","D.Jinling"],
                result:4
            },
            {
                title:"In A Dream of Red Mansions, the author was fond of using the describe of one’s living environment to set one’s personality, for example “the whitewashed enclosing walls of a fine lodge nestling in a dense glade of fresh green bamboos”, whose house is this?",
                keys:["A.Lin Daiyu  ","B.Xue Baochai   ","C.Shi Xiangyun  ","D.Jia Baoyu"],
                result:4
            },
            {
                title:"Where did Baoyu and Daiyu read The Western Chamber together?",
                keys:["A.Seeping Fragrance Lock   ","B.Wasp-Waist Bridge","C.Bamboo Lodge          ","D.Dripping Emerald Pavillon"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [4,3]
                    ]
                },
                {
                    type:0,
                    info:[
                        [5,4]
                    ]
                }
            ],
            change:[
            ]
        },
        transport:[ // 传送门
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [3,1],
                    [10,5]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [10,5],
                    [3,1]
                ]
            }
        ],
        fixed: [ // 固定物
            {
                type:4,
                position:[471,768-444]
            },
            {
                type:4,
                position:[665,768-275]
            },
            {
                type:4,
                position:[271,768-314]
            }
        ],
        doorOffset:[15,40], // 门的偏移
        grid:[74,74], // 网格大小
        gridOffset:[-39,-8], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗
            // 10 - 传送门)
            [6,6,6,6,6,3,6,6,6,6,2,6,6,6],
            [6,6,6,0,6,0,6,5,0,0,0,0,4,6],
            [6,0,6,7,6,0,6,0,6,0,0,6,6,6],
            [6,0,0,0,0,0,0,0,6,0,0,0,0,6],
            [6,1,6,6,6,0,6,6,6,6,0,6,0,6],
            [6,0,4,6,6,0,0,0,5,6,0,6,0,6],
            [6,0,0,0,6,0,6,6,6,6,6,6,0,6],
            [6,0,0,0,0,0,6,0,0,0,0,0,0,6],
            [6,6,0,0,5,0,0,0,6,6,6,6,6,6],
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6]

        ]
    },
    { // 关卡18
        torch:[
            [58,768-53],
            [328,768-53],
            [884,768-46],
            [967,768-190],
            [966,768-454],
            [873,768-510],
            [719,768-401],
            [643,768-540],
            [540,768-479],
            [682,768-137],
            [503,768-139],
            [402,768-179],
            [332,768-190],
            [280,768-332],
            [254,768-592],
            [60,768-586],
            [41,768-419],
            [452,768-652]
        ],
        answer:[ // 问题列表
            {
                title:"Who writes a satire upon ______? “It crawls sidewise because the ways of the world are crooked, and, white and yellow, harbors a dark design.”",
                keys:["A.Lin Daiyu; crabs   ","B.Jia Baoyu; spider  ","C.Xue Baochai; crabs  ","D.Shi Xiangyun； spider"],
                result:4
            },
            {
                title:"When Xiangling learnt how to write poems, what did Daiyu recommend her to read first?",
                keys:["A.the complete poems of Du Fu   ","B.the complete poems of Wang Wei","C.the complete poems of Bai Juyi  ","D.the complete poems of Li Bai"],
                result:4
            },
            {
                title:"Boayu changed the name of one of his maids into “Yali Xiongnu”, who is she?",
                keys:["A.Qingwen  ","B.Fangguan  ","C.Xiaohong   ","D.Xiren"],
                result:4
            },
            {
                title:"Who is similar to Lin Daiyu in appearance and personality based on the description of the novel?",
                keys:["A.Qingwen, Fangguan ","B.Qingwen, Lingguan  ","C.Jinchuan, Sier  ","D.Qingwen, Jinchuan"],
                result:4
            },
            {
                title:"What did Fangguan send Liu Wuer as a gift?",
                keys:["A.Rose-Nitric Powder  ","B.Jasmine Powder ","C.Rose Flavoured Juice  ","D.Pachyma Cocos"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,3],
                    [3,3]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [4,4],
                    [4,7]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [11,4]
                    ]
                }
            ],
            change:[
                {
                    type:0,
                    info:[
                        [12,3]
                    ]
                }
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [6,1],
                    [10,1]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [10,1],
                    [6,1]
                ]
            }
        ],
        fixed: [ // 固定物
            {
                type:4,
                position:[347,768-154]
            }
        ],
        doorOffset:[12,27], // 门的偏移
        grid:[75,75], // 网格大小
        gridOffset:[-8,-12], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,4,3,0,0,0,0,6,0,7,0,6,4,6],
			[6,0,0,6,6,6,6,6,0,6,5,6,0,6],
			[6,6,0,0,0,0,0,4,0,6,0,6,0,6],
			[6,6,6,6,0,0,0,6,0,0,0,0,5,6],
			[6,6,0,0,0,0,5,4,6,6,4,6,0,6],
			[6,0,0,6,0,6,0,6,4,9,0,0,1,6],
			[6,0,0,0,0,0,0,6,6,0,0,6,0,6],
			[6,2,6,6,6,6,0,0,0,0,6,6,0,6],
			[6,0,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡19
        torch:[
            [52,768-155],
            [248,768-119],
            [263,768-48],
            [610,768-45],
            [546,768-143],
            [654,768-235],
            [774,768-147],
            [870,768-354],
            [971,768-326],
            [382,768-247],
            [250,768-320],
            [61,768-487],
            [389,768-457],
            [481,768-558],
            [747,768-513],
            [966,768-611],
            [55,768-628]
        ],
        answer:[ // 问题列表
            {
                title:"Who was the author of the following poems?①Concentrated splendor, bestowed felicity②A fairyland far from the world of men ",
                keys:["A.Lin Daiyu; Jia Baoyu  ","B.Xue Baochai, Shi Xiangyun","C.Jia Baoyu; Lin Daiyu   ","D.Xue Baochai; Lin Daiyu"],
                result:4
            },
            {
                title:"Who does the following alias names belong to?①The Stranger Under the Plantain②Queen of the Bamboos ③Prince of the Crimson Cavern④Mistress of Lotus Pavilion",
                keys:["A.Tanchun, Daiyu, Baoyu, Xichun  ","B. Xiangyun, Baochai, Li Wan, Xichun","C.Tanhcun, Baoyu, Daiyu, Xichun   ","D. Tanchun, Xiangyun, Li Wan, Xichun"],
                result:4
            },
            {
                title:"Where does this couplet hang on? “Coolness wraps her dream, for spring is chill;A fragrance assails men, the aroma of wine.”",
                keys:["A.Illusory Land of Great Void   ","B.Hall of Glorious Felicity","C.The room of Qin Keqing’s     ","D.Green Gauze Lodge"],
                result:4
            },
            {
                title:"_____ chases a butterfly to Dripping Emerald Pavillon;_______ weeps over fallen blossom by the Tomb of flowers",
                keys:["A.Shi Xiangyun; Jia Tanchun  ","B.Xue Baochai; Lin Daiyu","C.Lin Daiyu; Jia Xichun       ","D.Xue Baoqin; Lin Daiyu"],
                result:4
            },
            {
                title:"Whose fate dose the following poems indicate?①A clear moon is rarely met with, bright clouds are easily scattered;②Nothing avail her gentleness and compliance, osmanthus and orchid with her fragrance vie;③Sweet is she as the lotus in flower, yet none so sorely oppressed;",
                keys:["A.Qingwen; Xiangyun; Tanchun   ","B.Xichun; Miaoyu; Xiren","C.Qingwen; Xiren; Xiangling      ","D.Li Wan; Miaoyu; Xichun"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [4,3],
                    [4,3]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [8,5],
                    [8,1]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [3,5]
                    ]
                },
                {
                    type:1,
                    info:[
                        [10,1]
                    ]
                },
                {
                    type:0,
                    info:[
                        [12,6]
                    ]
                }
            ],
            change:[
                {
                    type:0,
                    info:[
                        [1,2]
                    ]
                }
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,8],
                    [6,5]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [6,5],
                    [12,8]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [4,1],
                    [1,6]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,6],
                    [4,1]
                ]
            }
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[24,28], // 门的偏移
        grid:[73,69], // 网格大小
        gridOffset:[-6,-10], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,3,6,6],
			[6,6,6,6,0,0,0,0,7,0,0,0,0,6],
			[6,4,6,6,1,0,0,6,0,0,6,5,0,6],
			[6,0,0,6,0,6,0,6,6,0,6,6,0,6],
			[6,5,0,6,0,0,0,6,0,0,0,6,0,6],
			[6,0,0,0,9,0,0,6,0,5,0,6,0,6],
			[6,0,4,6,0,6,6,6,6,0,0,6,0,6],
			[6,6,6,6,0,0,0,0,0,0,6,6,0,6],
			[6,2,0,0,0,0,6,0,0,0,0,0,0,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡20
        torch:[
            [93,768-49],
            [446,768-49],
            [806,768-33],
            [925,768-38],
            [958,768-145],
            [792,768-162],
            [652,768-162],
            [40,768-241],
            [357,768-315],
            [607,768-332],
            [453,768-340],
            [757,768-326],
            [985,768-323],
            [748,768-459],
            [586,768-541],
            [425,768-526],
            [272,768-582],
            [39,768-574],
            [465,768-643],
            [660,768-642],
            [834,768-644]
        ],
        answer:[ // 问题列表
            {
                title:"Who had grasped a peony in the “Flower Game” with a poem “Though heartless she has charm” on it?",
                keys:["A.Xue Baochai    ","B.Lin Daiyu  ","C.Jia Tanchun  ","D.Jia Xichun"],
                result:4
            },
            {
                title:"“Brought from another plot, more precious than gold,One clump is pale, one dark;”, who wrote this poem?",
                keys:["A.Shi Xiangyun ","B.Lin Daiyu  ","C.Xiangling  ","D.Xue Baochai"],
                result:4
            },
            {
                title:"What is the author of the following poems?①Ever since Tao Yuanming of old passed judgment. This flower's worth has been sung through the centuries.②Who will pity me pining away for the yellow flowers? On the Double Ninth Festival they will reappear.",
                keys:["A.Lin Daiyu; Xue Baochai   ","B.Xue Baochai; Jia Tanchun","C.Jia Baoyu; Jia Tanchun    ","D.Shi Xiangyun; Xue Baochai"],
                result:4
            },
            {
                title:"In chapter 28, when they talked about the illness of Lin Daiyu, what’s the name of the pills did Baochai tell them?",
                keys:["A.heavenly-king-fortifying-the-heart pills ","B.guardian angel pills","C.Eight-treasure-leonurus pills","D.Bodhisattva powders"],
                result:4
            },
            {
                title:"What is the relationship between the adjectives and the characters?①Zijuan ②Xifeng ③Xiangling ④Tanchun",
                keys:["A.loyalty; peppery; sweet; clever  ","B.artful; jealous; silly; clever","C.loyalty; peppery; silly; tactful    ","D.clever; jealous; silly; artful"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,1],
                    [3,3]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [5,1],
                    [5,3]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [11,1],
                    [11,3]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [10,7],
                    [10,1]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [3,4]
                    ]
                },
                {
                    type:0,
                    info:[
                        [5,4]
                    ]
                },
                {
                    type:0,
                    info:[
                        [7,4]
                    ]
                },
                {
                    type:0,
                    info:[
                        [9,4]
                    ]
                },
                {
                    type:0,
                    info:[
                        [11,4]
                    ]
                },
                {
                    type:1,
                    info:[
                        [4,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [8,1]
                    ]
                }
            ],
            change:[
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,3],
                    [12,1]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,1],
                    [1,3]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,1],
                    [8,8]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [8,8],
                    [1,1]
                ]
            }
        ],
        fixed: [ // 固定物
            {
                type:5,
                position:[490,768-635]
            },
            {
                type:5,
                position:[994,768-151]
            }
        ],
        doorOffset:[35,5], // 门的偏移
        grid:[73,69], // 网格大小
        gridOffset:[-4,5], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗
            // 10 - 开关)
            [6,6,6,6,6,6,6,6,6,6,6,3,6,6],
			[6,0,8,0,0,0,0,0,0,0,7,0,0,6],
			[6,0,6,0,6,0,6,0,6,1,6,0,6,6],
			[6,10,0,5,0,0,0,5,6,0,0,5,6,6],
			[6,0,6,0,6,0,6,0,6,0,6,0,6,6],
			[6,0,0,4,0,4,0,4,0,0,6,6,0,6],
			[6,0,6,6,6,6,6,6,0,6,6,6,6,6],
			[6,0,9,0,0,6,0,6,0,0,0,0,0,6],
			[6,2,0,6,0,9,0,0,10,0,0,8,0,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡21
        torch:[
            [57,768-103],
            [306,768-69],
            [477,768-67],
            [645,768-66],
            [844,768-52],
            [991,768-191],
            [898,768-321],
            [775,768-285],
            [540,768-285],
            [56,768-299],
            [262,768-357],
            [649,768-372],
            [538,768-444],
            [60,768-434],
            [199,768-519],
            [295,768-639],
            [56,768-613],
            [707,768-505],
            [859,768-623],
            [942,768-463]
        ],
        answer:[ // 问题列表
            {
                title:"Who had translated A Dream of Red Mansions into English amidst the following people? ",
                keys:["A.Zhang Peiji    ","B.Yang Xianyi   ","C.Daniel Hawkes  ","D.Ji Xianlin"],
                result:4
            },
            {
                title:"When the goddess Nv Wa melted down rocks to repair the sky, at _______in the Great Waste Mountain she made thirty-six thousand five hundred and one blocks of stone.",
                keys:["A.Blue Ridge Peak   ","B.Alps   ","C.Mount Rushmore ","D.Baseless Cliff"],
                result:4
            },
            {
                title:"Which country had recomposed A Dream of Red Mansions into an opera?",
                keys:["A.the Soviet Union   ","B.Japan   ","C.North Korea   ","D.Singapore"],
                result:4
            },
            {
                title:"“Such wisdom flows from her immortal brush, too awed to pen more lines I can but blush.” Who wrote this? ",
                keys:["A.Xue Baochai  ","B.Lin Daiyu   ","C.Jia Baoyu   ","D.Jia Tanchun"],
                result:4
            },
            {
                title:"“An eloquent maid offers earnest advice one fine night”, who is this maid? ",
                keys:["A.Qingwen   ","B.Xiren   ","C.Zijuan   ","D.Yinger"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,3],
                    [6,3]
                ]
            },
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [4,8],
                    [5,8]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [10,6],
                    [10,8]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [4,1],
                    [9,1]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [3,8]
                    ]
                },
                {
                    type:1,
                    info:[
                        [10,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [10,3]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [2,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [2,3]
                    ]
                },
                {
                    type:0,
                    info:[
                        [9,4]
                    ]
                },
                {
                    type:0,
                    info:[
                        [11,4]
                    ]
                }
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [0,3],
                    [12,3]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,3],
                    [0,3]
                ]
            }
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[-3,33], // 门的偏移
        grid:[73,67], // 网格大小
        gridOffset:[7,4], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,4,6],
			[6,5,0,0,0,6,0,0,0,7,0,0,0,6],
			[6,0,6,0,0,0,0,0,0,0,6,0,0,6],
			[0,1,0,0,0,0,0,0,0,0,0,0,0,6],
			[6,6,6,0,0,2,0,6,6,0,6,0,6,6],
			[6,6,6,6,0,0,0,6,6,9,0,0,0,6],
			[6,3,5,6,0,0,0,6,0,0,0,5,0,6],
			[6,0,6,6,9,0,0,0,0,6,0,0,6,6],
			[6,0,0,0,0,0,6,0,0,0,0,4,6,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡22
        torch:[
            [25,768-81],
            [33,768-320],
            [108,768-584],
            [383,768-655],
            [303,768-516],
            [303,768-331],
            [150,768-382],
            [188,768-229],
            [182,768-120],
            [339,768-143],
            [297,768-20],
            [500,768-32],
            [629,768-122],
            [698,768-454],
            [490,768-350],
            [493,768-510],
            [626,768-667],
            [908,768-657],
            [877,768-490],
            [790,768-304],
            [998,768-423],
            [991,768-240],
            [967,768-16],
            [778,768-160]
        ],
        answer:[ // 问题列表
            {
                title:"What was the name of Xiangling before she was kidnapped? ",
                keys:["A.Jia Yuanchun   ","B.Shi Xiangyun   ","C.Zhen Yinglian   ","D.Li Wan"],
                result:4
            },
            {
                title:"“What is this, after all, but a bowl of milk? He shouldn’t begrudge me that — or more costly things either. Does he think more of Xiren than of me?” who said this? ",
                keys:["A.Nanny Wang   ","B.Granny Liu  ","C.the Lady Dowager ","D.Nanny Li"],
                result:4
            },
            {
                title:"In _____Cavern lived a number of rat spirits. One year on the seventh day of the twelfth moon, the Rat Patriarch ascended his throne to hold a council.",
                keys:["A.Jia    ","B.Yang     ","C.Su    ","D.Lin "],
                result:4
            },
            {
                title:"“How lucky that this hurricane sprang up and carried the old creature off!”, who was the “hurricane” ? ",
                keys:["A.Wang Xifeng   ","B.Tanchun    ","C.Concubine Zhao ","D.Li Wan"],
                result:4
            },
            {
                title:"When Xiangyun made a braid for Baoyu, she tied the braid with a crimson braid, which was decorated with _____pearls and had a golden pendant at the end. ",
                keys:["A.Four   ","B.Three   ","C.Five   ","D.Two"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [6,3],
                    [8,3]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [12,5],
                    [12,7]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [3,6],
                    [3,1]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:0,
                    info:[
                        [1,3]
                    ]
                },
                {
                    type:0,
                    info:[
                        [5,5]
                    ]
                },
                {
                    type:0,
                    info:[
                        [12,7]
                    ]
                },
                {
                    type:1,
                    info:[
                        [2,4]
                    ]
                },
                {
                    type:1,
                    info:[
                        [9,9]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [4,3]
                    ]
                }
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [2,8],
                    [12,3]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,3],
                    [2,8]
                ]
            }
        ],
        fixed: [ // 固定物
            {
                type:5,
                position:[261,768-129]
            },
            {
                type:5,
                position:[989,768-639]
            }
        ],
        doorOffset:[1,20], // 门的偏移
        grid:[76,76], // 网格大小
        gridOffset:[-18,-39], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,6,6,6,6,6,6,6,6,6],
			[6,0,0,7,0,0,0,0,6,0,0,0,2,6],
			[6,0,6,6,6,0,8,0,6,0,6,6,6,6],
			[6,0,6,4,0,0,0,0,0,0,0,0,0,6],
			[6,0,0,0,6,0,0,0,6,0,6,6,0,6],
			[6,9,6,3,6,0,6,0,0,0,9,6,0,6],
			[6,0,6,0,0,0,6,6,6,6,0,6,1,6],
			[6,0,0,5,6,5,6,0,6,6,0,6,0,6],
			[6,6,0,0,6,0,0,5,0,0,0,0,0,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡23
        torch:[
            [28,768-44],
            [179,768-37],
            [336,768-36],
            [491,768-38],
            [617,768-37],
            [884,768-29],
            [995,768-102],
            [870,768-148],
            [712,768-142],
            [164,768-139],
            [31,768-143],
            [29,768-255],
            [377,768-224],
            [437,768-284],
            [373,768-334],
            [447,768-404],
            [493,768-404],
            [639,768-410],
            [721,768-264],
            [716,768-147],
            [630,768-210],
            [873,768-286],
            [1001,768-205],
            [999,768-328],
            [1003,768-418],
            [892,768-401],
            [766,768-383],
            [635,768-409],
            [656,768-537],
            [791,768-529],
            [914,768-532],
            [415,768-541],
            [136,768-541],
            [26,768-510],
            [30,768-651]
        ],
        answer:[ // 问题列表
            {
                title:"“Who can the scurrile writer be, who makes of Zhuangzi such a travesty. And, blind to his own incapacity, heaps such abuse on others?”, who does the writer in the poem refer to? ",
                keys:["A.Jia Baoyu  ","B.Lin Daiyu   ","C.Zhuangzi   ","D.Laozi"],
                result:4
            },
            {
                title:"What did Jia Lian keep after he had a love affair stealthily with Miss Duo? ",
                keys:["A.a long strand of hair  ","B.a handkerchief ","C.a locket   ","D.a jade pendant"],
                result:4
            },
            {
                title:"“Liu Er Pawns His Clothes” who named this scene of the opera on Baochai’s birthday? ",
                keys:["A.Wang Xifeng  ","B.Lin Daiyu   ","C.Aunt Xue  ","D.Lady Wang"],
                result:4
            },
            {
                title:"“Listen, Baoyu. Bao means that which is most precious, and yu that which is most solid. But in what way are you precious? In what way are you solid?”, who said it?",
                keys:["A.Xue Baochai   ","B.Shi Xiangyun   ","C.Lin Daiyu   ","D.Miaoyu"],
                result:4
            },
            {
                title:"“The children by the steps look up: Spring surely has no fitter decoration. But when the silk cord breaks it drifts away, Blame not the east wind for this separation.” What’s the answer of this riddle? ",
                keys:["A.sky      ","B.cloud   ","C.kite   ","D.butterfly"],
                result:4
            },
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [7,6],
                    [9,6]
                ]
            },
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [9,4],
                    [9,6]
                ]
            },
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [10,6],
                    [12,6]
                ]
            }
        ],
        skeleton:[ // 骷髅
            {
                "direction":0, // 0 - 横向； 1 - 纵向
                "fat":[
                    [7,2],
                    [1,2]
                ]
            }
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [2,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [2,4]
                    ]
                },
                {
                    type:1,
                    info:[
                        [11,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [10,8]
                    ]
                },
                {
                    type:0,
                    info:[
                        [12,5]
                    ]
                }
            ],
            change:[
                {
                    type:1,
                    info:[
                        [3,8]
                    ]
                },
                {
                    type:1,
                    info:[
                        [8,6]
                    ]
                },
                {
                    type:1,
                    info:[
                        [9,1]
                    ]
                },
                {
                    type:1,
                    info:[
                        [12,8]
                    ]
                },
                {
                    type:0,
                    info:[
                        [1,5]
                    ]
                },
                {
                    type:0,
                    info:[
                        [9,7]
                    ]
                },
                {
                    type:0,
                    info:[
                        [12,2]
                    ]
                }
            ]
        },
        transport:[ // 传送门
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,1],
                    [6,8]
                ]
            },
            {
                "type":1, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [6,8],
                    [1,1]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,8],
                    [12,4]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,4],
                    [1,8]
                ]
            }
        ],
        fixed: [ // 固定物
            {
                type:5,
                position:[198,768-352]
            },
            {
                type:5,
                position:[982,768-516]
            }
        ],
        doorOffset:[15,10], // 门的偏移
        grid:[78,78], // 网格大小
        gridOffset:[-40,-23], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗
            // 10 - 开关)
            [6,6,6,6,6,6,6,0,6,6,6,6,4,6],
			[6,0,0,0,0,0,0,2,0,0,0,0,0,6],
			[6,7,6,0,0,0,0,0,0,6,0,6,0,6],
			[6,9,6,0,0,6,0,0,6,6,0,6,0,6],
			[6,5,0,0,9,6,6,0,6,0,0,6,10,6],
			[6,0,6,6,0,0,6,3,6,0,6,6,0,6],
			[6,5,0,0,0,0,0,0,0,0,0,0,0,6],
			[6,4,6,6,6,6,0,6,6,0,6,0,6,6],
			[6,0,1,0,4,6,0,0,0,0,0,5,0,4],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    },
    { // 关卡24
        torch:[
            [52,768-61],
            [209,768-48],
            [344,768-36],
            [512,768-33],
            [820,768-32],
            [894,768-105],
            [974,768-186],
            [828,768-287],
            [696,768-174],
            [753,768-352],
            [477,768-232],
            [329,768-175],
            [184,768-251],
            [37,768-324],
            [187,768-390],
            [104,768-509],
            [191,768-580],
            [294,768-647],
            [394,768-492],
            [580,768-646],
            [751,768-571],
            [975,768-639],
            [872,768-502]
        ],
        answer:[ // 问题列表
            {
                title:"Who went to a bookshop and bought his master Baoyu a pile of novels old and new, tales about imperial concubines and empresses, as well as romantic librettos? ",
                keys:["A.Li Gui   ","B.Xiren  ","C.Mingyan   ","D.Qingwen"],
                result:4
            },
            {
                title:"Who did Baoyu adopt for fun as his son? ",
                keys:["A.Jia Yun  ","B.Jia Qiang   ","C.Jia Qin   ","D.Jia Rong"],
                result:4
            },
            {
                title:"What is the family name of Yuanyang?",
                keys:["A.Hua    ","B.Li   ","C.Jin     ","D.Pan"],
                result:4
            },
            {
                title:"“Tactful Pinger conceals the theft of her gold bracelet”, who is the theft? ",
                keys:["A.Xiaohong   ","B.Jinchuan   ","C.Qianxue   ","D.Zhuier"],
                result:4
            },
            {
                title:"“Who’s my uncle? My uncle’s just been appointed Military Inspector of Nine Provinces.”, who does this uncle refer to? ",
                keys:["A.Zhao Guoji    ","B.Wang Ziteng   ","C.Wang Zisheng   ","D.Jia She"],
                result:4
            }
        ],
        roleDirection:1, // 0 - 上； 1 - 下； 2 - 左；3 - 右
        seamonster:[ // 海怪
            {
                "direction":1, // 0 - 横向； 1 - 纵向
                "fat":[
                    [12,5],
                    [12,7]
                ]
            }
        ],
        skeleton:[ // 骷髅
        ],
        fence: { // 栅栏
            default: [
                {
                    type:1,
                    info:[
                        [2,4]
                    ]
                }
            ],
            change:[
            ]
        },
        transport:[ // 传送门
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [1,1],
                    [12,8]
                ]
            },
            {
                "type":0, // 0 - 蓝色； 1 - 绿色
                "fat":[
                    [12,8],
                    [1,1]
                ]
            }
        ],
        fixed: [ // 固定物
        ],
        doorOffset:[32,20], // 门的偏移
        grid:[75,72], // 网格大小
        gridOffset:[-29,-15], // 网格偏移
        grids:[10,14], // 网格模板
        gameGrids:[ // 网格定义(
            // 6 - 不可行走 非6可行走
            // 2 - 人物起始位置
            // 3 - 门
            // 1 - 梦
            // 4 - 树藤
			// 7 - 开关
			// 8 - 蝙蝠
			// 9 - 药瓶
            // 5 - 碗)
            [6,6,6,6,6,4,6,6,6,6,6,6,6,6],
			[6,0,6,0,0,0,0,6,0,0,0,6,6,6],
			[6,0,6,0,6,5,0,0,0,6,0,0,6,6],
			[6,0,6,0,0,0,6,4,0,0,0,1,0,6],
			[6,0,0,0,0,0,9,3,6,0,0,6,9,6],
			[6,6,6,0,0,5,0,4,4,0,6,6,0,6],
			[6,7,0,0,5,0,0,0,6,0,6,0,0,6],
			[6,6,0,0,0,6,0,0,0,0,6,6,0,6],
			[6,6,6,2,0,0,4,6,4,6,6,6,0,6],
			[6,6,6,6,6,6,6,6,6,6,6,6,6,6]
        ]
    }
];