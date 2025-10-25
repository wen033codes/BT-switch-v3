input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    if (Sound == 0) {
        Sound = 5
        basic.showNumber(Sound)
    } else {
        Sound = 0
        soundOff()
    }
    music.setVolume(Sound * 16)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
    basic.pause(200)
    basic.clearScreen()
})
function space () {
    basic.showLeds(`
        . . . . .
        # . . . #
        # # # # #
        . . . . .
        . . . . .
        `)
    basic.pause(100)
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    basic.pause(showtime)
    basic.clearScreen()
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    basic.pause(showtime)
    basic.clearScreen()
})
input.onButtonPressed(Button.A, function () {
    Click1()
})
function Mode () {
    if (Mouse == 0) {
        mouse.startMouseService()
        Mouse = 1
        music.play(music.tonePlayable(523, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
        basic.showString("M")
    } else {
        keyboard.startKeyboardService()
        Mouse = 0
        music.play(music.tonePlayable(659, music.beat(BeatFraction.Eighth)), music.PlaybackMode.InBackground)
        basic.showString("S")
    }
    basic.pause(200)
    basic.clearScreen()
}
function enter () {
    basic.showLeds(`
        . . # . #
        . # . . #
        # # # # #
        . # . . .
        . . # . .
        `)
    basic.pause(100)
}
function Click2 () {
    if (Mouse == 0) {
        keyboard.sendString(" ")
        space()
    } else {
        mouse.rightClick()
        basic.showString("R")
    }
    music.play(music.tonePlayable(392, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
    basic.clearScreen()
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Level()
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_HI, function () {
    if (Mouse != 0) {
        Hold = false
        basic.clearScreen()
    }
})
input.onPinPressed(TouchPin.P2, function () {
    Click2()
})
input.onButtonPressed(Button.AB, function () {
    Mode()
})
function Level () {
    if (Sound < 9) {
        Sound += 1
        basic.showNumber(Sound)
    } else {
        Sound = 0
        soundOff()
    }
    music.setVolume(Sound * 16)
    music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
    basic.pause(100)
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    Click2()
})
function Click1 () {
    if (Mouse == 0) {
        keyboard.sendString(keyboard.keys(keyboard._Key.enter))
        enter()
    } else {
        mouse.click()
    }
    music.play(music.tonePlayable(330, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.InBackground)
    basic.clearScreen()
}
function soundOff () {
    basic.showLeds(`
        # . # . .
        . # # # .
        . . # . #
        # # # # .
        # # # . #
        `)
}
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_PULSE_LO, function () {
    if (Mouse != 0) {
        Hold = true
        basic.showString("H")
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_IO_P1, EventBusValue.MICROBIT_PIN_EVT_FALL, function () {
    Click1()
})
let Hold = false
let Sound = 0
let showtime = 0
let Mouse = 0
Mouse = 0
showtime = 5000
pins.touchSetMode(TouchTarget.P1, TouchTargetMode.Resistive)
Sound = 5
music.setVolume(Sound * 16)
music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.InBackground)
for (let index = 0; index < 2; index++) {
    basic.showLeds(`
        . . # . .
        . . # . #
        . . # # .
        # # # . .
        # # # . .
        `)
    basic.showIcon(IconNames.EighthNote)
}
if (Mouse == 0) {
    keyboard.startKeyboardService()
    basic.showString("S")
} else {
    mouse.startMouseService()
    basic.showString("M")
}
basic.pause(200)
basic.clearScreen()
basic.forever(function () {
    if (Mouse != 0) {
        if (Hold) {
            mouse.send(
            0,
            0,
            true,
            false,
            false,
            0,
            true
            )
        } else {
            mouse.send(
            0,
            0,
            false,
            false,
            false,
            0,
            false
            )
        }
    }
})
