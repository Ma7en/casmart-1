/**
===========================================================
===========================================================
- footer
**/
document.addEventListener("load", function (e) {
    let dataYearEle = document.querySelector(".data-year"),
        dataYear = new Date();
    dataYearEle.innerHTML = dataYear.getFullYear();
});
