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

var slides = document.querySelectorAll("#slide_box > img");
var texts = document.querySelectorAll("#title > .text");

var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var current = 0;
prevBtn.onclick = prevButton; // 괄호?
nextBtn.onclick = nextButton;


function showSlide(n){
    for(var i = 0 ; i < slides.length ; i++){
        slides[i].style.display = "none"; // i를 넣는 이유?
    }
    slides[n].style.display = "block";
}

function showText(n){
    for(var i = 0 ; i < texts.length ; i++){
        texts[i].style.display = "none";
    }
    texts[n].style.display = "block";
}

function prevButton(){
    if(current>0){
        current -= 1;
    }else{
        current = slides.length -1;
    }
    showSlide(current);
    showText(current);
}

function nextButton(){
    if(current<slides.length -1){
        current += 1;
    }else{
        current = 0;
    }
    showSlide(current);
    showText(current);
}

var slideInteval = setInterval(nextButton, 3000); // 위치?