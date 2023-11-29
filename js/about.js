//Initial References
let slideLink = document.querySelectorAll("img .slider-item");
const CaroS = document.querySelector(".Carousel-slider");
//  slider
const CaroSlider = new MicroSlider(CaroS, {
  transitionDuration: 0.1,
  activeItemClass: "show",
});
