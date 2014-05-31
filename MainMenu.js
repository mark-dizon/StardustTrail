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

    var STAR_FIELD_HEIGHT = game.height * 3;
    var STAR_FIELD_WIDTH = game.width * 3;
    var CAMERA_MAX_X_POS = STAR_FIELD_WIDTH - game.width;

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
    var MAX_ROTATION_DECELERATION = .02;
    var NORMAL_ROTATION_SPEED = .01;

    var currentMoveSpeed = NORMAL_MOVE_SPEED;
    var currentRotationSpeed = NORMAL_ROTATION_SPEED;

    var STATE_CHANGE_MS_DELAY = 1500;
    var STATE_CHANGE_X_POS = 1300;

    var TITLE_X_POS = 400;
    var TITLE_Y_POS = 400;
    var SUBTITLE_X_POS = 400;
    var SUBTITLE_Y_POS = 600;


    //flags
    var enteringLaunchState = false;
    var enteringSlowDownState = false;
    var stateChangeScheduled = false;

    //groups
    var starGroup;
    var starGroup2;
    var textGroup;

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

            state.camera.x = 0;
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
            game.add.text(TITLE_X_POS, TITLE_Y_POS, gameTitleText, { fill: '#FFFFFF', font: '180px Tahoma' }, textGroup);
            game.add.text(SUBTITLE_X_POS, SUBTITLE_Y_POS, gameStartText, { fill: '#FFFFFF' }, textGroup);
        }
    }

    /**
     * Draw function to update the state of the game
     */
    function update() {

        if (enteringSlowDownState && currentRotationSpeed == 0) {
            //ready to do state change
            if (!stateChangeScheduled) {
                //set it up to delay a little before change
                stateChangeScheduled = true;
                setTimeout(function () {
                    //change state
                    //TODO somehow do a fade transition here?
                    game.changeState(NEXT_STATE);
                }, STATE_CHANGE_MS_DELAY);
            }
        }
        else if (enteringSlowDownState) {
            progressSlowDown();
        }

        else if (enteringLaunchState && state.camera.x >= STATE_CHANGE_X_POS && currentRotationSpeed >= MAX_ROTATION_SPEED) {
            //at max rotation, so start deceleration
            enteringSlowDownState = true;
        }
        else if (enteringLaunchState) {
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
        state.camera.x += easeOut(NORMAL_MOVE_SPEED, state.camera.x, CAMERA_MAX_X_POS);
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
        currentRotationSpeed = Math.min(currentRotationSpeed + easeIn(MAX_ROTATION_ACCELERATION, state.camera.x, CAMERA_MAX_X_POS), MAX_ROTATION_SPEED);

        //ease out based on reaching edge of star field
        state.camera.x += easeOut(currentMoveSpeed, state.camera.x, CAMERA_MAX_X_POS);
        starGroup.angle += currentRotationSpeed;
        starGroup2.angle += (currentRotationSpeed * SECONDARY_STARS_ROTATION_FAST_RATIO);
    }

    /**
     * Slows down the rotation until 0
     */
    function progressSlowDown() {
        //decelerate rotation speed until stopped
        currentRotationSpeed = Math.max(currentRotationSpeed - MAX_ROTATION_DECELERATION, 0);

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
//        currentRotationSpeed = Math.min(currentRotationSpeed - easeIn(MAX_ROTATION_ACCELERATION, state.camera.x, CAMERA_MAX_X_POS), NORMAL_ROTATION_SPEED);
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
                enteringLaunchState = true;

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
        //TODO there is a bug somehow with ease out where the current never gets close to the max
        return (maxStep) * (1 - current / max);
    }

    return state;
}