// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import JustValidate from 'just-validate';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// main css
import "/src/sass/style.scss";

// burger
const burger = document.querySelector(".burger"),
    close = document.querySelector(".header__menu-close"),
    menu = document.querySelector(".header__menu");

burger.addEventListener("click", () => {
    menu.classList.add("header__menu_active");
    // запрещаем скрол
    document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
    menu.classList.remove("header__menu_active");
    document.body.style.overflow = "";
});


// init Swiper:
try {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.icon-left-open',
            prevEl: '.icon-right-open',
        },
        breakpoints: {
            // when window width is >= 1200px
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
        },
        modules: [Navigation, Pagination],
    });
} catch (error) { }

// tabs
try {
    const tabs = document.querySelectorAll(".catalog__tab");
    const contents = document.querySelectorAll(".catalog__content-item");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // Удаляем активный класс у всех табов и контента
            tabs.forEach((t) => t.classList.remove("catalog__tab_active"));
            contents.forEach((c) => (c.style.display = "none"));

            // Добавляем активный класс к нажатому табу и показываем соответствующий контент
            tab.classList.add("catalog__tab_active");
            contents[index].style.display = "block";
        });
    });

    // Показываем первый контент при загрузке
    contents.forEach((c, i) => (c.style.display = i === 0 ? "block" : "none"));
} catch (e) { }
// Обратите внимание, что значение block (в двух местах) можно спокойно поменять на flex, если вам это необходимо


// валидатор форм (подключенный дополнительным пакетом)
try {
    const validatorTouch = new JustValidate(".touch__form");

    validatorTouch
        .addField("#name", [
            {
                rule: "required",
                errorMessage: "Please fill the name",
            },
            {
                rule: "minLength",
                value: 2,
                errorMessage: "Minimum 2 chars!",
            },
        ])
        .addField("#email", [
            {
                rule: "required",
            },
            {
                rule: "email",
            },
        ])
        .addField(
            "#question",
            [
                {
                    rule: "required",
                },
                {
                    rule: "minLength",
                    value: 5,
                },
            ],
            {
                errorsContainer: document
                    .querySelector("#question")
                    .parentElement.querySelector(".error-message"),
            }
        )
        .addField(
            "#checkbox",
            [
                {
                    rule: "required",
                },
            ],
            {
                errorsContainer: document
                    .querySelector("#checkbox")
                    .parentElement.parentElement.querySelector(".checkbox-error-message"),
            }
        )
        // заготовка на отправку формы
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            // fetch("https://httpbin.org/post", {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Success', data);
                    form.reset();
                });
        });
} catch (e) { }

try {
    const validatorFooter = new JustValidate(".footer__form");

    validatorFooter
        .addField(
            "#footer__email",
            [
                {
                    rule: "required",
                },
                {
                    rule: "email",
                },
            ],
            {
                errorsContainer: document
                    .querySelector("#footer__email")
                    .parentElement.querySelector(".email-error-message"),
            }
        )
        .addField(
            "#footer__checkbox",
            [
                {
                    rule: "required",
                },
            ],
            {
                errorsContainer: document
                    .querySelector("#footer__checkbox")
                    .parentElement.parentElement.querySelector(".check-error-message"),
            }
        )
        .onSuccess((event) => {
            const form = event.currentTarget;
            const formData = new FormData(form);

            // fetch("https://httpbin.org/post", {
            fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: formData,
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Success', data);
                    form.reset();
                });
        });
} catch (e) { }