var CCBMainScene = cc.Scene.extend({
    ctor:function () {
        this._super();

        cc.BuilderReader.setResolutionScale(2);
        var node = cc.BuilderReader.load(s_scene_main);

        this.addChild(node);
        this.setPosition(cc.p(0, 0));
    },
});
