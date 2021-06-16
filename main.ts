input.onButtonPressed(Button.A, function () {
    maqueen.motorStop(maqueen.Motors.All)
})
let distance = (OrientBit.getwheelPulseCount(OrientBit.wheelSide.right) + OrientBit.getwheelPulseCount(OrientBit.wheelSide.left)) / 2 / (input.runningTime() / 1000)
OrientBit.enableEncoder(
DigitalPin.P0,
DigitalPin.P1,
16,
14
)
OLED12864_I2C.init(60)
basic.forever(function () {
    OLED12864_I2C.showString(
    0,
    0,
    "L:      ",
    1
    )
    OLED12864_I2C.showNumber(
    4,
    0,
    OrientBit.getwheelPulseCount(OrientBit.wheelSide.left),
    1
    )
    OLED12864_I2C.showString(
    0,
    1,
    "R:      ",
    1
    )
    OLED12864_I2C.showNumber(
    4,
    1,
    OrientBit.getwheelPulseCount(OrientBit.wheelSide.right),
    1
    )
    OLED12864_I2C.showString(
    0,
    2,
    "Time :" + input.runningTime() / 1000,
    1
    )
    OLED12864_I2C.showString(
    0,
    3,
    "Dis :" + distance,
    1
    )
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 20)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 10)
        basic.pause(100)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 30)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 10)
        basic.pause(100)
    } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 20)
        basic.pause(200)
    }
})
