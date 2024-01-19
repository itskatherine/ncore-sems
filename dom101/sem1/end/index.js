const imgOfObi = document.getElementById("profile-image");

const pettingStatus = document.getElementById("pet-status");

imgOfObi.addEventListener("mouseenter", () => {
  pettingStatus.innerText = "You are petting Obi :D";
  pettingStatus.setAttribute("class", "good");
  
});
imgOfObi.addEventListener("mouseleave", () => {
  pettingStatus.innerText = "You are not petting Obi :(";
  pettingStatus.setAttribute("class", "bad");
});

const treats = [...document.getElementsByClassName("treat-item")];

treats.forEach((treat) => {
  treat.addEventListener("click", () => {
    treat.innerText = "You have fed Obi this treat";
  });
});


