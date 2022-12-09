//Подтверждение перехода по ссылке
function confirmRedirect(e) {
    let link = e.target;
    if (e.target.tagName !== "a")
        link = e.target.closest("a");
    if (link.tagName && !confirm(`Перейти на страницу ${link.host}?`))
        e.preventDefault();
}

//Галерея изображений
function changeMainImage(e) {
    if (e.target.tagName === "IMG") {
        let mainImg = document.getElementById("main_image").getElementsByTagName("img")[0];
        let showImage = e.target.cloneNode(true);
        let mainImgDiv = document.getElementById("main_image").getBoundingClientRect();
        let centerX = mainImgDiv.left;
        let centerY = mainImgDiv.top;
        showImage.id = "clonedImage";
        showImage.style.top = "280px";
        showImage.style.left = e.clientX - 625 + "px";
        showImage.style.zIndex = "1";
        showImage.classList.add("prepare_image");
        showImage.classList.add("show_image");
        document.getElementsByClassName("gallery")[0].appendChild(showImage);
        let imgX = showImage.getBoundingClientRect().left - 400;
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

        setTimeout(function() {
            showImage.remove();
            clearInterval(moveImage);
            mainImg.src = e.target.src;
        }, 2200)
    }
}

//Список с выделением файлового менеджера
function selectElements(e) {
    let element = e.target;
    let listElements = document.getElementById("list").getElementsByTagName("li");
    if (element.tagName === "LI") {
        if (e.ctrlKey) {
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            else
                element.classList.add("selected");
        } else {
            for (let i = 0; i < listElements.length; i++) {
                listElements[i].classList.remove("selected");
            }
            element.classList.add("selected");
        }
    }
}

//Slider things
let doSlide = false,
    moveDist;
let slider, slideCont, item, clonedItem, totalCost, kart;
onmousedown = function(e) {
    if (e.target.id === "slide") {
        doSlide = true;
        slideCont = document.getElementById("slideContainer");
        slider = e.target;
    }
    item = e.target.closest(".item");
    if (item && !item.classList.contains("clone")) {
        placed = false;
        totalCost = document.getElementById("totalCost");
        kart = document.getElementById("kart");
        clonedItem = item.cloneNode(true);
        clonedItem.ondragstart = function(e) {
            e.preventDefault();
        }
        clonedItem.classList.add("clone");
        clonedItem.style.position = "absolute";
        document.body.append(clonedItem);
        moveAt(event.clientX, event.clientY);
    }
}

function moveAt(pageX, pageY) {
    clonedItem.style.left = pageX - clonedItem.offsetWidth / 2 + 'px';
    clonedItem.style.top = pageY - clonedItem.offsetHeight / 2 + 'px';
}

onmousemove = function(e) {
    if (doSlide) {
        moveDist = e.clientX - slideCont.getBoundingClientRect().left;
        if (moveDist > 3 && moveDist <= slideCont.offsetWidth - 20) {
            slider.style.left = moveDist + "px";
            slider.innerHTML = Math.ceil(moveDist / ((slideCont.offsetWidth - 20) / 10));
        }
    }
    if (clonedItem && !placed) {
        moveAt(e.pageX, e.pageY);
    }
}
onmouseup = function(e) {
    doSlide = false;
    if (clonedItem && !placed) {
        if (placeable) {
            clonedItem.getElementsByTagName("img")[0].remove();
            clonedItem.classList.remove("item");
            totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(clonedItem.getElementsByClassName("cost")[0].innerHTML);
            clonedItem.style.position = "static";
            kart.append(clonedItem);
            placed = true;
        } else
            clonedItem.remove();
    }
}
let placeable = false,
    placed = false;

function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function showAnim(elem) {
    animate({
        duration: 1000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            elem.style.width = progress * 100 + 'px';
        }
    });
}