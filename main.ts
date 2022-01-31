// Bit 1

let high = -1000, low = 1000, current = 0;
let fahrenheit = true;
let op = "choose";
let opt = 1;

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

function hotHandler() {

}

function Temps() {
    current = input.temperature();
    hotHandler();
    if (fahrenheit) { 
        current = (current * 9/5) + 32;
    }
    if (current > high) {
        high = current;
    }
    if (current < low) {
        low = current;
    }
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
    if (op === "show") return;
    clearScreen();
    op = "show";
}

input.onButtonPressed(Button.A, buttonAhandler);
input.onButtonPressed(Button.B, buttonBhandler);
input.onButtonPressed(Button.AB, showingBtnHandler);

function main() {
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

basic.forever(main);