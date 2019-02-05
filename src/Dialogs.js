/** @module Tiie/Dialogs */
import TiieObject from "Tiie/Object";

import Dialog from "Tiie/Dialogs/Dialog";

import FramesLayout from "Tiie/Frames/Layouts/Layout";
import FramesLayer from "Tiie/Frames/Layer";
import FramesAnimation from "Tiie/Frames/Animation";

const cn = 'Dialogs';

/**
 * @class
 *
 * @param {object} [params]
 * @param {string[]} [params.align]
 * @param {string} [params.animationHideName]
 * @param {string} [params.animationShowName]
 * @param {number} [params.margin]
 * @param {number} [params.marginBottom]
 * @param {number} [params.marginLeft]
 * @param {number} [params.marginRight]
 * @param {number} [params.marginTop]
 */
class Dialogs extends TiieObject {

    /**
     * Prepare dialogs for given frames.
     */
    constructor(frames, params = {}) {
        super();

        let p = this.__private(cn, {
            // Frames for target.
            frames,

            // Layer with dialogs.
            framesLayer : null,

            // Name of loader.
            framesLayerName : `dialogs-${this.id()}`,

            // List of dialogs.
            dialogs : [],
        });

        // Create default layer for dialogs.
        p.framesLayer = p.frames.createLayer(p.framesLayerName, {
            layout : FramesLayout.TYPE_BOX,

            align : params.align ? params.align : ["right"],
            animationHideName : params.animationHideName,
            animationShowName : params.animationShowName,
            margin : params.margin,
            marginBottom : params.marginBottom,
            marginLeft : params.marginLeft,
            marginRight : params.marginRight,
            marginTop : params.marginTop,
        });
    }

    /**
     * Create dialog and display it.
     *
     * @param {object} params
     *
     * @return {Tiie.Dialogs.Dialog}
     */
    create(params = {}) {
        let p = this.__private(cn),
            object = new Dialog(params),
            frame = p.frames.create(p.framesLayerName, {
                width : 500,
                height : "auto",
            })
        ;

        let dialog = {
            object,
            frame,
            destroyed : 0,
            hover : 0,
        };

        object.render();

        p.dialogs.push(dialog);

        if (params.duration) {
            setTimeout(function() {
                dialog.destroyed = 1;
            }, params.duration);
        } else {
            setTimeout(function() {
                // dialog.destroyed = 1;
            }, 3000);
        }

        frame.element().append(object.element());

        return object;
    }

    reload() {
        let p = this.__private(cn),
            destroyed = 0
        ;

        if (p.dialogs.some(dialog => dialog.frame.is("@hover"))) {
            return;
        }

        p.dialogs.forEach((dialog) => {
            if (dialog.destroyed) {
                dialog.frame.destroy();

                destroyed = 1;
                return;
            }

            if (dialog.object.is("@destroyed")) {
                dialog.frame.destroy();

                destroyed = 1;
                return;
            }

            if (!dialog.object.is("@visible")) {
                dialog.frame.hide();
            } else {
                dialog.frame.show();
            }
        });

        if (destroyed) {
            p.dialogs = p.dialogs.filter(dialog => !dialog.object.is("@destroyed"));
        }
    }

    testGenerateDialogs() {
        let p = this.__private(cn);

        this.create({
            type : Dialog.TYPE_NORMAL,
            title : `Title ${Dialog.TYPE_NORMAL}`,
            message : `Message ${Dialog.TYPE_NORMAL}`,
        });

        this.create({
            type : Dialog.TYPE_INFO,
            title : `Title ${Dialog.TYPE_INFO}`,
            message : `Message ${Dialog.TYPE_INFO}`,
        });

        this.create({
            type : Dialog.TYPE_WARNING,
            title : `Title ${Dialog.TYPE_WARNING}`,
            message : `Message ${Dialog.TYPE_WARNING}`,
        });

        this.create({
            type : Dialog.TYPE_DANGER,
            title : `Title ${Dialog.TYPE_DANGER}`,
            message : `Message ${Dialog.TYPE_DANGER}`,
        });

        this.create({
            type : Dialog.TYPE_SUCCESS,
            title : `Title ${Dialog.TYPE_SUCCESS}`,
            message : `Message ${Dialog.TYPE_SUCCESS}`,
        });

        this.create({
            type : Dialog.TYPE_ERROR,
            title : `Title ${Dialog.TYPE_ERROR}`,
            message : `Message ${Dialog.TYPE_ERROR}`,
        });
    }
}

export default Dialogs;
