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
    app.components().set("@dialogs.window", service.attach(app.target(), {
        fixed : 1,
        animationHideName : params.windowAnimationHideName,
        animationShowName : params.windowAnimationShowName,

        align : params.windowAlign,
        margin : params.windowMargin,
        marginTop : params.windowMarginTop,
        marginBottom : params.windowMarginBottom,
        marginRight : params.windowMarginRight,
        marginLeft : params.windowMarginLeft,
        zIndex : params.windowZIndex,
    }));

    return 1;
}
