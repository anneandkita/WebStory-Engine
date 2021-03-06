/* global MO5 */

MO5("WSE.tools", "WSE.DisplayObject").
define("WSE.assets.Background", function (tools, DisplayObject) {
    
    "use strict";
    
    function resize (self) {
        self.element.setAttribute("width", self.stage.offsetWidth);
        self.element.setAttribute("height", self.stage.offsetHeight);
    }
    
    function styleElement (self) {
        
        var s = self.element.style;
        
        self.element.setAttribute("id", self.cssid);
        self.element.setAttribute("class", "WSEBackground");
        self.element.style.position = "absolute";
        self.element.draggable = false;
        s.left = 0;
        s.top = 0;
        s.opacity = 0;
        s.zIndex = self.z;
    }
    
    function Background (asset, interpreter) {
        
        DisplayObject.call(this);
        
        var self = this;
        
        this.asset = asset;
        this.interpreter = interpreter;
        this.bus = interpreter.bus;
        this.stage = interpreter.stage;
        this.z = asset.getAttribute("z") || 10;
        this.cssid = "WSEBackground_" + this.id;
        this.element = document.createElement("img");
        this.src = asset.getAttribute('src');
        this.name = asset.getAttribute('name');
        
        if (!this.src) {
            
            this.bus.trigger(
                'wse.interpreter.warning',
                {
                    element: asset,
                    message: 'No source defined on background asset.'
                }
            );
            
            return;
        }
        
        tools.applyAssetUnits(this, asset);
        this.element.setAttribute('src', this.src);
        styleElement(this);
        resize(this);
        window.addEventListener('resize', function () { resize(self); });

        this.stage.appendChild(this.element);
    }
    
    Background.prototype = new DisplayObject();
    
    Background.prototype.save = function () {
        return {
            cssid: this.cssid,
            z: this.z
        };
    };
    
    Background.prototype.restore = function (obj) {
        
        this.cssid = obj.cssid;
        this.z = obj.z;
        
        try {
            this.element = document.getElementById(this.cssid);
        }
        catch (e) {
            
            this.bus.trigger(
                "wse.interpreter.warning",
                {
                    message: "Element with CSS ID '" + this.cssid + 
                        "' could not be found."
                }
            );
            
            return;
        }
    };
    
    return Background;
    
});