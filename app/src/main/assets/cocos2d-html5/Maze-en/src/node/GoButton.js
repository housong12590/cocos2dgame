/**
 * Created by huangxinping on 2/10/14.
 *
 * 出发按钮 - 主页
 *
 */

var GoButton = cc.Sprite.extend({
    ctor:function() {
        this._super();
        spriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame("start_1.png");
        this.initWithSpriteFrame(spriteFrame);
    },

    update: function (dt) {

    },

    onEnter:function() {
        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,0,true);
    },

    // 刚触摸瞬间
    onTouchBegan:function (touch, event) {
        if (!this.containsTouchLocation(touch)) return false;
        return true;
    },

    // 触摸移动
    onTouchMoved:function (touch, event) {

    },

    // 判断触摸点是否在图片的区域上
    containsTouchLocation:function (touch) {
        // 获取触摸点位置
        var getPoint = touch.getLocation();
        // 获取图片区域尺寸
        var contentSize  =  this.getContentSize();
        // 定义拖拽的区域
        var myRect = cc.rect(0, 0, contentSize.width, contentSize.height);
        myRect.x += this.getPosition().x-this.getContentSize().width/2;
        myRect.y += this.getPosition().y-this.getContentSize().height/2;
        // 判断点击是否在区域上
        return cc.rectContainsPoint(myRect, getPoint);
    },

    onTouchEnded:function (touch, event) {
        cc.Director.getInstance().getTouchDispatcher().removeAllDelegates();
        cc.Director.getInstance().purgeCachedData();
        cc.SpriteFrameCache.getInstance().removeSpriteFramesFromFile(g_main_skeleton_list);

        if (!LOCAL_SERVICE) {
            SmallBridge.sendMessage('gethistory:');
        } else {
            cc.Director.getInstance().replaceScene(new IntroduceScene());
//            var transitionScene = cc.TransitionLib.getInstance().slideInRToScene(0.3,new IntroduceScene());
//            cc.Director.getInstance().replaceScene(transitionScene);
        }
    }
});