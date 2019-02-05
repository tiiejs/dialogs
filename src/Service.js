/** @module Tiie/Dialogs */
import TiieObject from "Tiie/Object";
import Dialogs from "Tiie/Dialogs/Dialogs";

const cn = "Service";
class Service extends TiieObject {
    constructor(frames) {
        super();

        let p = this.__private(cn, {
            frames,
            dialogs : [],
        });

        setInterval(() => {
            this._reload();
        }, 1000);
    }

    /**
     * Attach dialogs mechanism to specific document element.
     *
     * @param {jQuery}   target
     * @param {boolean}  fixed
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
     *
     * @return {Tiie.Dialogs.Dialogs}
     */
    attach(target, fixed = 0, params = {}) {
        let p = this.__private(cn),
            // First get frames.
            frames = p.frames.attach(target, fixed)
        ;

        console.log('Service.attach', params);

        let dialogs = new Dialogs(frames, {
            align : params.align,
            animationHideName : params.animationHideName,
            animationShowName : params.animationShowName,
            margin : params.margin,
            marginBottom : params.marginBottom,
            marginLeft : params.marginLeft,
            marginRight : params.marginRight,
            marginTop : params.marginTop,
        });

        p.dialogs.push(dialogs);

        return dialogs;
    }

    _reload() {
        let p = this.__private(cn),
            destroyed = 0
        ;

        p.dialogs.forEach((dialog) => {
            if (dialog.is("@destroyed")) {
                destroyed = 1;
                return;
            }

            dialog.reload();
        });

        if (destroyed) {
            p.dialogs = p.dialogs.filter(dialog => dialog.is("@destroyed"));
        }
    }
}

export default Service;

