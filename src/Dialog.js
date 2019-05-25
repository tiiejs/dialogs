/** @module Tiie/Dialogs */
import TiieObject from "Tiie/Object";

import jQuery from "jquery";

import templateLayout from "./resources/layout.html";
import templateContent from "./resources/content.html";
import templateContentContainer from "./resources/contentContainer.html";

import View from "Tiie/View";

const cn = 'Dialog';

/**
 * Main class to display dialog.
 *
 * @param {object} [data]
 * @param {string} [data.type]
 * @param {string} [data.layout]
 * @param {string} [data.title]
 * @param {string} [data.buttons]
 * @param {string} [data.buttonsClose]
 *
 * @class
 */
class Dialog extends View {
    constructor(data = {}) {
        super(templateLayout);

        let p = this.__private(cn, {
            type : Dialog.TYPE_NORMAL,
            buttons : [],
        });

        this.__define("data.structure", {
            type : {type : "string", default : "primary", notNull : 1},
            layout : {type : "string", default : "portlet", notNull : 1},
            title : {type : "string", default : null, notNull : 0},
            buttons : {type : "array", default : [], notNull : 1},
            buttonsClose : {type : "boolean", default : 1, notNull : 1},
        });

        this.set(data, {silently : 1, defined : 1});

        if(data.content) {
            this.set("-content", data.content);
        }

        this.on([
            "type:change",
            "title:change",
            "content:change",
            "buttons:change",
            "buttonsClose:change",
        ], () => {
            this.render();
        });

        this.on("events.close", (event, params) => {
            this.destroy();
        });
    }

    __setValue(target, name, value, emitparams = {}) {
        let p = this.__private(cn);

        if(name == "buttons") {
            value.forEach((button) => {
                button.section = button.section ? button.section : "center";
                button.type = button.type ? button.type : "primary";
            });

            return super.__setValue(target, name, value, emitparams);
        } else {
            return super.__setValue(target, name, value, emitparams);
        }
    }

    render() {
        let p = this.__private(cn),
            content = this.get("content"),
            layout = this.get("layout")
        ;

        if(layout == "portlet") {
            this.__content("__root", templateContent);
        } else if(layout == "container") {
            this.__content("__root", templateContentContainer);
        }

        if(typeof content == "string") {
            this.element("content").html(content);
        } else if(content instanceof View){
            content.target(this.element("content"));
        } else {
            this.__log("Unsuported type of content for dialog.", "notice", "Topi.Dialogs.Dialog::render");
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
