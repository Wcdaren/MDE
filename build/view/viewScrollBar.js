"use strict";
const util_1 = require("../util");
class ScrollBarView extends util_1.DomHelper.FixedElement {
    constructor() {
        super("div", "mde-scrollbar");
        this._rectElem = null;
        this._rectElem = this.generateRectElem();
        this._dom.appendChild(this._rectElem);
        this._dom.style.background = "lightgrey";
        this.width = ScrollBarView.DefaultWidth;
    }
    generateRectElem() {
        let elem = util_1.DomHelper.elem("div", "mde-scrollbar-rect");
        elem.style.opacity = "0.5";
        return elem;
    }
    dispose() {
        if (this._dom !== null) {
            this._dom.remove();
            this._dom = null;
        }
    }
}
ScrollBarView.DefaultWidth = 18;
exports.ScrollBarView = ScrollBarView;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3L3ZpZXdTY3JvbGxCYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUFxQyxTQUVyQyxDQUFDLENBRjZDO0FBRTlDLDRCQUNZLGdCQUFTLENBQUMsWUFBWTtJQU05QjtRQUNJLE1BQU0sS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBSDFCLGNBQVMsR0FBbUIsSUFBSSxDQUFDO1FBS3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFFekMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDO0lBQzVDLENBQUM7SUFFTyxnQkFBZ0I7UUFDcEIsSUFBSSxJQUFJLEdBQW1CLGdCQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxPQUFPO1FBQ0gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7QUFFTCxDQUFDO0FBM0IwQiwwQkFBWSxHQUFHLEVBQUUsQ0FBQztBQUhoQyxxQkFBYSxnQkE4QnpCLENBQUEiLCJmaWxlIjoidmlldy92aWV3U2Nyb2xsQmFyLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==