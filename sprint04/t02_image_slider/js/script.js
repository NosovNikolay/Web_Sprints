'use strict';

function showSlide(n) {
    ind = n >= slides.length ? 0 : (ind = n < 0 ? slides.length - 1 : ind);

    for (let i = 0; i < slides.length; ++i) {
        slides[i].style.display = 'none';
        dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[ind].style.display = 'block';
    dots[ind].className += ' active';
}

function autoShow() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
        dots[i].className = dots[i].className.replace(' active', '');
    }
    if (ind >= slides.length)
        ind = 0;
    slides[ind].style.display = "block";
    dots[ind].className += ' active';

    ind++;
    setTimeout(autoShow, 3000);
}

let listSlides = (n) => { showSlide(ind += n); }
let currentSlide = (n) => { showSlide(ind = n); }

let ind = 0;
let slides = document.getElementsByClassName('hide');
let dots = document.getElementsByClassName('dot');

autoShow();