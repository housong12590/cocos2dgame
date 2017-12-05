/**
 * Created by huangxinping on 2/19/14.
 */


function clone(arr) {
    var out = [];
    for(var i=0;i<arr.length;i++){
        var innerArr = arr[i];
        var innerArrClone = innerArr.slice(0);
        out.push(innerArrClone);
    }
    return out;
}

GameLevelConfig = cc.Class.extend({

    torch:null,
    grid:null,
    gridOffset:null,
    grids:null,
    gameGrids:null,
    answer:null,
    doorOffset:null,
    roleDirection:DIRECTION_UP,

    seamonster:null,
    skeleton:null,
    fixed:null,
    transport:null,

    barrier:null,

    collisionSprites:null,

    ctor : function () {

    },

    init : function () {
        this.updateConfig();

        this.collisionSprites = new Array();
        this.grid = [];
        this.gridOffset = [];
        this.grids = [];
        this.gameGrids = [];
        this.answer = [];
        this.doorOffset = [];
        this.seamonster = [];
        this.skeleton = [];
        this.fixed = [];
        this.transport = [];
        this.barrier = [];
    },

    addCollisionSprites : function (sprite,gridX,gridY) {
        this.collisionSprites.push(
            {
                "sprite":sprite,
                "gridX":gridX,
                "gridY":gridY
            }
        );
    },

    getCollisionSprite : function (gridX,gridY) {
        for (var i = 0; i < this.collisionSprites.length; i++) {
            dictionary = this.collisionSprites[i];
            if (dictionary["gridX"] == gridX &&
                dictionary["gridY"] == gridY) {
                return dictionary["sprite"];
            }
        }
    },

    getDoorGrid : function () {
        for (var i = 0; i < GameLevelConfig.getInstance().grids[0]; i++) {
            for (var j = 0; j < GameLevelConfig.getInstance().grids[1]; j++) {
                if (GameLevelConfig.getInstance().gameGrids[i][j] == 3) {
                    return [j,i];
                }
            }
        }
    },

    updateConfig : function () {
        this.torch = clone(level_config[g_current_level-1]["torch"]);
        this.gameGrids = clone(level_config[g_current_level-1]["gameGrids"]);
        this.grids = level_config[g_current_level-1]["grids"].slice();
        this.gridOffset = level_config[g_current_level-1]["gridOffset"].slice();
        this.grid = level_config[g_current_level-1]["grid"].slice();
        this.answer = level_config[g_current_level-1]["answer"].slice();
        this.doorOffset = level_config[g_current_level-1]["doorOffset"].slice();
        this.roleDirection = level_config[g_current_level-1]["roleDirection"];
        this.seamonster = level_config[g_current_level-1]["seamonster"].slice();
        this.skeleton = level_config[g_current_level-1]["skeleton"];
        this.fixed = level_config[g_current_level-1]["fixed"];
        this.transport = level_config[g_current_level-1]["transport"];

        this.barrier = level_config[g_current_level-1]["fence"];
        this.barrier = level_config[g_current_level-1]["fence"];

        this.collisionSprites = [];
//        this.setBridgeData('1-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0');
    },

    // 该处的逻辑是：介绍页点击“开始游戏”，读取历史记录，然后html收到objc的消息。收到消息之后GameLevelConfig调用setBridgeData，所以收到该回掉之后则认为游戏可以开始了
    // 1、如果data为'emptyhistory'，则没有任何历史信息，则直接第一关
    // 2、如果data不为'emptyhistory'，则解析信息
    setBridgeData:function (data) {
        if (data == 'emptyhistory') {
            cc.Director.getInstance().replaceScene(new IntroduceScene());
        } else {
            var split = data.split('-');
            var level = parseInt(split[0]);
            g_current_level = parseInt(level);
            var state = split[1];
            g_state_level = [];
            for (var i = 0; i < 47; i++) {
                if (i == 0 || i%2 == 0) {
                    g_state_level.push(parseInt(state.substr(i,1)));
                }
            }
            g_current_score = [];
            var score = split[2];
            for (var i = 0; i < 47; i++) {
                if (i == 0 || i%2 == 0) {
                    g_current_score.push(parseInt(score.substr(i,1)));
                }
            }
            cc.Director.getInstance().replaceScene(new GameWaringScene());
        }
    }

});

cc.s_SharedGameLevelConfigLib = null;
cc.firstUseGameLevelConfigLib = true;

GameLevelConfig.getInstance = function() {
    if (cc.firstUseGameLevelConfigLib) {
        cc.firstUseGameLevelConfigLib = false;
        cc.s_SharedGameLevelConfigLib = new GameLevelConfig();
        cc.s_SharedGameLevelConfigLib.init();
    }
    return cc.s_SharedGameLevelConfigLib;
};