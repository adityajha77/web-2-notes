let isSignup = false;

// 1. Show the login box when book is clicked
function showLogin() {
    document.getElementById("book-trigger").style.display = "none";
    document.getElementById("auth-box").classList.add("visible");
}

// 2. Toggle between Sign In and Sign Up
function toggleMode() {
    isSignup = !isSignup;
    if (isSignup) {
        document.getElementById("form-title").innerText = "Sign Up";
        document.getElementById("submit-btn").innerText = "Sign Up";
        document.getElementById("name").style.display = "block";
    } else {
        document.getElementById("form-title").innerText = "Sign In";
        document.getElementById("submit-btn").innerText = "Sign In";
        document.getElementById("name").style.display = "none";
    }
}

// 3. Handle Login/Signup
async function handleAuth() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("name").value;

    const endpoint = isSignup ? "/signup" : "/signin";
    const payload = isSignup ? { email, password, name } : { email, password };

    try {
        const response = await axios.post("http://localhost:3000" + endpoint, payload);

        if (response.data.token) {
            // Login Success: Save token & Show Blog Form
            localStorage.setItem("token", response.data.token);
            alert("Login Successful!");
            
            // UI Switch: Hide Auth, Show Blog
            document.getElementById("auth-box").style.display = "none";
            document.getElementById("blog-box").style.display = "block";
        } else {
            // Signup Success
            alert("Account created! Please Sign In.");
            toggleMode(); // Switch back to login view
        }
    } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
    }
}

// 4. Create Blog Function
async function createBlog() {
    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first!");
        return;
    }

    try {
        await axios.post("http://localhost:3000/blogpost", 
            {
                title: title,
                content: content
            },
            {
                headers: { "Authorization": "Bearer " + token }
            }
        );
        alert("Blog Published!");
        // Clear inputs
        document.getElementById("blog-title").value = "";
        document.getElementById("blog-content").value = "";
    } catch (error) {
        alert("Failed to publish: " + (error.response?.data?.message || "Unknown error"));
    }
}

function logout() {
    localStorage.removeItem("token");
    location.reload();
}