;(function($, QUnit, undefined) {
    QUnit.module('Core', {
        afterEach: function () {
            $('#qunit-fixture').removeData();
        }
    });

    QUnit.test('Requirements', function (assert) {
        assert.expect(4);

        assert.ok($, 'jQuery loaded correctly');
        assert.ok($.fn.silverContextMenu, 'silverContextMenu plugin loaded correctly');
        assert.ok($.fn.silverContextMenu.defaults, 'Default values available');
        assert.propEqual(
            $.fn.silverContextMenu.defaults,
            {
                menuSelector: null
            },
            'Default values are correctly'
        );
    });

    QUnit.test('Invalid parameters', function (assert) {
        var $fixture = $('#qunit-fixture');

        assert.expect(7);

        assert.throws(
            function () {
                $fixture.silverContextMenu();
            },
            /Method name or\/and configuration object is required./,
            'Call without parameter'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu('no method');
            },
            /Method .*? does not exist./,
            'Call undefined method'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu(100);
            },
            /Method .*? does not exist./,
            'Invalid parameter type: number'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu(null);
            },
            /Method .*? does not exist./,
            'Invalid parameter type: null'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu([]);
            },
            /Method .*? does not exist./,
            'Invalid parameter type: array'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu({});
            },
            /No menu specified./,
            'No menu specified'
        );
        assert.throws(
            function () {
                $fixture.silverContextMenu({menuSelector: 'unknown selector'});
            },
            /The menu specified does not exist./,
            'Unknown menu'
        );
    });

    QUnit.test('Initialization', function (assert) {
        var $fixture = $('#qunit-fixture'),
            $fixtureInitialized = $fixture.silverContextMenu({
                menuSelector: '#menuid'
            });

        assert.expect(5);

        assert.ok($fixtureInitialized, 'Menu initialized');
        assert.notEqual($fixtureInitialized.data('silverContextMenu'), undefined, 'Correct namespace');
        assert.strictEqual($fixture.length, $fixtureInitialized.length, 'Chainable');
        assert.strictEqual($fixture, $fixtureInitialized, 'The same object');
        assert.throws(
            function () {
                $fixture.silverContextMenu({menuSelector: '#menuid'});
            },
            /The plugin has already been initialized./,
            'The plugin has already been initialized'
        );
    });

    QUnit.test('Events', function (assert) {
        var $fixture = $('#qunit-fixture').silverContextMenu({
                menuSelector: '#menuid'
            }),
            $menu = $('#menuid');

        assert.expect(4);

        assert.strictEqual(
            $menu.css('display'),
            'none',
            'Menu is hidden'
        );

        $fixture.trigger('contextmenu');
        assert.strictEqual(
            $menu.css('display'),
            'block',
            'Menu is active after click mouse right button'
        );

        $menu.trigger('click');
        assert.strictEqual(
            $menu.css('display'),
            'block',
            'Menu is active after click on it'
        );

        $(document.body).trigger('click');
        assert.strictEqual(
            $menu.css('display'),
            'none',
            'Menu is hidden after click over menu'
        );
    });

    QUnit.test('Destroy', function (assert) {
        var $fixture = $('#qunit-fixture').silverContextMenu({
                menuSelector: '#menuid'
            }),
            $fixtureDestroyed = $fixture.silverContextMenu('destroy'),
            $menu = $('#menuid');

        assert.expect(5);

        assert.strictEqual($fixture.length, $fixtureDestroyed.length, 'Chainable');
        assert.strictEqual($fixture, $fixtureDestroyed, 'The same object');
        assert.strictEqual(
            $menu.css('display'),
            'none',
            'Menu is hidden'
        );
        assert.equal($fixture.data('silverContextMenu'), undefined, 'Data was deleted');

        $fixture.trigger('contextmenu');
        assert.strictEqual(
            $menu.css('display'),
            'none',
            'Menu is still disabled after click mouse right button'
        );
    });
})(jQuery, QUnit);
