// Find the copy button and the email address on the page.
const copyButton = document.getElementById("copy");
const emailText = document.getElementById("mail");

// Only set up the button if both elements are on the page.
if (copyButton && emailText) {
  copyButton.addEventListener("click", async () => {
    // Get the email address without extra spaces.
    const email = emailText.textContent.trim();

    try {
      // Try to copy the email directly to the visitor's clipboard.
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard is not available");
      }
      await navigator.clipboard.writeText(email);
      copyButton.textContent = "Copied";
    } catch (error) {
      // If copying is blocked, highlight the email so it can be copied manually.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(emailText);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = "Selected, press copy";
    }

    // Change the button text back after a short moment.
    setTimeout(() => {
      copyButton.textContent = "Copy email";
    }, 1800);
  });
}
