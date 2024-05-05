function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password are default "admin"
    if (username === "admin" && password === "admin") {
        window.location.href = "home.html"; // Redirect to main page if username and password are correct
    } else if (username === "newuser" && password === "newpassword") {
        // Add new username and password combination here
        // For example, let's use "newuser" as username and "newpassword" as password
        window.location.href = "home.html"; // Redirect to main page if username and password are correct
    } else {
        document.getElementById("error-message").innerText = "Username atau password Anda salah"; // Display error message
    }
}
