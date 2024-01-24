const imgOfObi = document.getElementById("profile-image");
const pettingStatus = document.getElementById("pet-status");
const refillButton = document.getElementById("refill");

imgOfObi.addEventListener("mouseenter", () => {
  pettingStatus.innerText = "You are petting Obi :D";
  pettingStatus.setAttribute("class", "green");
});

imgOfObi.addEventListener("mouseleave", () => {
  pettingStatus.innerText = "You are not petting Obi :(";
  pettingStatus.setAttribute("class", "red");
});

const treats = [...document.getElementsByClassName("treat-item")];

treats.forEach((treat) => {
  treat.addEventListener("click", () => {
    treat.innerText = "You have fed Obi this treat";
  });
});

refillButton.addEventListener("click", () => {
  treats.forEach((treat) => {
    treat.innerText = "Treat";
  });
});
