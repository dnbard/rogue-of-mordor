define([
    'lodash',
    'core/factory',
    'core/objects',
    'services/keyboard',
    'services/camera',
    'enums',
    'phaser',
    'config/general'
], function(_, factory, Objects, KeyboardService, CameraService, enums, Phaser, config){
    factory.registerExtender('player-keyboard', {
        handler: function(player){
            var keyboardService = KeyboardService.create(),
                context = { id: player.id };

            keyboardService.subscribe(Phaser.Keyboard.UP, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX, player.gridY - 1),
                    camera = CameraService.create();

                if (tile && tile.passable){
                    player.y = (player.gridY - 1) * config.tileHeight;
                }
                camera.set(player);
            }, enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.DOWN, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX, player.gridY + 1),
                    camera = CameraService.create();

                if (tile && tile.passable){
                    player.y = (player.gridY + 1) * config.tileHeight;
                }
                camera.set(player);
            }, enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.LEFT, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX - 1, player.gridY),
                    camera = CameraService.create();

                if (tile && tile.passable){
                    player.x = (player.gridX - 1) * config.tileWidth;
                }
                camera.set(player);
            }, enums.KeyboardActions.DOWN, context);

            keyboardService.subscribe(Phaser.Keyboard.RIGHT, function(){
                var player = Objects.get(this.id),
                    level = Objects.get(player.levelId),
                    tile = level.getTile(player.gridX + 1, player.gridY),
                    camera = CameraService.create();

                if (tile && tile.passable){
                    player.x = (player.gridX + 1) * config.tileWidth;
                }
                camera.set(player);
            }, enums.KeyboardActions.DOWN, context);

        },
        type: enums.Extenders.FUNCTION
    });
});
