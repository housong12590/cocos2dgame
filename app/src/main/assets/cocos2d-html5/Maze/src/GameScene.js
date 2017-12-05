/**
 * Created by huangxinping on 2/11/14.
 *
 * 游戏场景
 *
 */

var GameLayer;
GameLayer = cc.Layer.extend({

    roleNode:null, // 人物精灵

    protectedLabel:null, // 冷香丸获取数量

    scoreCount:0, // 得分（吃到一个碗+1）

    scoreLabel:null, // 得分标签

    bottomDream:null, // 底部“梦”
    bottomBottle:null, // 底部“瓶”
    bottomCup:null, // 底部“碗”

    seamonsterList:null, // 海怪列表
    skeletonList:null, // 骷髅列表

    barrierList:null, // 栅栏列表

    fencecontrolList:null, // 开关列表

    inFenceControl:false, // 是否人物在开关上

    aiBatList:null, // 蝙蝠列表（主要是取出它管属的飞刀，检查是否跟人物有碰撞到）

    enterLayer:null, // 游戏场景进入介绍图（第1关、第3关、第5关、第7关、第9关、第10关、第11关、第14关、第17关、第24关）

    updateBottle:false,

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        GameLevelConfig.getInstance().updateConfig();

        this.fencecontrolList = new Array();
        this.aiBatList = new Array();

        { // 音乐
            if (g_current_level >= 1 && g_current_level <= 6) {
                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playmusic:2');
                } else {
                    cc.AudioEngine.getInstance().stopMusic();
                    cc.AudioEngine.getInstance().playMusic(g_audio_game_background_2, true);
                }
            }
            else if (g_current_level >= 7 && g_current_level <= 12) {
                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playmusic:3');
                } else {
                    cc.AudioEngine.getInstance().stopMusic();
                    cc.AudioEngine.getInstance().playMusic(g_audio_game_background_3, true);
                }
            }
            else if (g_current_level >= 13 && g_current_level <= 18) {
                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playmusic:4');
                } else {
                    cc.AudioEngine.getInstance().stopMusic();
                    cc.AudioEngine.getInstance().playMusic(g_audio_game_background_4, true);
                }
            }
            else if (g_current_level >= 19 && g_current_level <= 24) {
                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playmusic:5');
                } else {
                    cc.AudioEngine.getInstance().stopMusic();
                    cc.AudioEngine.getInstance().playMusic(g_audio_game_background_5, true);
                }
            }
        }

        { // plist序列
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_torch_small_list,g_main_torch_small);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_winter_torch_list,g_main_winter_torch);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_level_plist,g_game_level);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_cup_plist,g_game_cup);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_dream_plist,g_game_dream);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_bottle_plist,g_game_bottle);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_transport_plist,g_game_transport);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_bat_plist,g_game_bat);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_glowworm_plist,g_game_glowworm);
        }

        { // 背景或固定物

            // 地形
            background = cc.Sprite.create("res/game/tiled/level_"+g_current_level+"/map.jpg");
            background.setPosition(size.width/2,size.height/2);
            this.addChild(background);

            // 地形掩码
//            mask = cc.Sprite.create("res/game/tiled/level_"+g_current_level+"/map_mask.png");
//            mask.setAnchorPoint(0,1);
//            mask.setPosition(GameLevelConfig.getInstance().gridOffset[0],768-GameLevelConfig.getInstance().gridOffset[1]);
//            this.addChild(mask);

            // 门
            var door = cc.Sprite.create("res/game/door/closed/level_"+g_current_level+"_door_closed"+".png");
            doorGrid = GameLevelConfig.getInstance().getDoorGrid();
            var size = cc.Director.getInstance().getWinSize();
            door.setAnchorPoint(0,1);
            door.setPosition(doorGrid[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().doorOffset[0],
                        size.height-(doorGrid[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().doorOffset[1]));
            this.addChild(door);

            // 得分标签
            this.scoreLabel = cc.LabelTTF.create("0/3", "Marker Felt", 36);
            this.scoreLabel.setPosition(300,768-755+20);
            this.addChild(this.scoreLabel, 5);

            // 冷香丸标签
            this.protectedLabel = cc.LabelTTF.create("+1", "Marker Felt", 36);
            this.protectedLabel.setPosition(180,768-755+10);
            this.addChild(this.protectedLabel, 5);
            this.protectedLabel.setVisible(false);

            // 关卡值
            level = cc.Sprite.createWithSpriteFrameName(g_current_level+".png");
            level.setPosition(50,100);
            this.addChild(level);
        }

        { // 按钮
            var upItem = cc.MenuItemImage.create(
                g_game_up_button,
                g_game_up_button_click,
                function () {
                    this.roleNode.swtichDirection(DIRECTION_UP);
                    this.roleNode.directionAnimate();
                },this);
            upItem.setAnchorPoint(0.5, 0.5);
            upItem.setPosition(185+750, 285-40-50);

            var downItem = cc.MenuItemImage.create(
                g_game_down_button,
                g_game_down_button_click,
                function () {
                    this.roleNode.swtichDirection(DIRECTION_DOWN);
                    this.roleNode.directionAnimate();
                },this);
            downItem.setAnchorPoint(0.5, 0.5);
            downItem.setPosition(185+750, 115+40-50);

            var leftItem = cc.MenuItemImage.create(
                g_game_left_button,
                g_game_left_button_click,
                function () {
                    this.roleNode.swtichDirection(DIRECTION_LEFT);
                    this.roleNode.directionAnimate();
                },this);
            leftItem.setAnchorPoint(0.5, 0.5);
            leftItem.setPosition(100+40+750, 200-50);

            var rightItem = cc.MenuItemImage.create(
                g_game_right_button,
                g_game_right_button_click,
                function () {
                    this.roleNode.swtichDirection(DIRECTION_RIGHT);
                    this.roleNode.directionAnimate();
                },this);
            rightItem.setAnchorPoint(0.5, 0.5);
            rightItem.setPosition(270-40+750, 200-50);

            var menu = cc.Menu.create(upItem,downItem,leftItem,rightItem);
            menu.setPosition(0,0);
            this.addChild(menu, 1);

            { // 右上角控制

                var audioCloseItem = cc.MenuItemImage.create(
                    g_game_audio_close,
                    g_game_audio_close,
                    function () {

                    },this);
                audioCloseItem.setAnchorPoint(0.5, 0.5);
                audioCloseItem.setScale(0.3);

                var audioOpenItem = cc.MenuItemImage.create(
                    g_game_audio_open,
                    g_game_audio_open,
                    function () {

                    },this);
                audioOpenItem.setAnchorPoint(0.5, 0.5);
                audioOpenItem.setScale(0.3);

                var toggleMenu = cc.MenuItemToggle.create(
                    audioOpenItem,
                    audioCloseItem,
                    function (){
                        if (toggleMenu.getSelectedIndex() == 1) {
                            if (!LOCAL_SERVICE) {
                                SmallBridge.sendMessage('mutemusic:1');
                            } else {
                                cc.AudioEngine.getInstance().setMusicVolume(0);
                            }
                        } else {
                            if (!LOCAL_SERVICE) {
                                SmallBridge.sendMessage('mutemusic:0');
                            } else {
                                cc.AudioEngine.getInstance().setMusicVolume(1);
                            }
                        }
                        g_audio_state = toggleMenu.getSelectedIndex()==1?false:true;
                    },this);
                toggleMenu.setPosition(size.width-40,size.height-30);

                if (g_audio_state) {
                    toggleMenu.setSelectedIndex(0);
                } else {
                    toggleMenu.setSelectedIndex(1);
                }

                var menu = cc.Menu.create(toggleMenu);
                menu.setPosition(0,0);
                this.addChild(menu, 1);

                { // 暂停或重新开始
                    var pauseItem = cc.MenuItemImage.create(
                        g_game_game_pause,
                        g_game_game_pause,
                        function () {
                            cc.Director.getInstance().pushScene(new GamePauseScene());
                        },this);
                    pauseItem.setAnchorPoint(0.5, 0.5);
                    pauseItem.setScale(0.3);
                    pauseItem.setPosition(size.width-40-50,size.height-30);

                    var restartItem = cc.MenuItemImage.create(
                        g_game_game_restart,
                        g_game_game_restart,
                        function () {
                            cc.Director.getInstance().purgeCachedData();
                            cc.Director.getInstance().replaceScene(new GameScene());
                        },this);
                    restartItem.setAnchorPoint(0.5, 0.5);
                    restartItem.setScale(0.3);
                    restartItem.setPosition(size.width-40-100,size.height-30);

                    var menu = cc.Menu.create(pauseItem,restartItem);
                    menu.setPosition(0,0);
                    this.addChild(menu, 1);
                }
            }
        }

        { // 精灵

            { // 火把动画
                var torch_name;
                if (g_current_level < 19) {
                    torch_name = "torch_small_";
                } else {
                    torch_name = "winter_torch_";
                }
                for (var j = 0; j < GameLevelConfig.getInstance().torch.length; j++) {
                    var frames = new Array();
                    for (var i = 1; i <= 15; i++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame(torch_name+i+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrameName(torch_name+"1.png");
                    sprite.setPosition(GameLevelConfig.getInstance().torch[j][0],GameLevelConfig.getInstance().torch[j][1]);
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }

            }



            { // 可碰撞的物体

                { // 可碰撞的物体
                    for (var i = 0; i < GameLevelConfig.getInstance().grids[0]; i++) {
                        for (var j = 0; j < GameLevelConfig.getInstance().grids[1]; j++) {
                            if (GameLevelConfig.getInstance().gameGrids[i][j] == 1) { // 梦
                                var frames = new Array();
                                for (var m = 1; m <= 20; m++){
                                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("red_dream_"+m+".png"));
                                }
                                var animation = new cc.Animation.create(frames,0.1);
                                var action = cc.Animate.create(animation);

                                var sprite = cc.Sprite.createWithSpriteFrameName("red_dream_1.png");
                                sprite.setPosition(
                                    j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                    size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                this.addChild(sprite);

                                var repeat = cc.RepeatForever.create(action);
                                sprite.runAction(repeat);

                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            } else if (GameLevelConfig.getInstance().gameGrids[i][j] == 5) { // 碗
                                var frames = new Array();
                                for (var m = 1; m <= 20; m++){
                                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("blue_cup_"+m+".png"));
                                }
                                var animation = new cc.Animation.create(frames,0.1);
                                var action = cc.Animate.create(animation);

                                var sprite = cc.Sprite.createWithSpriteFrameName("blue_cup_1.png");
                                sprite.setPosition(
                                    j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                    size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                this.addChild(sprite);

                                var repeat = cc.RepeatForever.create(action);
                                sprite.runAction(repeat);

                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            } else if (GameLevelConfig.getInstance().gameGrids[i][j] == 4) { // 树藤
                                var sprite = cc.Sprite.create(g_game_vines);
                                sprite.setPosition(
                                    j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                    size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
//                                this.addChild(sprite);
                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            } else if (GameLevelConfig.getInstance().gameGrids[i][j] == 8) { // 蝙蝠
                                var sprite = new AIBatNode();
                                sprite.init(i,j);
                                this.addChild(sprite);
                                sprite.shotFlyKnife();

                                this.aiBatList.push(sprite);

                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            } else if (GameLevelConfig.getInstance().gameGrids[i][j] == 7) { // 开关
                                var sprite = new FenceContorl();
                                sprite.init();
                                sprite.setPosition(
                                    j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                    size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                this.addChild(sprite);
                                this.fencecontrolList.push(sprite);
                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            } else if (GameLevelConfig.getInstance().gameGrids[i][j] == 9) { // 药瓶
                                var frames = new Array();
                                for (var m = 1; m <= 29; m++){
                                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("red_bottle_"+m+".png"));
                                }
                                var animation = new cc.Animation.create(frames,0.1);
                                var action = cc.Animate.create(animation);

                                var sprite = cc.Sprite.createWithSpriteFrameName("red_bottle_1.png");
                                sprite.setPosition(
                                    j*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                    size.height-(i*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                this.addChild(sprite);
                                sprite.setScale(0.8);

                                var repeat = cc.RepeatForever.create(action);
                                sprite.runAction(repeat);

                                GameLevelConfig.getInstance().addCollisionSprites(sprite,j,i);
                            }
                        }
                    }
                }
            }

            { // 传送门

                for (var i = 0; i < GameLevelConfig.getInstance().transport.length; i++) {
                    var item = GameLevelConfig.getInstance().transport[i];
                    var type = item["type"];
                    var fat = item["fat"];

                    var fileFlag = "blue";
                    if (type == 0) { // 蓝色
                        fileFlag = "blue";
                    } else { // 绿色
                        fileFlag = "green";
                    }

                    var frames = new Array();
                    for (var m = 1; m <= 30; m++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("transport_"+fileFlag+"_"+m+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrame(frames[0]);
                    sprite.setPosition(
                        fat[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                        size.height-(fat[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                    );
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }
            }

            { // 栅栏
                { // 显示开启状态的栅栏
                    this.barrierList = new Array();
                    var barrier = GameLevelConfig.getInstance().barrier["default"];
                    for (var i = 0; i < barrier.length; i++) {
                        var item = barrier[i];
                        var type = item["type"];
                        var info = item["info"];

                        var sprite;
                        if (g_current_level < 7) {

                        }
                        else if (g_current_level < 13) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_summer_landscape_open);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_summer_portrait_open);
                            }
                        }
                        else if (g_current_level < 19) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_fall_landscape_open);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_fall_portrait_open);
                            }
                        } else if (g_current_level < 26) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_winter_landscape_open);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_winter_portrait_open);
                            }
                        }
                        sprite.setPosition(
                                info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                        );
                        sprite.setScaleY(0.8);
                        this.addChild(sprite);

                        this.barrierList.push(sprite);

                        GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] = 6;
                    }
                }
                {  // 显示关闭状态的栅栏
                    var barrier = GameLevelConfig.getInstance().barrier["change"];
                    for (var i = 0; i < barrier.length; i++) {
                        var item = barrier[i];
                        var type = item["type"];
                        var info = item["info"];

                        var sprite;
                        if (g_current_level < 7) {

                        }
                        else if (g_current_level < 13) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_summer_landscape_close);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_summer_portrait_close);
                            }
                        }
                        else if (g_current_level < 19) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_fall_landscape_close);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_fall_portrait_close);
                            }
                        } else if (g_current_level < 26) {
                            if (type == 0) {
                                sprite = cc.Sprite.create(g_game_barrier_winter_landscape_close);
                            } else if (type == 1) {
                                sprite = cc.Sprite.create(g_game_barrier_winter_portrait_close);
                            }
                        }
                        sprite.setPosition(
                                info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                        );
                        sprite.setScaleY(0.8);
                        this.addChild(sprite);

                        this.barrierList.push(sprite);
                    }
                }
            }


            { // 能互动的精灵

                { // 海怪
                    this.seamonsterList = new Array();
                    var girds = GameLevelConfig.getInstance().gameGrids;
                    for (var i = 0; i < GameLevelConfig.getInstance().seamonster.length; i++) {
                        var item = GameLevelConfig.getInstance().seamonster[i];
                        var direction = item["direction"];
                        var startPoint = cc.p(
                                item["fat"][0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                                768-(item["fat"][0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2)
                        );
                        var endPoint = cc.p(
                                item["fat"][1][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().grid[0]/2,
                                768-(item["fat"][1][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().grid[1]/2)
                        );
                        var seamonster = new SeaMonsterNode();
                        seamonster.init(direction,startPoint,endPoint);
                        this.addChild(seamonster);

                        this.seamonsterList.push(seamonster);
                    }
                }

                { // 骷髅
                    this.skeletonList = new Array();
                    var girds = GameLevelConfig.getInstance().gameGrids;
                    for (var i = 0; i < GameLevelConfig.getInstance().skeleton.length; i++) {
                        var item = GameLevelConfig.getInstance().skeleton[i];
                        var direction = item["direction"];
                        var defaultPoint = item["fat"][0];
                        var targetPoint = item["fat"][1];
                        var skeleton = new AISkeletonNode();
                        skeleton.init(direction,defaultPoint,targetPoint);
                        this.addChild(skeleton);

                        this.skeletonList.push(skeleton);
                    }
                }
            }

            { // 人物
                this.roleNode = new RoleNode();
                this.roleNode.initWithGameLevelConfig();
                this.addChild(this.roleNode,1000);
            }

            { // 地形上的固定物
                var girds = GameLevelConfig.getInstance().gameGrids;
                for (var i = 0; i < GameLevelConfig.getInstance().fixed.length; i++) {
                    var item = GameLevelConfig.getInstance().fixed[i];
                    var type = item["type"];
                    var position = item["position"];
                    switch (type) {
                        case 1:
                        {
                            var sprite = cc.Sprite.create(g_game_fixed_1);
                            sprite.setPosition(cc.p(position[0],position[1]));
                            this.addChild(sprite,10);
                            break;
                        }
                        case 2:
                        {
                            var sprite = cc.Sprite.create(g_game_fixed_2);
                            sprite.setPosition(cc.p(position[0],position[1]));
                            this.addChild(sprite,10);
                            break;
                        }
                        case 3:
                        {
                            var sprite = cc.Sprite.create(g_game_fixed_3);
                            sprite.setPosition(cc.p(position[0],position[1]));
                            sprite.setScale(0.5);
                            this.addChild(sprite,10);
                            break;
                        }
                        case 4:
                        {
                            var sprite = cc.Sprite.create(g_game_fixed_4);
                            sprite.setPosition(cc.p(position[0],position[1]));
                            this.addChild(sprite,10);
                            break;
                        }
                        case 5:
                        {
                            var sprite = cc.Sprite.create(g_game_fixed_5);
                            sprite.setPosition(cc.p(position[0],position[1]));
                            this.addChild(sprite,10);
                            break;
                        }
                        default:
                            break;
                    }
                }
            }

            { // 随机加入萤火虫
                if (g_current_level >= 7 && g_current_level <= 12) {
                    var count = parseInt(Math.random()*(30-10+1) + 10);
                    for (var j = 0; j < count; j++) {
                        var frames = new Array();
                        for (var i = 1; i <= 19; i++){
                            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("glowworm_"+i+".png"));
                        }
                        var animation = new cc.Animation.create(frames,0.1);
                        var action = cc.Animate.create(animation);

                        var x = parseInt(Math.random()*900+1);
                        var y = parseInt(Math.random()*700+1);
                        var sprite = cc.Sprite.createWithSpriteFrameName("glowworm_1.png");
                        sprite.setPosition(x,y);
                        this.addChild(sprite);

                        var repeat = cc.RepeatForever.create(action);
                        sprite.runAction(repeat);
                    }
                }
            }

            { // 为了符合层级关系，做的移动

                // 底部竹子
                propsGroove = cc.Sprite.create(g_game_props_groove);
                propsGroove.setPosition(size.width/2,35);
                this.addChild(propsGroove);


                { // 右下角问题
                    var answerItem = cc.MenuItemImage.create(
                        g_game_answer_button,
                        g_game_answer_button_clicked,
                        function () {
                            cc.Director.getInstance().pushScene(new GameAnswerScene());
                        },this);
                    answerItem.setAnchorPoint(0.5, 0.5);
                    answerItem.setPosition(920, 40);

                    var menu = cc.Menu.create(answerItem);
                    menu.setPosition(0,0);
                    this.addChild(menu, 1);
                }

                { //  静态碰撞检测物体

                    { // 底部梦
                        var ps = [cc.p(228-89*2,768-753+20)];
                        var ss = [0.8];
                        for (var j = 0; j < ps.length; j++) {
                            var frames = new Array();
                            for (var i = 1; i <= 20; i++){
                                frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("gray_dream_"+i+".png"));
                            }
                            var animation = new cc.Animation.create(frames,0.1);
                            var action = cc.Animate.create(animation);

                            this.bottomDream = cc.Sprite.createWithSpriteFrameName("gray_dream_1.png");
                            this.bottomDream.setPosition(ps[j].x,ps[j].y);
                            this.bottomDream.setScale(ss[j]);
                            this.addChild(this.bottomDream);

                            var repeat = cc.RepeatForever.create(action);
                            this.bottomDream.runAction(repeat);
                        }
                    }

                    { // 底部瓶
                        var ps = [cc.p(228-89,768-757+20)];
                        var ss = [0.8];
                        for (var j = 0; j < ps.length; j++) {
                            var frames = new Array();
                            for (var i = 1; i <= 30; i++){
                                frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("gray_bottle_"+i+".png"));
                            }
                            var animation = new cc.Animation.create(frames,0.1);
                            var action = cc.Animate.create(animation);

                            this.bottomBottle = cc.Sprite.createWithSpriteFrameName("gray_bottle_1.png");
                            this.bottomBottle.setPosition(ps[j].x,ps[j].y);
                            this.bottomBottle.setScale(ss[j]);
                            this.addChild(this.bottomBottle);

                            var repeat = cc.RepeatForever.create(action);
                            this.bottomBottle.runAction(repeat);
                        }
                    }


                    { // 底部碗
                        var ps = [cc.p(235,768-755+20)];
                        var ss = [0.8];
                        for (var j = 0; j < ps.length; j++) {
                            var frames = new Array();
                            for (var i = 1; i <= 20; i++){
                                frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("gray_cup_"+i+".png"));
                            }
                            var animation = new cc.Animation.create(frames,0.1);
                            var action = cc.Animate.create(animation);

                            this.bottomCup = cc.Sprite.createWithSpriteFrameName("gray_cup_1.png");
                            this.bottomCup.setPosition(ps[j].x,ps[j].y);
                            this.bottomCup.setScale(ss[j]);
                            this.addChild(this.bottomCup);

                            var repeat = cc.RepeatForever.create(action);
                            this.bottomCup.runAction(repeat);
                        }
                    }

                }
            }
        }


        { // 游戏场景进入介绍图
            this.enterLayer = new GameEnterLayer();
            this.enterLayer.init();
            this.enterLayer.setPosition(size.width/2,size.height/2);
            this.addChild(this.enterLayer);
            this.enterLayer.updateWithLevel(g_current_level);
            this.enterLayer.setZOrder(100);
        }

        g_state_level[g_current_level-1] = 1;
        if (!LOCAL_SERVICE) {
            SmallBridge.sendMessage('savehistory:'+g_current_level+'-'+g_state_level.toString()+'-'+g_current_score.toString());
        }

        // 开启定时器
        this.schedule(this.update);

        this.setTouchEnabled(true);
        this.setKeyboardEnabled(true);
        return true;
    },

    onEnter:function() {
        this._super();
    },

    update:function(dt){
        var eventTag = this.roleNode.checkEvent();
        switch (eventTag) {
            case 1:// 碰撞到“梦”
            {
                var sprite = GameLevelConfig.getInstance().getCollisionSprite(this.roleNode.moveGridX,this.roleNode.moveGridY);
                this.removeChild(sprite);
                GameLevelConfig.getInstance().gameGrids[this.roleNode.moveGridY][this.roleNode.moveGridX] = 0;
                this.roleNode.canMoveToDoor = true; // 可以碰撞“门”了
                this.roleNode.performFog(); // 释放烟雾


                { // 开启门
                    var door = cc.Sprite.create("res/game/door/level_"+g_current_level+"_door"+".png");
                    doorGrid = GameLevelConfig.getInstance().getDoorGrid();
                    var size = cc.Director.getInstance().getWinSize();
                    door.setAnchorPoint(0,1);
                    door.setPosition(doorGrid[0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+GameLevelConfig.getInstance().doorOffset[0],
                        size.height-(doorGrid[1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1]+GameLevelConfig.getInstance().doorOffset[1]));
                    this.addChild(door);

                    var action = cc.FadeIn.create(0.3);
                    door.runAction(action);

                    { // 底部灰色的梦变成彩色的
                        this.bottomDream.removeFromParent();
                        var ps = [cc.p(228-89*2,768-753+20)];
                        var ss = [0.8];
                        for (var j = 0; j < ps.length; j++) {
                            var frames = new Array();
                            for (var i = 1; i <= 20; i++){
                                frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("red_dream_"+i+".png"));
                            }
                            var animation = new cc.Animation.create(frames,0.1);
                            var action = cc.Animate.create(animation);

                            this.bottomDream = cc.Sprite.createWithSpriteFrameName("red_dream_1.png");
                            this.bottomDream.setPosition(ps[j].x,ps[j].y);
                            this.bottomDream.setScale(ss[j]);
                            this.addChild(this.bottomDream);

                            var repeat = cc.RepeatForever.create(action);
                            this.bottomDream.runAction(repeat);
                        }
                    }
                }

                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playeffect:3');
                } else {
                    cc.AudioEngine.getInstance().playEffect(g_audio_game_effect_3, false);
                }
                break;
            }
            case 5:// 碰撞到碗
            {
                var sprite = GameLevelConfig.getInstance().getCollisionSprite(this.roleNode.moveGridX,this.roleNode.moveGridY);
                this.removeChild(sprite);
                GameLevelConfig.getInstance().gameGrids[this.roleNode.moveGridY][this.roleNode.moveGridX] = 0;
                this.roleNode.performFog(); // 释放烟雾
                this.scoreCount++; // 得分+1
                if (g_current_score[g_current_level-1] < this.scoreCount) {
                    g_current_score[g_current_level-1] = this.scoreCount;
                }

                { // 底部灰碗变成彩色的
                    this.bottomCup.removeFromParent();
                    var ps = [cc.p(228,768-755+20)];
                    var ss = [0.8];
                    for (var j = 0; j < ps.length; j++) {
                        var frames = new Array();
                        for (var i = 1; i <= 20; i++){
                            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("blue_cup_"+i+".png"));
                        }
                        var animation = new cc.Animation.create(frames,0.1);
                        var action = cc.Animate.create(animation);

                        this.bottomCup = cc.Sprite.createWithSpriteFrameName("blue_cup_1.png");
                        this.bottomCup.setPosition(ps[j].x,ps[j].y);
                        this.bottomCup.setScale(ss[j]);
                        this.addChild(this.bottomCup);

                        var repeat = cc.RepeatForever.create(action);
                        this.bottomCup.runAction(repeat);
                    }

                    this.scoreLabel.setString(this.scoreCount+"/3");
                }
                if (!LOCAL_SERVICE) {
                    SmallBridge.sendMessage('playeffect:1');
                } else {
                    cc.AudioEngine.getInstance().playEffect(g_audio_game_effect_1, false);
                }
                break;
            }
            case 3:// 碰撞到门
            {
                if (this.roleNode.canMoveToDoor) { // 进入关卡完成页面
                    cc.Director.getInstance().purgeCachedData();
                    if (g_current_level >= g_level_max) { // 如果当前是最后一关
                        cc.Director.getInstance().purgeCachedData();
                        cc.Director.getInstance().replaceScene(new GameMissionOverScene());
                    }
                    else {
                        var missionComplete = new GameMissionCompleteScene();
                        missionComplete.score = this.scoreCount;
//                        var transitionScene = cc.TransitionLib.getInstance().slideInBToScene(0.3,missionComplete);
                        cc.Director.getInstance().replaceScene(missionComplete);
                    }
                }
                break;
            }
            case 4: // 碰撞到树藤
            {
                cc.Director.getInstance().purgeCachedData();
                cc.Director.getInstance().replaceScene(new GameScene());
                break;
            }
            case 8: // 碰撞到蝙蝠
            {
                var sprite = GameLevelConfig.getInstance().getCollisionSprite(this.roleNode.moveGridX,this.roleNode.moveGridY);
                this.removeChild(sprite);
                GameLevelConfig.getInstance().gameGrids[this.roleNode.moveGridY][this.roleNode.moveGridX] = 0;
                if (this.roleNode.protectCount) {
                    this.roleNode.controlShield(false);
                } else {
                    cc.Director.getInstance().purgeCachedData();
                    cc.Director.getInstance().replaceScene(new GameScene());
                }
                break;
            }
            case 7: // 碰撞到开关
            {
                if (!this.inFenceControl) {
                    var sprite = this.fencecontrolList[0];
                    sprite.setState(!sprite.getState());

                    barrierDefault = sprite.getState();
                    { // 将栅栏设置到另外位置
                        var size = cc.Director.getInstance().getWinSize();

                        { // 移除显示的栅栏
                            for (var i = 0; i < this.barrierList.length; i++) {
                                var sprite = this.barrierList[i];
                                sprite.removeFromParent();
                            }
                            this.barrierList = new Array();
                        }

                        {
                            var barrier = GameLevelConfig.getInstance().barrier[barrierDefault?"default":"change"]; // 更新地图
                            for (var i = 0; i < barrier.length; i++) {
                                var item = barrier[i];
                                var type = item["type"];
                                var info = item["info"];

                                var sprite;
                                if (g_current_level < 7) {

                                }
                                else if (g_current_level < 13) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_summer_landscape_close);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_summer_portrait_close);
                                    }
                                }
                                else if (g_current_level < 19) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_fall_landscape_close);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_fall_portrait_close);
                                    }
                                } else if (g_current_level < 26) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_winter_landscape_close);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_winter_portrait_close);
                                    }
                                }
                                sprite.setPosition(
                                        info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                        size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                sprite.setScaleY(0.8);
                                this.addChild(sprite);

                                this.barrierList.push(sprite);


                                GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] = 0;
                            }
                        }

                        { // 将新一批栅栏设置
                            var barrier = GameLevelConfig.getInstance().barrier[barrierDefault?"change":"default"];
                            for (var i = 0; i < barrier.length; i++) {
                                var item = barrier[i];
                                var type = item["type"];
                                var info = item["info"];

                                var sprite;
                                if (g_current_level < 7) {

                                }
                                else if (g_current_level < 13) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_summer_landscape_open);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_summer_portrait_open);
                                    }
                                }
                                else if (g_current_level < 19) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_fall_landscape_open);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_fall_portrait_open);
                                    }
                                } else if (g_current_level < 26) {
                                    if (type == 0) {
                                        sprite = cc.Sprite.create(g_game_barrier_winter_landscape_open);
                                    } else if (type == 1) {
                                        sprite = cc.Sprite.create(g_game_barrier_winter_portrait_open);
                                    }
                                }
                                sprite.setPosition(
                                        info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                        size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                );
                                sprite.setScaleY(0.8);
                                this.addChild(sprite,2);

                                this.barrierList.push(sprite);

                                GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] = 6;
                            }
                        }
                    }

                    { // 开启AI骷髅碰触开关
                        for (var i = 0; i < this.skeletonList.length; i++) {
                            var sprite = this.skeletonList[i];
                            sprite.aiMoveOpened();
                        }
                    }

                    this.inFenceControl = true;
                }
                break;
            }
            case 9: // 碰撞到药瓶
            {
                var sprite = GameLevelConfig.getInstance().getCollisionSprite(this.roleNode.moveGridX,this.roleNode.moveGridY);
                this.removeChild(sprite);
                GameLevelConfig.getInstance().gameGrids[this.roleNode.moveGridY][this.roleNode.moveGridX] = 0;
                this.roleNode.controlShield(true);

                { // 底部灰药瓶变成彩色的
                    this.bottomBottle.removeFromParent();
                    var ps = [cc.p(228-89,768-757+20)];
                    var ss = [0.8];
                    for (var j = 0; j < ps.length; j++) {
                        var frames = new Array();
                        for (var i = 1; i <= 30; i++){
                            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("red_bottle_"+i+".png"));
                        }
                        var animation = new cc.Animation.create(frames,0.1);
                        var action = cc.Animate.create(animation);

                        this.bottomBottle = cc.Sprite.createWithSpriteFrameName("red_bottle_1.png");
                        this.bottomBottle.setPosition(ps[j].x,ps[j].y);
                        this.bottomBottle.setScale(ss[j]);
                        this.addChild(this.bottomBottle);

                        var repeat = cc.RepeatForever.create(action);
                        this.bottomBottle.runAction(repeat);
                    }
                }
                break;
            }
            case -1:
            default:
                this.inFenceControl = false;
                break;
        }

        {  // 填充冷香丸数值
            if (this.roleNode.protectCount > 0) {
                this.protectedLabel.setVisible(true);
                this.protectedLabel.setString("+"+this.roleNode.protectCount);
                this.updateBottle = true;
            } else {
                this.protectedLabel.setVisible(false);

               if (this.updateBottle) {
                   this.updateBottle = false;

                   { // 底部瓶 - 从彩色更换为灰色
                       this.bottomBottle.removeFromParent();
                       var ps = [cc.p(228-89,768-757+20)];
                       var ss = [0.8];
                       for (var j = 0; j < ps.length; j++) {
                           var frames = new Array();
                           for (var i = 1; i <= 30; i++){
                               frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("gray_bottle_"+i+".png"));
                           }
                           var animation = new cc.Animation.create(frames,0.1);
                           var action = cc.Animate.create(animation);

                           this.bottomBottle = cc.Sprite.createWithSpriteFrameName("gray_bottle_1.png");
                           this.bottomBottle.setPosition(ps[j].x,ps[j].y);
                           this.bottomBottle.setScale(ss[j]);
                           this.addChild(this.bottomBottle);

                           var repeat = cc.RepeatForever.create(action);
                           this.bottomBottle.runAction(repeat);
                       }
                   }
               }
            }
        }


        { // 检查碰撞到海怪没有
            for (var  i = 0; i < this.seamonsterList.length; i++) {
                var sm = this.seamonsterList[i];
                var rolePoint = this.roleNode.getPosition();
                var contentSize  =  sm.getContentSize();
                var checkRect = cc.rect(0, 0, contentSize.width, contentSize.height);
                checkRect.x += sm.getPosition().x-sm.getContentSize().width/2;
                checkRect.y += sm.getPosition().y-sm.getContentSize().height/2;
                if (cc.rectContainsPoint(checkRect, rolePoint)) {
                    if (this.roleNode.protectCount) {
                        this.roleNode.controlShield(false);
                        sm.removeFromParent();
                        this.seamonsterList.splice(i,1);
                    } else {
                        cc.Director.getInstance().purgeCachedData();
                        cc.Director.getInstance().replaceScene(new GameScene());
                    }
                    break;
                }
            }
        }

        { // 检查碰撞到骷髅没有
            for (var  i = 0; i < this.skeletonList.length; i++) {
                var sm = this.skeletonList[i];
                var rolePoint = this.roleNode.getPosition();
                var contentSize  =  sm.getContentSize();
                var checkRect = cc.rect(0, 0, contentSize.width, contentSize.height);
                checkRect.x = sm.getPosition().x-sm.getContentSize().width/2-20;
                checkRect.y = sm.getPosition().y-sm.getContentSize().height/2-20;
                checkRect.width += 40;
                checkRect.height += 40;
                if (cc.rectContainsPoint(checkRect, rolePoint)) {
                    if (this.roleNode.protectCount) {
                        this.roleNode.controlShield(false);
                        sm.removeFromParent();
                        this.skeletonList.splice(i,1);
                    } else {
                        cc.Director.getInstance().purgeCachedData();
                        cc.Director.getInstance().replaceScene(new GameScene());
                    }
                    break;
                }
            }
        }

        { // 检查碰撞到飞刀没有
            for (var i = 0; i < this.aiBatList.length; i++) {
                var aiBat = this.aiBatList[i];
                for (var j = 0; j < aiBat.flyKnifes.length; j++) {
                    var sm = aiBat.flyKnifes[j];
                    var rolePoint = this.roleNode.getPosition();
                    var contentSize  =  sm.getContentSize();
                    var checkRect = cc.rect(0, 0, contentSize.width, contentSize.height);
                    checkRect.x = sm.getPosition().x-sm.getContentSize().width/2-20;
                    checkRect.y = sm.getPosition().y-sm.getContentSize().height/2-20;
                    checkRect.width += 40;
                    checkRect.height += 40;
                    if (cc.rectContainsPoint(checkRect, rolePoint) && sm.isVisible()) {
                        if (this.roleNode.protectCount) {
                            this.roleNode.controlShield(false);
                            sm.setVisible(false);
                        } else {
                            cc.Director.getInstance().purgeCachedData();
                            cc.Director.getInstance().replaceScene(new GameScene());
                        }
                        break;
                    }
                }

            }
        }

        { // 检查是否AI骷髅碰触到开关
            for (var i = 0; i < this.skeletonList.length; i++) {
                var sprite = this.skeletonList[i];
                if (sprite.canChangeOpen) {
                    sprite.canChangeOpen = false;
                    sprite.aiMoveDefault();

                    { // 重置开关状态
                        var sprite = this.fencecontrolList[0];
                        sprite.setState(!sprite.getState());

                        barrierDefault = sprite.getState();
                        { // 将栅栏设置到另外位置
                            var size = cc.Director.getInstance().getWinSize();

                            { // 移除显示的栅栏
                                for (var i = 0; i < this.barrierList.length; i++) {
                                    var sprite = this.barrierList[i];
                                    sprite.removeFromParent();
                                }
                                this.barrierList = new Array();
                            }

                            {
                                var barrier = GameLevelConfig.getInstance().barrier[barrierDefault?"default":"change"]; // 更新地图
                                for (var i = 0; i < barrier.length; i++) {
                                    var item = barrier[i];
                                    var type = item["type"];
                                    var info = item["info"];

                                    var sprite;
                                    if (g_current_level < 7) {

                                    }
                                    else if (g_current_level < 13) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_summer_landscape_close);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_summer_portrait_close);
                                        }
                                    }
                                    else if (g_current_level < 19) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_fall_landscape_close);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_fall_portrait_close);
                                        }
                                    } else if (g_current_level < 26) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_winter_landscape_close);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_winter_portrait_close);
                                        }
                                    }
                                    sprite.setPosition(
                                            info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                            size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                    );
                                    sprite.setScaleY(0.8);
                                    this.addChild(sprite);

                                    this.barrierList.push(sprite);

                                    GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] = 0;
                                }
                            }

                            { // 将新一批栅栏设置
                                var barrier = GameLevelConfig.getInstance().barrier[barrierDefault?"change":"default"];
                                for (var i = 0; i < barrier.length; i++) {
                                    var item = barrier[i];
                                    var type = item["type"];
                                    var info = item["info"];

                                    var sprite;
                                    if (g_current_level < 7) {

                                    }
                                    else if (g_current_level < 13) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_summer_landscape_open);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_summer_portrait_open);
                                        }
                                    }
                                    else if (g_current_level < 19) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_fall_landscape_open);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_fall_portrait_open);
                                        }
                                    } else if (g_current_level < 26) {
                                        if (type == 0) {
                                            sprite = cc.Sprite.create(g_game_barrier_winter_landscape_open);
                                        } else if (type == 1) {
                                            sprite = cc.Sprite.create(g_game_barrier_winter_portrait_open);
                                        }
                                    }
                                    sprite.setPosition(
                                            info[0][0]*GameLevelConfig.getInstance().grid[0]+GameLevelConfig.getInstance().gridOffset[0]+(GameLevelConfig.getInstance().grid[0]/2),
                                            size.height-(info[0][1]*GameLevelConfig.getInstance().grid[1]+GameLevelConfig.getInstance().gridOffset[1])-(GameLevelConfig.getInstance().grid[1]/2)
                                    );
                                    sprite.setScaleY(0.8);
                                    this.addChild(sprite,2);

                                    this.barrierList.push(sprite);

                                    GameLevelConfig.getInstance().gameGrids[info[0][1]][info[0][0]] = 6;
                                }
                            }
                        }

                    }
                }
            }
        }
    },

    onTouchesBegan: function (touches, event) {
    },

    onTouchesMoved: function (touches, event) {
    },

    onTouchesEnded: function (touches, event) {

    },

    onTouchesCancelled: function (touches, event) {
    },

    onKeyUp : function(e) {
        if(e === cc.KEY.up) {
            this.roleNode.swtichDirection(DIRECTION_UP);
            this.roleNode.directionAnimate();

        }
        else if(e === cc.KEY.down) {
            this.roleNode.swtichDirection(DIRECTION_DOWN);
            this.roleNode.directionAnimate();
        }
        else if(e === cc.KEY.left) {
            this.roleNode.swtichDirection(DIRECTION_LEFT);
            this.roleNode.directionAnimate();
        }
        else if(e === cc.KEY.right) {
            this.roleNode.swtichDirection(DIRECTION_RIGHT);
            this.roleNode.directionAnimate();
        }
    },

    onKeyDown : function(e) {
    }
});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});