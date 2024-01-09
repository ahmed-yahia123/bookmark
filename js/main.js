let bookmarkName = document.querySelector("#BmName");
let websiteUrl = document.querySelector("#BmUrl");
let showingData = document.querySelector("#showData");
let regEx = /^(https?:\/\/)?([\w-]+\.+[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
let dataArr = [];
if (localStorage.getItem("bookMarkList") != null) {
    dataArr = JSON.parse(localStorage.getItem("bookMarkList"));
    showData()
}
document.querySelector("#subBtn").addEventListener("click", () => {
    let dataObj = {
        bookName: bookmarkName.value,
        bookUrl: websiteUrl.value,
    }
    let bookMarkLength = bookmarkName.value.length;
    let urlValidation = websiteUrl.value;
    if (bookMarkLength >= 4 && regEx.test(urlValidation) == true) {
        dataArr.push(dataObj)
        showData()
        localStorage.setItem("bookMarkList", JSON.stringify(dataArr))
    } else if ((bookMarkLength < 4 && bookMarkLength >= 0) || (regEx.test(urlValidation) == false || urlValidation.length == 0)) {
        document.querySelector(".modal.fade").classList.add("d-block")
        document.querySelector(".modal.fade").classList.add("show")
    }
    document.querySelector(".btn-close").addEventListener("click", btnClose)
    document.addEventListener("click", (e) => {
        if (e.target.id == "closeLayer") {
            btnClose()
        }
    })
})
function btnClose() {
    document.querySelector(".modal.fade").classList.remove("d-block")
    document.querySelector(".modal.fade").classList.remove("show")
}
function showData() {
    let temp = "";
    for (let i = 0; i < dataArr.length; i++) {
        temp += `<tr>
                <td>${i + 1}</td>
                <td>${dataArr[i].bookName}</td>
                <td><button class="btn btn-info px-3 special-btn2" onclick="goToWebsite(${i})">
                    Visit</button></td>
                <td><button class="btn btn-dark px-3" onclick="del(${i})">
                Delete</button>
        </td>
    </tr>`
    }
    showingData.innerHTML = temp
}
function goToWebsite(i) {
    if (dataArr[i].bookUrl.startsWith("https://") || dataArr[i].bookUrl.startsWith("http://")) {
        window.open(dataArr[i].bookUrl)
    } else {
        window.open(`https://${dataArr[i].bookUrl}`)
    }
}
function del(i) {
    dataArr.splice(i, 1);
    localStorage.setItem("bookMarkList", JSON.stringify(dataArr))
    showData()
}

bookmarkName.addEventListener("keyup", () => {
    let valid = document.querySelector(".validate-1");
    let wrong = document.querySelector(".inValid-1");
    let bookMarkLength = bookmarkName.value.length;
    let classesBook = bookmarkName.classList;
    if (bookMarkLength < 4 && bookMarkLength > 0) {
        classesBook.remove("normal-style", "valid")
        classesBook.add("not-valid")
        wrong.classList.remove("d-none")
        valid.classList.add("d-none")
    } else if (bookMarkLength >= 4) {
        classesBook.remove("not-valid", "normal-style")
        classesBook.add("valid")
        wrong.classList.add("d-none")
        valid.classList.remove("d-none")
    } else if (bookMarkLength == 0) {
        classesBook.remove("valid", "not-valid")
        classesBook.add("normal-style")
        wrong.classList.add("d-none")
        valid.classList.add("d-none")
    }
})
websiteUrl.addEventListener("keyup", () => {
    let wrong = document.querySelector(".inValid-2")
    let valid = document.querySelector(".validate-2")
    let urlValidation = websiteUrl.value;
    if (regEx.test(urlValidation) == false && urlValidation.length > 0) {
        websiteUrl.classList.remove("normal-style", "valid")
        websiteUrl.classList.add("not-valid")
        wrong.classList.remove("d-none")
        valid.classList.add("d-none")
    } else if (regEx.test(urlValidation) == true) {
        websiteUrl.classList.remove("not-valid", "normal-style")
        websiteUrl.classList.add("valid")
        wrong.classList.add("d-none")
        valid.classList.remove("d-none")
    } else if (urlValidation.length == 0) {
        websiteUrl.classList.remove("not-valid", "valid")
        websiteUrl.classList.add("normal-style")
        wrong.classList.add("d-none")
        valid.classList.add("d-none")
    }
})