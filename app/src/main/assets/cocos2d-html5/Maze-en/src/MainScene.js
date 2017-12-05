/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MainLayer;
MainLayer = cc.Layer.extend({

    go:null,

    init: function () {
        this._super();

        var size = cc.Director.getInstance().getWinSize();

        { // 音乐
            if (!LOCAL_SERVICE) {
                SmallBridge.sendMessage('playmusic:1');
            } else {
                cc.AudioEngine.getInstance().stopMusic();
                cc.AudioEngine.getInstance().playMusic(g_audio_game_background_1, true);
            }
        }

        { // plist序列
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_skeleton_list,g_main_skeleton);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_torch_list,g_main_torch);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_start_list,g_main_start);
            cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_shadow_list,g_main_shadow);
        }

        { // 背景及固定物
            var background = cc.Sprite.create(g_main_background);
            background.setPosition(size.width / 2, size.height / 2);
            this.addChild(background);

            { // 游戏名称
                var game_name = cc.Sprite.create(g_main_game_name);
                game_name.setPosition(size.width / 2, size.height);
                this.addChild(game_name);

                var moveBy = cc.MoveBy.create(0.3,cc.p(0,-140));
                game_name.runAction(moveBy);
            }

            { // 骷髅动画
                var frames = new Array();
                for (var i = 1; i <= 21; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("skeleton_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.1);
                var action = cc.Animate.create(animation);

                sprite = cc.Sprite.createWithSpriteFrameName("skeleton_1.png");
                sprite.setPosition(cc.p(170,270));
                this.addChild(sprite);

                var repeat = cc.RepeatForever.create(action);
                sprite.runAction(repeat);
            }

            { // 火把动画
                var ps = [cc.p(80,370),cc.p(670,450),cc.p(760,330)];
                var ss = [0.2,0.6,1.0];
                for (var j = 0; j < ps.length; j++) {
                    var frames = new Array();
                    for (var i = 1; i <= 16; i++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("torch_"+i+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrameName("torch_1.png");
                    sprite.setPosition(ps[j].x,ps[j].y);
                    sprite.setScale(ss[j]);
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }
            }

            { // 影子动画
                var ps = [cc.p(80,350),cc.p(660,385),cc.p(745,220)];
                var ss = [0.2,0.6,1.0];
                for (var j = 0; j < ps.length; j++) {
                    var frames = new Array();
                    for (var i = 1; i <= 16; i++){
                        frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("shadow_"+i+".png"));
                    }
                    var animation = new cc.Animation.create(frames,0.1);
                    var action = cc.Animate.create(animation);

                    var sprite = cc.Sprite.createWithSpriteFrameName("shadow_1.png");
                    sprite.setPosition(ps[j].x,ps[j].y);
                    sprite.setScale(ss[j]);
                    this.addChild(sprite);

                    var repeat = cc.RepeatForever.create(action);
                    sprite.runAction(repeat);
                }
            }

            { // 开始动画
                var frames = new Array();
                for (var i = 1; i <= 3; i++){
                    frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("start_"+i+".png"));
                }
                var animation = new cc.Animation.create(frames,0.3);
                var action = cc.Animate.create(animation);

                sprite = cc.Sprite.createWithSpriteFrame(cc.SpriteFrameCache.getInstance().getSpriteFrame("start_1.png"));
                sprite.setPosition(cc.p(865,120));
                this.addChild(sprite);
                var repeat = cc.RepeatForever.create(action);
                sprite.runAction(repeat);

                this.go = new GoButton();
                this.go.setPosition(cc.p(865,120));
                this.addChild(this.go);
            }
        }

        this.setTouchEnabled(false);
        return true;
    },

    onEnter:function() {
        this._super();
    },

    onTouchesBegan: function (touches, event) {
    },

    onTouchesMoved: function (touches, event) {
    },

    onTouchesEnded: function (touches, event) {

    },

    onTouchesCancelled: function (touches, event) {
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        layer.init();
        this.addChild(layer);
    }
});

