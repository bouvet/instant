/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/** @type {?} */
export const debounce = function (func, wait = 300, immediate = false) {
    /** @type {?} */
    let timeout;
    return function (...args) {
        /** @type {?} */
        const context = this;
        /** @type {?} */
        const later = () => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        /** @type {?} */
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVib3VuY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9pbnN0YW50LyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2RlYm91bmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsTUFBTSxPQUFPLFFBQVEsR0FBRyxVQUFVLElBQUksRUFBRSxJQUFJLEdBQUcsR0FBRyxFQUFFLFNBQVMsR0FBRyxLQUFLOztRQUMvRCxPQUFPO0lBQ1gsT0FBTyxVQUFTLEdBQUcsSUFBSTs7Y0FDZixPQUFPLEdBQUcsSUFBSTs7Y0FDZCxLQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ2pCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQUU7UUFDaEQsQ0FBQzs7Y0FDSyxPQUFPLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTztRQUNyQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEMsSUFBSSxPQUFPLEVBQUU7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztTQUFFO0lBQzdDLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZGVib3VuY2UgPSBmdW5jdGlvbiAoZnVuYywgd2FpdCA9IDMwMCwgaW1tZWRpYXRlID0gZmFsc2UpIHtcclxuICBsZXQgdGltZW91dDtcclxuICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xyXG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XHJcbiAgICBjb25zdCBsYXRlciA9ICgpID0+IHtcclxuICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7IH1cclxuICAgIH07XHJcbiAgICBjb25zdCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xyXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG4gICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfVxyXG4gIH07XHJcbn07XHJcbiJdfQ==