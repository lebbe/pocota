"use strict";
exports.__esModule = true;
exports.useSubscribeForRender = void 0;
var react_1 = require("react");
/**
 * This hook was necessary because I wanted to render the TD directly inside
 * TR for promoted TDs (so the TD component in itself would just return null,
 * and the TR outputs the TD props.children).
 *
 * The issue, was that nothing would rerender when the content of the TD
 * changed. By letting the TR subscribe for rerenders (by simply udpating
 * its state for the promoted cells), I could sew it all together again.
 *
 */
function useSubscribeForRender(children) {
    var _a = (0, react_1.useState)(function () { return function (_element) { }; }), subscriber = _a[0], setSubscriber = _a[1];
    (0, react_1.useEffect)(function () {
        subscriber(children);
    }, [children, subscriber]);
    function addSubscriber(fn) {
        setSubscriber(function () { return fn; });
    }
    return addSubscriber;
}
exports.useSubscribeForRender = useSubscribeForRender;
