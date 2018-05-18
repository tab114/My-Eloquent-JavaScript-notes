var number1 = Number(prompt("give a number", ""));
if (!isNaN(number1)) {
    if (number1 < 100) {
        alert("your number is a small number");
    } else if (number1 >= 100 && number1 < 1000) {
        alert("your number is medium size number");
    } else alert("your number is big");
}
else alert("Hey, we asked for a number!");