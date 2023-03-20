function calculateDays() {
    const targetDateSelect = document.getElementById("target-date");
    const targetDateValue = targetDateSelect.value;
    const targetDate = new Date(targetDateValue);
    const today = new Date();
  
    if (targetDate < today) {
      document.getElementById("result").innerHTML = "Already Happened!";
      document.getElementById("result").style.color = "red";
    } else {
      const timeDiff = Math.abs(targetDate.getTime() - today.getTime());
      // getting time diff between target date and todays date down to millisecond, then converting back to days by the conversion below
      const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      document.getElementById("result").style.color = "black";
      document.getElementById("result").innerHTML =
        diffDays + " days remaining until the target date.";
    }
  }