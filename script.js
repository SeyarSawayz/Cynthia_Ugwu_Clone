const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })

    .to(".boundingElem", {
      y: "0",
      duration: 1,
      // delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1,
      // delay: -1,
      ease: Expo.easeInOut,
    });
}

function mouseChapta() {
  var xScale = 1;
  var yScale = 1;
  let timer;

  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove", function (det) {
    clearTimeout(timer);
    xScale = gsap.utils.clamp(0.8, 1.2, det.clientX - xPrev);
    yScale = gsap.utils.clamp(0.8, 1.2, det.clientY - yPrev);

    xPrev = det.clientX;
    yPrev = det.clientY;

    mouseFollower(xScale, yScale);

    timer = setTimeout(function () {
      document.querySelector(
        "#miniCircle"
      ).style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(1,1)`;
    }, 100);
  });
}

const mouseFollower = (xScale, yScale) => {
  window.addEventListener("mousemove", function (det) {
    this.document.querySelector(
      "#miniCircle"
    ).style.transform = `translate(${det.clientX}px, ${det.clientY}px) scale(${xScale},${yScale})`;
  });
};

mouseFollower();
firstPageAnim();
mouseChapta();

document.querySelectorAll(".ele").forEach(function (ele) {
  var rotate = 0;
  var diffrot = 0;

  ele.addEventListener("mouseleave", function (dets) {
    gsap.to(ele.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  ele.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - ele.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(ele.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diffrot,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});
