
const slider = document.querySelector('.slider');

const images = ["spb.jpg", "london.jpg", "ny.jpg"];

slider.innerHTML = images.map(img =>
    `<div class="slide"><img src="/Static/image/${img}" alt="Slide"></div>`
).join('');

const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const sliderContainer = document.querySelector('.slider-container');
const dotsContainer = document.querySelector('.dots');


let index = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

// 🔴 Создаем индикаторы
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active'); // Первый индикатор активен
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSliderPosition() {
    slider.style.transition = "transform 0.3s ease-out";
    slider.style.transform = `translateX(${-index * 100}%)`;
    updateDots();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function goToSlide(i) {
    index = i;
    updateSliderPosition();
}

function nextSlide() {
    if (index < slides.length - 1) {
        index++;
    } else {
        slider.style.transition = "transform 0.2s ease-in-out";
        slider.style.transform = `translateX(${-index * 100 - 5}%)`;
        setTimeout(() => updateSliderPosition(), 200);
        return;
    }
    updateSliderPosition();
}

function prevSlide() {
    if (index > 0) {
        index--;
    } else {
        slider.style.transition = "transform 0.2s ease-in-out";
        slider.style.transform = `translateX(${5}%)`;
        setTimeout(() => updateSliderPosition(), 200);
        return;
    }
    updateSliderPosition();
}

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

function touchStart(event) {
    isDragging = true;
    startX = event.pageX || event.touches[0].clientX;
    prevTranslate = -index * 100;
    animationID = requestAnimationFrame(animation);
    sliderContainer.style.cursor = "grabbing";
    event.preventDefault();
}

function touchMove(event) {
    if (!isDragging) return;
    const currentX = event.pageX || event.touches[0].clientX;
    const diff = currentX - startX;
    currentTranslate = prevTranslate + (diff / sliderContainer.clientWidth) * 100;
    slider.style.transition = "none";
    slider.style.transform = `translateX(${currentTranslate}%)`;
}

function touchEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    sliderContainer.style.cursor = "grab";

    const moveBy = currentTranslate - prevTranslate;
    if (moveBy < -20 && index < slides.length - 1) {
        index++;
    } else if (moveBy > 20 && index > 0) {
        index--;
    }
    updateSliderPosition();
}

function animation() {
    if (isDragging) requestAnimationFrame(animation);
}

slider.addEventListener('mousedown', touchStart);
slider.addEventListener('mousemove', touchMove);
slider.addEventListener('mouseup', touchEnd);
slider.addEventListener('mouseleave', touchEnd);
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchmove', touchMove);
slider.addEventListener('touchend', touchEnd);