let result = prompt('Желаете пройти регистрацию на сайте?');

if (result == 'Да') {
    alert("Круто!");
    let login = prompt('Введите свой логин в поле ниже');

    if (login == 'Админ') {
        let pass = prompt('Введите пароль!');

        if (pass == "Я главный") {
            alert("Здравствуйте!");
        } else if (pass == '' || pass == null) {
            alert("Отменено!");
        } else {
            alert("Неверный пароль!");
        }
    } else if (login == '' || login == null) {
        alert("Отменено!");
    } else {
        alert("Я вас не знаю!");
    }
} else {
    alert("Попробуй ещё раз!");
}