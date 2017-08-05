/**
 * Silver Context Menu
 *
 * Context Menu plugin based on example plugin from "jQuery in Action, Third Edition" book
 *
 * @version 0.0.1
 * @author Marcin Dobroszek
 * @license The MIT License (MIT)
 */
;(function($, undefined) {
    var namespace = 'silverContextMenu';
    //var defaultOptions = {};

    /**
     * All available methods.
     * @private
     */
    var methods = {

        /**
         * Creates a ContextMenu.
         * @param {Object} [config] - The options
         */
        init: function(config) {
            var options = $.extend({}, $.fn.silverContextMenu.defaults, config),
                $menu = $(options.menuSelector);

            // check if required options are configured
            if (!options.menuSelector) {
                $.error('No menu specified.')
            }

            // check if menu was found
            if ($menu.length === 0) {
                $.error('The menu specified does not exist.')
            }

            // check if plugin was not initialized before on this element
            if (this.filter(function() {return $(this).data(namespace);}).length !== 0) {
                $.error('The plugin has already been initialized.')
            }
            this.data(namespace, options);

            // mouse, right click (contextmenu) event - open ContextMenu
            this.on('contextmenu.' + namespace, function(event) {
                event.preventDefault();
                $menu
                    .css({
                        position: 'absolute',
                        top: event.pageY,
                        left: event.pageX,
                    })
                    .show();
            });

            // mouse click event on any webiste element except the ContextMenu - close ContextMenu
            $('html').on('click.' + namespace, function(event) {
                if ($(event.target).closest($menu).length === 0) { // clicked outside $menu
                    $menu.hide();
                }
            });

            return this; // jQuery Method Chaining
        },

        /**
         * Destroys a ContextMenu.
         */
        destroy: function() {
            this
                .each(function() {
                    var options = $(this).data(namespace);
                    $(options.menuSelector).hide();
                })
                .removeData(namespace)
                .add('html').off('.' + namespace); // destroy all plugin events

            return this; // jQuery Method Chaining
        }
    };

    // definition of plugin
    $.fn.silverContextMenu = function(method) {
        if ($.type(method) === 'string' && methods[method]) {
            return methods[method].apply(
                this,
                Array.prototype.slice.call(arguments, 1)
            );
        }
        else if ($.type(method) === 'object') { // got object with configuration - init() method start
            return methods.init.apply(this, arguments);
        }
        else if (method === undefined) { // got nothing
            $.error('Method name or/and configuration object is required.')
        }
        else {
            $.error('Method ' + method + ' does not exist.')
        }
    };

    // make defaults configuration available outside
    $.fn.silverContextMenu.defaults = {
        menuSelector: null
    };
})(jQuery);
