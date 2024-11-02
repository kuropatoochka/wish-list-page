'use strict'

const isMobile = {
    Android: function (){
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function (){
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function (){
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function (){
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function (){
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function (){
        return(
            isMobile.Android()||
            isMobile.BlackBerry()||
            isMobile.iOS()||
            isMobile.Opera()||
            isMobile.Windows()
        );
    }
}

if (isMobile.any()){
    document.body.classList.add('_touch')
    let menuArrows = document.querySelectorAll('.menu__arrow')
    if (menuArrows.length > 0){
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i]
            menuArrow.addEventListener("click", function (e){
                menuArrow.parentElement.classList.toggle('_active')
            })
        }
    }
} else {
    document.body.classList.add('_pc')
}

// меню бургер
const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
    iconMenu.addEventListener('click', function (){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}

// прокрутка при клике
const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0){
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    })
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            if(iconMenu.classList.contains('_active')){
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            })
            e.preventDefault();
        }
    }
}

// модальное окно
const cards = document.querySelectorAll('.card');
const modals = document.querySelectorAll('.modal');

// Открытие модального окна при нажатии на карточку
cards.forEach(card => {
    card.addEventListener('click', function () {
        const modalID = card.getAttribute(`data-modal`)
        const modal = document.querySelector(`.modal[data-modal="${modalID}"]`)
        modal.classList.add('_open');
    });
})

// Закрытие модального окна при нажатии на крестик и при нажатии за пределами modal__card
modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
        const modalCard = modal.querySelector('.modal__card');
        const modalIcon = modal.querySelector('.modal__card_icon');
        if (e.target === modalIcon) {
            modal.classList.remove('_open');
        }
        if (!modalCard.contains(e.target)) {
            modal.classList.remove('_open');
        }
    });
})

// обратный отсчет до др
function update() {
    const clock = document.querySelector('.footer__clock');
    const HBDate = new Date("2024-12-02T00:00:00");
    const now = new Date();
    const diff = HBDate - now;

    // Преобразование миллисекунд в дни, часы, минуты и секунды
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Форматирование значений
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    // Обновление текста
    clock.textContent = `${days} days ${formattedHours} hours ${formattedMinutes} minutes`;
}
setInterval(update, 60000);
update();

// котики по API
const button = document.querySelector(`.default-button[data-footer-button="get-img-button"]`)
const footerImg = document.querySelector('.footer__img')
const url = 'https://api.thecatapi.com/v1/images/search'

async function fetchImg() {
    try {
        const response = await fetch(url)
        const data = await response.json()
        footerImg.src = data[0].url
    } catch (error) {
        console.log(error)
    }
}

button.addEventListener('click', function (e) {
    e.preventDefault()
    fetchImg()
});

const getCat = document.querySelector('.footer__cat')
const buttonsGetCat = document.querySelectorAll('.button-get-cat')

buttonsGetCat.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        getCat.classList.add('_active');
        fetchImg();
    });
});