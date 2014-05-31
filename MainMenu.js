/*
 Main menu for the game.  Shows Title
 */

function MainMenu() {
    var graphics;
    var state = new Phaser.State();
    state.preload = preload;
    state.create = create;
    state.update = update;
    state.handleInput = handleInput;
    state.render = render;


    // =============================
    // Optional Config
    var SKIP_MAIN_MENU = false;
    var NEXT_STATE = states.map;
    var HIDE_TEXT_ON_LAUNCH = false;
    // =============================

    var STAR_FIELD_HEIGHT = game.height * 4;
    var STAR_FIELD_WIDTH = game.width * 4;

    var MENU_STARS = 3000;
    var STAR_FPS = 6;
    var ANIMATION_SHIFT_CHANCE = .2;
    var shineSets = [
        [1, 2, 3, 2, 3, 2, 1],
        [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0],
        [7, 6, 5, 6, 5, 6, 7],
        [0, 0, 0, 0, 0, 1, 2, 1, 2, 1],
        [0, 1, 2, 3, 4, 5, 6, 7]
    ];

    var SECONDARY_STARS_RATIO = .4;
    var SECONDARY_STARS_ROTATION_SLOW_RATIO = .7;
    var SECONDARY_STARS_ROTATION_FAST_RATIO = .9;

    var MAX_MOVE_SPEED = 20;
    var MAX_MOVE_ACCELERATION = 1;
    var NORMAL_MOVE_SPEED = 2;

    var MAX_ROTATION_SPEED = 3;
    var MAX_ROTATION_ACCELERATION = .05;
    var NORMAL_ROTATION_SPEED = .01;

    var currentMoveSpeed = NORMAL_MOVE_SPEED;
    var currentRotationSpeed = NORMAL_ROTATION_SPEED;

    var starGroup;
    var starGroup2;
    var textGroup;

    var STATE_CHANGE_X_POS = 2500;
    var enteringGameState = false;

    /**
     * First function to run, loads the assets for this state
     */
    function preload() {
        game.load.spritesheet('animated_star', 'assets/star.png', 5, 5);
    }

    /**
     * Initialize state logic
     */
    function create() {

        if (SKIP_MAIN_MENU) {
            game.changeState(NEXT_STATE);
        }
        else {
            state.world.setBounds(0, 0, STAR_FIELD_WIDTH, STAR_FIELD_HEIGHT);

            state.camera.x = -game.height * 4;
            state.camera.y = 0;

            graphics = state.add.graphics(0, 0);

            //groups
            starGroup = game.add.group();
            starGroup2 = game.add.group(); //secondary star group gives pseudo-3d effect
            textGroup = game.add.group();
            textGroup.fixedToCamera = true; // do this or the text goes flying off the screen when the camera moves

            //make the stars
            for (var i = 0; i < MENU_STARS; i++) {
                //use negative position because rotation brings them around eventually
                var x = randomBetween(-STAR_FIELD_WIDTH, STAR_FIELD_WIDTH);
                var y = randomBetween(-STAR_FIELD_WIDTH, STAR_FIELD_WIDTH); //use width because it is wider than it it tall
                makeStar(x, y, (Math.random() > SECONDARY_STARS_RATIO) ? starGroup : starGroup2);
            }

            //text items
            game.add.text(400, 400, gameTitleText, { fill: '#FFFFFF', font: '180px Tahoma' }, textGroup);
            game.add.text(400, 600, gameStartText, { fill: '#FFFFFF' }, textGroup);
        }
    }

    /**
     * Draw function to update the state of the game
     */
    function update() {

        if (enteringGameState && state.camera.x >= STATE_CHANGE_X_POS && currentRotationSpeed >= MAX_ROTATION_SPEED) {
            //ready to do state change

            //change state
            //TODO somehow do a fade transition here?
            game.changeState(NEXT_STATE);

            //reset camera and world stuff
            state.world.setBounds(0, 0, game.width, game.height);
            state.camera.x = 0;
            state.camera.y = 0;
        }
        else if (enteringGameState) {
            progressFast();
        }
        else {
            progressNormal();
        }

    }

    /**
     * Normal progression for the camera and world rotation for slower background movement
     */
    function progressNormal() {
        //normal movement
        state.camera.x += easeOut(NORMAL_MOVE_SPEED, state.camera.x, STAR_FIELD_WIDTH);
        starGroup.angle -= NORMAL_ROTATION_SPEED;
        starGroup2.angle -= (NORMAL_ROTATION_SPEED * SECONDARY_STARS_ROTATION_SLOW_RATIO);
    }

    /**
     * The 'Launch' effect for the background stars.  Accelerates the movement and world rotation.
     */
    function progressFast() {
        //accel move speed
        currentMoveSpeed = Math.min(currentMoveSpeed + MAX_MOVE_ACCELERATION, MAX_MOVE_SPEED);

        //accel rotation speed
        currentRotationSpeed = Math.min(currentRotationSpeed + easeIn(MAX_ROTATION_ACCELERATION, state.camera.x, STAR_FIELD_WIDTH), MAX_ROTATION_SPEED);

        //ease out based on reaching edge of star field
        state.camera.x += easeOut(currentMoveSpeed, state.camera.x, STAR_FIELD_WIDTH);
        starGroup.angle += currentRotationSpeed;
        starGroup2.angle += (currentRotationSpeed * SECONDARY_STARS_ROTATION_FAST_RATIO);
    }

//    /**
//     * Reverse of the progressFast function, not really used (was for debugging)
//     */
//    function progressBackFast() {
//        //decel move speed
//        currentMoveSpeed = Math.max(currentMoveSpeed - MAX_MOVE_ACCELERATION, -MAX_MOVE_SPEED);
//
//        //decel rotation speed
//        currentRotationSpeed = Math.min(currentRotationSpeed - easeIn(MAX_ROTATION_ACCELERATION, state.camera.x, STAR_FIELD_WIDTH), NORMAL_ROTATION_SPEED);
//
//        //ease out based on reaching 0th x position with camera
//        state.camera.x += easeOut(currentMoveSpeed, STAR_FIELD_WIDTH - state.camera.x, STAR_FIELD_WIDTH);
//        starGroup.angle += currentRotationSpeed;
//        starGroup2.angle += (currentRotationSpeed * SECONDARY_STARS_ROTATION_FAST_RATIO);
//    }

    /**
     * Generic handler for input events
     * @param event
     */
    function handleInput(event) {
        switch (event.keyCode) {

            default:

                //triggers flag to start camera movement in update -> leads to state change
                enteringGameState = true;

                if (HIDE_TEXT_ON_LAUNCH) {
                    textGroup.alpha = 0;
                }

                break;

        }
    }

    /**
     * Makes a star sprite at the given location
     * @param {number} x
     * @param {number} y
     * @param {Phaser.Group} [group]
     * @returns {Phaser.Sprite}
     */
    function makeStar(x, y, group) {
        var star = game.add.sprite(x, y, 'animated_star', null, group);

        //pick random shineSet
        var r = Math.floor(Math.random() * shineSets.length);
        var shuffledSet = shineSets[r];

        //random chance to shift the set to change the starting frame
        if (Math.random() < ANIMATION_SHIFT_CHANCE) {
            shuffledSet.push(shuffledSet.shift());
        }

        //create and play the animation
        star.animations.add('shine', shuffledSet, true, false);
        star.animations.play('shine', STAR_FPS, true);
        return star;
    }

    /**
     * Gets a random int between the start and end value
     * @param {int} start
     * @param {int} end
     * @returns {int}
     */
    function randomBetween(start, end) {
        return Math.floor(Math.random() * (end - start)) + start;
    }

    /**
     * Returns an eased-in value based on the progression information provided
     * @param {number} maxStep
     *      normal maximum step value
     * @param {number} current
     *      current value
     * @param {number} max
     *      maximum value to ease to
     * @returns {number}
     */
    function easeIn(maxStep, current, max) {
        return (maxStep) * (current / max);
    }

    /**
     * Returns an eased-out value based on the progression information provided
     * @param {number} maxStep
     *      normal maximum step value
     * @param {number} current
     *      current value
     * @param {number} max
     *      maximum value to ease to
     * @returns {number}
     */
    function easeOut(maxStep, current, max) {
        return (maxStep) * (1 - current / max);
    }

    return state;
}