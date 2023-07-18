// AOS 셋팅
AOS.init();

// 상단 스크롤 기능


const header = document.querySelector("header");
const mbt = document.querySelector(".mbt");
let scy = 0;
// 1. 스크롤바의 픽셀 위치값을 파악해서
scy = window.document.documentElement.scrollTop;
// 2. class를 적용.
if(scy > 0){
    header.classList.add("active"); // 클래스를 추가함.
    mbt.classList.add("active");
}
window.addEventListener("scroll", function(){
    scy = this.document.documentElement.scrollTop;
    if(scy > 0){
        header.classList.add("active"); // 클래스를 추가함.
        mbt.classList.add("active"); // 스크롤이 됐을 때, 흰색으로 보임.
    }else{ // 스크롤이 되지 않는 상태.
        const state = navMb.classList.contains("active");
        if(state){ // 스크롤이 되지 않은 상태면서 모바일 메뉴가 펼쳐져 있을 때
            header.classList.add("active");
            mbt.classList.add("active");
        }else{ // 모바일메뉴가 펼쳐져 있지 않다면 원래대로.
            header.classList.remove("active");
            mbt.classList.remove("active");
        }
    }
});

// 모바일 메뉴 클릭 처리

const htmlRoot = document.querySelector("html");
const navMb = document.querySelector(".nav-mb");
mbt.addEventListener("click", function(){
    // 현재 ani클래스가 있는지 없는지 파악.
    const state = this.classList.contains("ani");  
    if (state){
        this.classList.remove("ani");
        // 윈도우에 스크롤바가 나타난다.
        htmlRoot.classList.remove("active");
        // 모바일 메뉴 숨기기
        navMb.classList.remove("active");
        if(scy > 0){ // 스크롤이 되었다면
            header.classList.add("active");
            mbt.classList.add("active");
        }else{ // 스크롤이 되지 않았다면
            header.classList.remove("active");
            mbt.classList.remove("active");
        }
    }else{
        this.classList.add("ani");
        htmlRoot.classList.add("active");
        navMb.classList.add("active");
        header.classList.add("active");
        mbt.classList.add("active");
    }
});

// 반응형 처리
let winW = window.innerWidth;
window.addEventListener("resize", function(){
    winW = window.innerWidth;
    if(winW > 1024){
        mbt.classList.remove("ani");
        htmlRoot.classList.remove("active"); // 없으니 모바일 메뉴가 나타난채로 창을 키웠을 때 스크롤 사라짐
        navMb.classList.remove("active");
        if(scy > 0){
            header.classList.add("active");
            mbt.classList.add("active");
        }else{
            header.classList.remove("active");
            mbt.classList.remove("active");
        }
    }
});


// 비주얼 슬라이드

// 1.슬라이드 (.swiper-slide)개수 만큼 li생성하기
const swSlideCount = document.querySelectorAll(".sw-visual .swiper-slide").length;

// 2.li태그 출력 장소(ul태그 )저장
const swSlidePgUl = document.querySelector(".sw-visual-pg-list");

//3.li에 html로 작성할 글자를 생성한다.
let swVisualHtml = ``;
for (let i = 0; i < swSlideCount; i++) {
    swVisualHtml = swVisualHtml + `<li>${i + 1}</li>`;
}

// 4.html을 추가한다
swSlidePgUl.innerHTML = swVisualHtml;

// 5.페이지네이션 관련(코딩으로 생성한 li태그 저장)
const swVisualPgLi = document.querySelectorAll(".sw-visual-pg-list > li");
console.log(swVisualPgLi);


// 비주얼 스와이퍼
var swiper = new Swiper(".sw-visual", {
    effect: "fade",
    // fadeEffect: {
    //   crossFade: true,
    // },
    loop: true,
    // 슬라이드의 모션 속도를 transition 맞춘다.
    speed: 1000,
    autoplay: {
        delay: 3000,
        // 사용자가 마우스 클릭 드래그로 이동하면
        // 아래 구문이 없으면 autoplya 가 해제되므로
        // 이것을 방지해 주기위한 처리
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".sw-visual-next",
        prevEl: ".sw-visual-prev",
    },
});


// swiper 가 최초 실행 될 때
// 1번 li 의 흰색 라인이 늘어나는 모션을 실행
swVisualPgLi[0].classList.add("active");
// swiper가 바뀔때 마다 실행
// 슬라이더가 바뀌는 상태를 찾아서
// 우리가 적용하고자 하는 처리를 하고
// swiper의 API를 참조해서 작성

swiper.on("slideChange", function () {
    swVisualPgLi.forEach(function (item, index) {
        if (swiper.realIndex === index) { // realIndex는 진짜 html태그의 순서값
            item.classList.add("active");
        }else {
            item.classList.remove("active");
        }
    });
});

// li 태그를 클릭했을 때
swVisualPgLi.forEach(function(item,index){
    item.addEventListener("click", function(){
        swiper.slideToLoop(index, 500, false);
    });
});


// 비즈니스 스와이퍼
const swBusiness = new Swiper(".sw-business", {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});


// 비즈니스 modal
const businessModal = document.querySelector(".business-modal");
businessModal.addEventListener("click", function(){  // 모달을 클릭했을 때.
    businessModal.style.display = "none";
})