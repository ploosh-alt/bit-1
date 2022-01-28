// Bit 1

let high = 0, low = 1000, current = 0; // Variables to save our temps
let fahrenheit = true; // Do we show fahrenheit or celsius
let op = "choose"; // This changes based on what its doing
let opt = 1; // 1 is current, 2 is low, 3 is high


function clearScreen() {
    led.stopAnimation();
    basic.clearScreen();
}

function display(value : any) {
    basic.showString(`${value}`);
}

function opEq(value : string, func : Function) {
    if (op === value)
        return func();
}

function optEq(value: number, func: Function) {
    if (opt === value)
        return func();
}

function Temps() {
    current = input.temperature(); // Pull temperature from bit
    if (fahrenheit) { // if we are in fahrenheit, 
        current = (current * 9/5) + 32; // do the calculations to convert to fahrenheit
    }
    if (current > high) { // if the current temp is higher than the last high, 
        high = current; // update with the new temp
    }
    if (current < low) { // if the current temp is lower than the last low,
        low = current; // update with the new temp
    }
}

function buttonHandler() {
    Temps();
    opEq("choose", () => {
        optEq(4, () => {
            opt = 1;
        });
        optEq(1, () => {
            display('CURRENT');
        });
        optEq(2, () => {
            display('LOW');
        });
        optEq(3, () => {
            display('HIGH');
        });
    });
    opEq("show", () => {
        optEq(1, () => {
            display(current);
        });
        optEq(2, () => {
            display(low);
        });
        optEq(3, () => {
            display(high);
        });
    });
}

function showingBtnHandler() {
    opEq("show", () => {
        opt = 1;
        clearScreen();
        op = "choose";
    });
}

function buttonAhandler() {
    opEq("choose", () => {
        clearScreen();
        opt += 1;
    })
    opEq("show", showingBtnHandler);
}

function buttonBhandler() {
    clearScreen();
    op = "show";
}

input.onButtonPressed(Button.A, buttonAhandler);
input.onButtonPressed(Button.B, buttonBhandler);
input.onButtonPressed(Button.AB, showingBtnHandler);

let main = buttonHandler;

basic.forever(main);