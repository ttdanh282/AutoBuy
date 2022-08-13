if(!document.querySelector(".MuiButton-containedPrimary").disabled){
    document.querySelector(".MuiButton-containedPrimary").click();
    setTimeout(()=>{
        document.querySelectorAll(".MuiButton-textPrimary")[0].click();
    }, 1000)
}
else {
    alert("Button disabled, can't buy")
}
