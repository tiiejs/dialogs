/** @module Tiie/Dialogs */
import DialogsService from "Tiie/Dialogs/Service";
import style from "./resources/style.scss";
import FramesAnimation from "Tiie/Frames/Animation";

export default function(app, params = {}) {
    if(!app.components().exists("@frames")) {
        console.warn("I can not init dialogs extension because there is no '@frames' service.");

        return 0;
    }

    // Init dialogs service. Dialogs need Frames service to work
    // properly.
    let service = new DialogsService(app.components().get("@frames"));

    app.components().set("@dialogs", service);

    // Attach dialogs to whole window.
    app.components().set("@dialogs.window", service.attach(app.target(), 1, {
        align : params.windowAlign ? params.windowAlign : ["center"],
        animationHideName : params.windowAnimationHideName ? params.windowAnimationHideName : FramesAnimation.ANIMATION_ZOOM_OUT,
        animationShowName : params.windowAnimationShowName ? params.windowAnimationShowName : FramesAnimation.ANIMATION_SLIDE_IN_FROM_TOP,

        // margin : params.windowMargin !== undefined ? params.windowMargin : 20,
        // margin : params.windowMargin,
        // marginBottom : params.windowMarginBottom,
        // marginLeft : params.windowMarginLeft,
        // marginRight : params.windowMarginRight,
        marginTop : params.windowMarginTop != undefined ? params.windowMarginTop : 100,
    }));

    return 1;
}
