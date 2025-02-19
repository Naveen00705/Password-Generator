const length = document.getElementById("passwordLength");
const button = document.querySelector("button");
const passwords = document.querySelectorAll(".input--password");

const specialchar = document.getElementById("special-char");
const uppercase = document.getElementById("uperrcase");

const message = document.querySelector(".error-message");

// Function to generate a random character
function randomChar() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    return characters.charAt(Math.floor(Math.random() * characters.length));
}

// Function to create a password
function generatePassword() {
    const passLength = parseInt(length.value);
    let password = "";

    // Error handling for invalid password length
    if (passLength <= 0) {
        return showError("Password must have at least one character.");
    } else if (passLength > 20) {
        return showError("Password cannot be longer than 20 characters.");
    }

    // Generate password based on the specified length
    for (let i = 0; i < passLength; i++) {
        password += randomChar();
    }

    // Apply uppercase transformation if selected
    if (uppercase.checked) {
        password = password.charAt(0).toUpperCase() + password.slice(1);
    }

    // Apply special character transformation if selected
    if (specialchar.checked) {
        const randomIndex = Math.floor(Math.random() * password.length);
        password = password.slice(0, randomIndex) + randomChar() + password.slice(randomIndex + 1);
    }

    // Clear any existing error messages
    message.classList.remove("visibility");

    // Update all password inputs with the generated password
    passwords.forEach((passwordField) => {
        passwordField.value = password;
    });
}

// Display error message
function showError(messageText) {
    message.classList.add("visibility");
    message.textContent = messageText;
}

// Copy password to clipboard using modern API
function copyToClipboard() {
    navigator.clipboard.writeText(this.value)
        .then(() => {
            showError("Password copied!");
            message.style.color ="green";
        })
        .catch(() => {
            showError("Failed to copy password.");
        });
}

// Event listeners
button.addEventListener("click", generatePassword);

passwords.forEach((passwordField) => {
    passwordField.addEventListener("click", copyToClipboard);
});
