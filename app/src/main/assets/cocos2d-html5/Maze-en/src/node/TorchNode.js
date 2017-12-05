/**
 * Created by huangxinping on 2/25/14.
 *
 * 火把 - 暂时木有用到
 *
 */

var SUMMER_TORCH = 0; // 夏火
var WINTER_TORCH = 1; // 冬火

var TorchNode = cc.Sprite.extend({

    ctor : function() {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_torch_small_list,g_main_torch_small);
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_main_winter_torch_list,g_main_winter_torch);
    },

    initWithTorchType : function (torch_type,position) {
        var torch_name;
        switch (torch_type) {
            case SUMMER_TORCH:
            {
                torch_name = "torch_small_";
                break;
            }
            case WINTER_TORCH:
            {
                torch_name = "winter_torch_";
                break;
            }
            default:
                break;
        }
        var frames = new Array();
        for (var i = 1; i <= 15; i++){
            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame(torch_name+i+".png"));
        }
        var animation = new cc.Animation.create(frames,0.1);
        var action = cc.Animate.create(animation);

        this.initWithSpriteFrame(frames[0]);
        this.setPosition(position);

        var repeat = cc.RepeatForever.create(action);
        this.runAction(repeat);
    }

});