/**
 * Created by huangxinping on 2/25/14.
 *
 * 栅栏开关
 *
 */

var FenceContorl = cc.Sprite.extend({

    state:false, // false - 关 ，true - 开

    ignore:true,

    ctor : function () {
      this._super();
    },

    init : function () {
        this.initWithFile(g_game_fence_close);
    },

    setState : function (state) {
//        this.ignore = !this.ignore;
//        if (this.ignore) { // 设置状态会连续进入两次，暂时还不知道原因，先使用变量值，做忽略
//            return;
//        }
        if (state == false) {
            this.initWithFile(g_game_fence_close);
        } else {
            this.initWithFile(g_game_fence_open);
        }
        this.state = state;
    },

    getState : function () {
        return this.state;
    }
});
