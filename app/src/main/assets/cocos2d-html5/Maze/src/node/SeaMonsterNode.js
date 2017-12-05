/**
 * Created by huangxinping on 2/25/14.
 *
 * 海怪
 *
 */

var SEA_MONSTER_LANDSCAPE = 0; // 横向
var SEA_MONSTER_PORTRAIT = 1; // 纵向

var SeaMonsterNode = cc.Sprite.extend({

    flip:true, // 是否需要镜像反转

    ctor : function() {
        this._super();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(g_game_seamonster_plist,g_game_seamonster);
    },

    init : function (direction,startPoint,endPosition) {

        var duration = 2.0;
        switch (direction) {
            case SEA_MONSTER_LANDSCAPE:
                this.flip = true;
                duration = (endPosition.x-startPoint.x)/75;
                break;
            case SEA_MONSTER_PORTRAIT:
                this.flip = false;
                duration = (endPosition.y-startPoint.y)/75;
                break;
            default:
                break;
        }
        if (duration < 0) {
            duration = 2.0;
        }

        var frames = new Array();
        for (var i = 1; i <= 15; i++){
            frames.push(cc.SpriteFrameCache.getInstance().getSpriteFrame("sea_monster_"+i+".png"));
        }
        var animation = new cc.Animation.create(frames,0.1);
        var action = cc.Animate.create(animation);
        var repeatAnimate = cc.RepeatForever.create(action);

        this.initWithSpriteFrame(frames[0]);
        this.setPosition(startPoint);
        if (this.flip) {
            this.setFlippedX(true);
        }

        var mt = cc.MoveTo.create(duration+Math.random(),endPosition);
        var callF_mt = cc.CallFunc.create(function(){
            if (this.flip) {
                this.setFlippedX(false);
            }
        },this,true);
        var mtb = cc.MoveTo.create(duration+Math.random(),startPoint);
        var callF_mtb = cc.CallFunc.create(function(){
            if (this.flip) {
                this.setFlippedX(true);
            }
        },this,true);
        var seq = cc.Sequence.create(mt,callF_mt,mtb,callF_mtb);
        var repeatMove = cc.RepeatForever.create(seq);

        this.runAction(repeatAnimate);
        this.runAction(repeatMove);
    }

});