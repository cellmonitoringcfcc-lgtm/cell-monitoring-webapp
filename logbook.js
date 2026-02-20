
// ================= LOGBOOK PAGE JS (FINAL STABLE VERSION) =================

// Get elements safely
const logbookForm = document.getElementById("logbookForm");
const popup = document.getElementById("popup");
const closePopupBtn = document.querySelector(".popup-content button");

// 🔴 YOUR GOOGLE SCRIPT URL
const GOOGLE_SHEET_WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbwpQxKtsgnlmV5vY8K9o4j7xjhXTylRMnwZu0zjQit-eSjYU3GeUkjq7WDCB63AzM8/exec";

// ---------- POPUP CLOSE ----------
function closePopup() {
    if (popup) popup.style.display = "none";
}

if (closePopupBtn) {
    closePopupBtn.addEventListener("click", closePopup);
}

// ---------- FORM SUBMIT ----------
if (logbookForm) {

    logbookForm.addEventListener("submit", function(event) {

        event.preventDefault();

        // Collect values
        const formData = {
            cellGroup: document.getElementById("cellGroup").value.trim(),
            groupType: document.getElementById("groupType").value.trim(),
            network: document.getElementById("network").value.trim(),
            cellLeader: document.getElementById("cellLeader").value.trim(),
            date: document.getElementById("date").value.trim(),
            place: document.getElementById("place").value.trim(),
            topic: document.getElementById("topic").value.trim(),
            regularAttendees: document.getElementById("regularAttendees").value.trim(),
            vips: document.getElementById("vips").value.trim(),
            attendeesNames: document.getElementById("attendeesNames").value.trim()
        };

        // Validate
        if (Object.values(formData).some(v => v === "")) {
            if (popup) popup.style.display = "flex";
            return;
        }

        // Disable button
        const submitBtn = logbookForm.querySelector("button[type='submit']");
        if (submitBtn) submitBtn.disabled = true;

        // 🚀 SEND TO GOOGLE SHEET
        fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: "POST",
            body: JSON.stringify(formData)
        })

        // Handle BOTH JSON and TEXT responses safely
        .then(res => res.text())
        .then(text => {

            try {
                const data = JSON.parse(text);

                if (data.result === "success") {
                    alert("Form submitted successfully!");
                    logbookForm.reset();
                } else {
                    alert("Submission failed.");
                }

            } catch {
                alert("Form submitted!");
                logbookForm.reset();
            }

            if (submitBtn) submitBtn.disabled = false;
        })

        .catch(error => {
            console.error(error);
            alert("Connection error. Check Apps Script deployment.");
            if (submitBtn) submitBtn.disabled = false;
        });

    });

}