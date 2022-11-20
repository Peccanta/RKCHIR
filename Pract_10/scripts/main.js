window.onload = function() {
    const randomSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let canvas = document.getElementById('captchaCanvas').getContext('2d');
    let captchaInput = document.getElementById("enterCaptcha");
    let checkSum = false,
        a = 0,
        b = 0;
    let captcha = {
        code: "",
        refresh() {
            this.code = "";
            for (let i = 0; i < 5; i++) {
                this.code += randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
            }
            return this.code;
        }
    }

    function refreshCanvas() {
        captchaInput.value = "";
        captcha.refresh();
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "white";
        canvas.fillRect(0, Math.random() * 20 + 10, canvas.measureText(captcha.code).width + 5, 2);
        canvas.fillText(captcha.code, 0, 30);
    }

    function refreshCanvasSumm() {
        captchaInput.value = "";
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "white";
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        canvas.fillRect(0, Math.random() * 20 + 10, canvas.measureText(captcha.code).width + 5, 2);
        canvas.fillText(a + " + " + b, 0, 30);
    }

    refreshCanvas();
    refresh.onclick = () => refreshCanvas();
    submitCaptcha.onclick = function() {
        if (captchaInput.value === "") {
            alert("Поле ввода пусто! Повторите попытку");
            return false;
        }
        if (checkSum) {
            checkSum = false;
            if (Number(captchaInput.value) === (a + b)) {
                alert("Успех! Каптча пройдена (Но не с 1-го раза и в режиме для чайников...)");
                refreshCanvas();
                return true;
            } else {
                alert("Неверная сумма! Попробуйте снова");
                refreshCanvas();
                return false;
            }
        }
        if (captchaInput.value === captcha.code) {
            alert("Успех! Каптча пройдена");
            refreshCanvas();
            return true;
        } else {
            refreshCanvasSumm();
            checkSum = true;
        }
    }

    //CART
    let accum = new Accumulator(0);
    let cartItems = document.querySelector('#shoppingCart span');
    let shoppingButtons = document.querySelectorAll('.shoppingElement button');

    function Accumulator(startingValue) {
        this.value = startingValue;

        this.read = () => {
            this.value += Number(prompt("Введите количество товара: ", "0"));
        }
    }

    function addToCart() {
        accum.read();
        if (accum.value > 0) cartItems.innerHTML = accum.value;
    }

    for (let i = 0; i < shoppingButtons.length; i++) {
        shoppingButtons[i].onclick = () => addToCart();
    }

    //STRINGS
    function truncate(str, maxlength) {
        if (str.length > maxlength) {
            str = str.substring(0, maxlength - 3);
            str += "...";
        }
        return str;
    }

    let cards = document.querySelectorAll('.cards div p');
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = truncate(cards[i].innerHTML, 16);
    }
}