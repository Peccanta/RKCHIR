//Подтверждение перехода по ссылке
function confirmRedirect(e) {
    let link = e.target;
    //Ищем ближайший родительский элемент, подходящий под указанный CSS селектор
    if (e.target.tagName !== "A")
        link = e.target.closest("A");

    //Заменяем обычный переход браузером по ссылке на необходимый запрос пользователю
    if (link.tagName && !confirm(`Перейти на страницу ${link.host}?`))
        e.preventDefault();
}

//Галерея изображений
function changeMainImage(e) {
    if (e.target.tagName === "IMG") {
        let mainImg = document.getElementById("main_image").getElementsByTagName("img")[0];
        //Копируем картинку, на которую нажал пользователь
        let showImage = e.target.cloneNode(true);
        //Получаем данные о размере и расположении HTML-элемента
        let mainImgDiv = document.getElementById("main_image").getBoundingClientRect();

        //Расположение картинки
        let centerX = mainImgDiv.left;
        let centerY = mainImgDiv.top;

        //Задаём необходимые свойства
        showImage.id = "clonedImage";
        showImage.style.top = "280px";
        showImage.style.left = e.clientX - 625 + "px";
        showImage.style.zIndex = "1";
        showImage.classList.add("prepare_image");
        showImage.classList.add("show_image");

        //Выводим картинку на экран
        document.getElementsByClassName("gallery")[0].appendChild(showImage);
        let imgX = showImage.getBoundingClientRect().left - 400;

        //Плавный вывод картинки на экран, плавно изменяя её координаты
        let moveImage = setInterval(function() {
            if (showImage.style.top !== "20px") {
                showImage.style.top = parseInt(showImage.style.top) - 2 + "px";
            }
            if (imgX > (centerX + 1)) {
                showImage.style.left = parseInt(showImage.style.left) - 2 + "px";
                imgX -= 2;
            } else if (imgX < (centerX - 1)) {
                showImage.style.left = parseInt(showImage.style.left) + 2 + "px";
                imgX += 2;
            }
        }, 10);

        //Добавляем интервал
        setTimeout(function() {
            showImage.remove();
            clearInterval(moveImage);
            mainImg.src = e.target.src;
        }, 2200)
    }
}

//Список с выделением как у файлового менеджера
function selectElements(e) {
    //Получаем элементы
    let element = e.target;
    let listElements = document.getElementById("list").getElementsByTagName("li");

    //Если элемент принадлежит тэгу li - выполняем
    if (element.tagName === "LI") {
        //Если нажата клавиша ctrl
        if (e.ctrlKey) {
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            //Если клавиша ctrl не нажата
            else
                element.classList.add("selected");
            //Если при множественном выделении нажимаем без ctrl
        } else {
            for (let i = 0; i < listElements.length; i++) {
                listElements[i].classList.remove("selected");
            }
            //То снимается выделение со всех предыдущих, и добавляется к текущему
            element.classList.add("selected");
        }
    }
}

//Создание слайдера
let doSlide = false,
    moveDist;
let slider, slideCont, item, clonedItem, totalCost, kart;

onmousedown = function(e) {
    //Если зажали кнопку на слайдере
    if (e.target.id === "slide") {
        doSlide = true;
        slideCont = document.getElementById("slideContainer");
        slider = e.target;
    }
    //Ищем ближайший родительский элемент, подходящий под указанный CSS селектор
    item = e.target.closest(".item");

    //Если зажали кнопку на товаре
    if (item && !item.classList.contains("clone")) {
        placed = false;
        totalCost = document.getElementById("totalCost");
        kart = document.getElementById("kart");

        //Копируем выбранный товар
        clonedItem = item.cloneNode(true);

        //Заменяем стандартное действие при перетаскивании целевого объекта
        clonedItem.ondragstart = function(e) { //срабатывает, когда пользователь начинает перетаскивать элемент
            e.preventDefault();
        }

        //Добавляем перетаскиваемый товар к позиции курсора
        clonedItem.classList.add("clone");
        clonedItem.style.position = "absolute";
        document.body.append(clonedItem);
        moveAt(event.clientX, event.clientY);
    }
}

//Функция для определеня координат перетаскиваемого товара
function moveAt(pageX, pageY) {
    clonedItem.style.left = pageX - clonedItem.offsetWidth / 2 + 'px';
    clonedItem.style.top = pageY - clonedItem.offsetHeight / 2 + 'px';
}

onmousemove = function(e) {
    //Двигаем зажатой мышью на слайдере
    if (doSlide) {
        moveDist = e.clientX - slideCont.getBoundingClientRect().left; //задаём границы
        //Двигаем слайдер относительно передвижения мыши
        if (moveDist > 3 && moveDist <= slideCont.offsetWidth - 20) {
            slider.style.left = moveDist + "px";
            //Выводим значение слайдера, округляя до ближайшего целого числа
            slider.innerHTML = Math.ceil(moveDist / ((slideCont.offsetWidth - 20) / 50));
        }
    }

    //Обновляем координаты перетаскиваемого товара, относительно позиции курсора
    if (clonedItem && !placed) {
        moveAt(e.pageX, e.pageY);
    }
}

onmouseup = function(e) {
    //Если отжали кнопку со слайдера
    doSlide = false;

    //Если товар ещё не не перенесён в "корзину" и курсор находится не в её области
    if (clonedItem && !placed) {
        //Если курсор находится в области "корзины"
        if (placeable) {
            //Товар перестаёт следовать за курсором
            clonedItem.getElementsByTagName("img")[0].remove();
            clonedItem.classList.remove("item");
            //Добавляем к итоговой стоимости товаров в "корзине" стоимость добавленного туда товара
            totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(clonedItem.getElementsByClassName("cost")[0].innerHTML);
            clonedItem.style.position = "static";
            //Добавляем сам товар в "корзину"
            kart.append(clonedItem);
            placed = true;

            //Если не перетащили товар в "корзину"
        } else
            clonedItem.remove();
    }
}

//"Обнуляем" переменные для Drag-and-drop'а товара
let placeable = false,
    placed = false;

//Добавляем анимацию на сайт в виде "бегающей полоски загрузки"
function animate({ timing, draw, duration }) {
    //Определяем текущее время в милисекундах
    let start = performance.now();
    //Функция отрисовки "полоски загрузки"
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration; // timeFraction имеет значения от 0 до 1
        if (timeFraction > 1) timeFraction = 1;

        // Вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); //Отрисовываем

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

//Функция для отрисовки "бегающей полоски загрузки"
function showAnim(elem) {
    animate({
        duration: 1000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            elem.style.width = progress * 600 + 'px';
        }
    });
}