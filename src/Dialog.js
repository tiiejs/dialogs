import TiieObject from "Tiie/Object";
import jQuery from "jquery";

import icons from "./resources/icons.js";
import templateLayout from "./resources/layout.html";
import templateContent from "./resources/content.html";

import View from "Tiie/View";

const cn = 'Dialog';
class Dialog extends View {
    constructor(data = {}) {
        super(templateLayout);

        let p = this.__private(cn, {
            type : Dialog.TYPE_NORMAL,
            buttons : [],
            content : null,
        });

        this.__define("data.structure", {
            type : {type : "string", default : null, notNull : 0},
            title : {type : "string", default : null, notNull : 0},
            buttons : {type : "array", default : [], notNull : 0},
        });

        this.set(data, {silently : 1, defined : 1});

        // if(param.content) {
        //     this.set("-content", params.content);
        // }

        // if (!this.get("&buttons").some(b => b.id == "close")) {
        //     this.get("&buttons").push({
        //         id : "actionClose",
        //         action : "close",
        //     });
        // }

        this.on([
            "type:change",
            "title:change",
            // "content:change",
            "buttons:change",
        ], () => {
            this.render();
        });

        // this.on("action.close:run", (event, params) => {
        //     // this.emit("action.close:stop")
        //     // this.emit("action.close:pouse")
        //     // this.emit("action.close:error")
        //     this.emit("action.close:finish")

        //     this.destroy();
        // });

        // p.element.on("click", ".em-dialogs__dialog-action", (event) => {
        //     let target = jQuery(event.currentTarget),
        //         action = target.data("action")
        //     ;

        //     this.emit(`action.${action}:run`);

        //     event.stopPropagation();
        // });
    }

    // get(name, value = null, params = {}) {
    //     let p = this.__private(cn);

    //     if(name == "content") {
    //         if(typeof content == "string") {
    //             this.element("content").html(content);
    //         } else if(content instanceof View){
    //             content.target(this.element("content"));
    //         } else {
    //             this.log("Unsuported type of content for dialog.", "notice");
    //         }
    //     } else {
    //         return super.get(name, value, params);
    //     }
    // }

    // set(name, value = null, params = {}) {
    //     let p = this.__private(cn);

    //     if(name == "content") {

    //     } else {
    //         return super.get(name, value, params);
    //     }
    // }

    render() {
        let p = this.__private(cn),
            content = this.get("content")
        ;

        this.element().content(this.__template(templateContent, this.data({clone : 0})));

        if(typeof content == "string") {
            this.element("content").html(content);
        } else if(content instanceof View){
            content.target(this.element("content"));
        } else {
            this.log("Unsuported type of content for dialog.", "notice");
        }

        return this;
    }
}

// Dialog.TYPE_NORMAL = "normal";
// Dialog.TYPE_INFO = "info";
// Dialog.TYPE_WARNING = "warning";
// Dialog.TYPE_DANGER = "danger";
// Dialog.TYPE_SUCCESS = "success";
// Dialog.TYPE_ERROR = "error";

export default Dialog;
