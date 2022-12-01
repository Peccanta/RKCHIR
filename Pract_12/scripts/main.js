"use strict";

document.addEventListener('DOMContentLoaded', () => {

    // Ссылки на внешние ресурсы разного цвета
    const links = document.querySelectorAll('.link');
    const colorList = ['red', 'yellow', 'deeppink', 'purple', 'deepskyblue', 'orange'];

    links.forEach(link => {
        link.querySelector('a').style.color = colorList[Math.floor(Math.random() * colorList.length)];
    });

    // Создание пользовательского списка
    const listBlock = document.querySelector('.create-list');

    const list = document.createElement('ul');
    list.classList.add('user-list');
    list.style = `text-align: left;`;
    listBlock.append(list);

    while (true) {
        let item = prompt("Введите элемент, чтобы добавить его в список.", "");

        if (!item) break;

        let listItem = document.createElement('li');
        listItem.textContent = item;
        list.append(listItem);
    }

    // Появляющееся и исчезающее уведомление
    const notification = document.querySelector('.notif');
    const notifList = ['Уведомление 1', 'Уведомление 2', 'Уведомление 3', 'Уведомление 4', 'Уведомление 5', 'Уведомление 6', 'Уведомление 7'];

    function showNotification(text) {
        let notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = text;
        notif.style = `
        padding: 10px 20px;
        display: inline-block;
        border: 1px solid black;
        `;

        notification.append(notif);

        setTimeout(() => { notif.remove() }, 1500);
    }

    setInterval(() => { showNotification(notifList[Math.floor(Math.random() * notifList.length)]) }, 2500);



    // Область с картинкой
    const area = document.querySelector(".area");
    const steam = area.querySelector('img');

    // Центрируем
    steam.style.top = Math.round(area.clientHeight / 2 - steam.offsetHeight / 2) + "px";
    steam.style.left = Math.round(area.clientWidth / 2 - steam.offsetWidth / 2) + "px";

    // Отображаем координаты
    const clickX = document.querySelector('.clickX').querySelector('span');
    const clickY = document.querySelector('.clickY').querySelector('span');

    area.onclick = function(click) {
        clickX.textContent = click.clientX;
        clickY.textContent = click.clientY;
    }



    // Возможность закрыть уведомления
    const notif = document.querySelector('.notifs');
    const notifBtn = notif.querySelector('.notif__btn');
    const notifInner = notif.querySelector('.notif__inner');
    const notifCounter = notif.querySelector('.notif__counter');
    const notifArr = [
        'Закрывающееся уведомление 1',
        'Закрывающееся уведомление 2',
        'Закрывающееся уведомление 3',
        'Закрывающееся уведомление 4',
        'Закрывающееся уведомление 5',
        'Закрывающееся уведомление 6',
        'Закрывающееся уведомление 7',
    ];

    let numberNotif = 0;
    let counter = 0;

    //Создаем уведомление
    function createNotif() {
        let element = document.createElement('div');
        element.classList.add('notif__item');

        // Добавляем поочерёдно уведомления из массива, пока не дойдём до конца
        if (numberNotif < notifArr.length) {
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
            // Если дошли до конца массива, начинаем выводить массив уведомлений сначала, но счётчик уведомлений сохраняем неизменным
        } else {
            numberNotif = 0;
            element.textContent = notifArr[numberNotif];
            numberNotif++;
            counter++;
        }

        element.style = `
        position: relative;
        width: 10%;
        padding: 10px 20px;
        display: inline-block;
        border: 1px solid white;
        margin-bottom: 5px;
        `;

        notifInner.append(element);

        // Добавляем кнопку для закрытия уведомления
        let closeTab = document.createElement('i');
        closeTab.className = 'fa-solid fa-xmark';

        closeTab.style = `
        position: absolute;
        right: 10px;
        top: 3px;
        cursor: pointer;
        `;

        element.append(closeTab);

        notifCounter.textContent = counter;

    }

    // Добавляем событие при нажатии кнопки закрытия уведомления
    notifInner.onclick = function(event) {
        if (!event.target.classList.contains('fa-xmark')) return;

        let notif = event.target.closest('.notif__item');
        notif.remove();

        // Уменьшаем счётчик количества уведомлений
        counter--;
        notifCounter.textContent = counter;
    };

});