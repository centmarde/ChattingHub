<script>
  import Button, { Label, Icon } from '@smui/button';
  import { navigate } from 'svelte-routing';
  import axios from "axios";
  import { accessToken, userId, isAuthenticated } from "../stores/authStore";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      const token = response.data.access;
      accessToken.set(token);
      userId.set(null);
      isAuthenticated.set(true);

      const userResponse = await axios.get("http://localhost:8000/api/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const id = userResponse.data.id;
      userId.set(id);

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", id);

      navigate('/dashboard');
      return true;
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login failed:", error);
      accessToken.set(null);
      userId.set(null);
      isAuthenticated.set(false);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");

    
      return false;
    }
  };

  const handleRegisterSubmit = async () => {
    if (password !== confirmPassword) {
      error = "Passwords do not match";
      return false;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        email,
        password1: password,
        password2: confirmPassword,
      });

      if (response.data.message === "success") {
       alert("Registration successful! Please Login to continue.");
       
       window.location.href = "/";
        return true;
      } else {
        error = response.data.errors || "An unknown error occurred.";
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
  
      return false;
    }
  };
</script>

<style>
  .form-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>

<div class="form-container">
  <h2 class="text-center">Decrypter</h2>
  <form on:submit|preventDefault={handleLoginSubmit}>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="email"
        bind:value={email}
        required
        placeholder="Enter your email"
      />
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        id="password"
        bind:value={password}
        required
        placeholder="Enter your password"
      />
    </div>
    <div class="d-flex justify-content-center">
      <Button class="w-50" type="submit" variant="raised">
        <Icon class="material-icons">login</Icon>
        <Label>Login</Label>
      </Button>
    </div>
  </form>
  <div class="text-center mt-3">
    <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
  </div>
</div>

<!-- Register Modal -->
<div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="registerModalLabel">Register</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form on:submit|preventDefault={handleRegisterSubmit}>
          <div class="mb-3">
            <label for="registerEmail" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="registerEmail"
              bind:value={email}
              required
              placeholder="Enter your email"
            />
          </div>
          <div class="mb-3">
            <label for="registerPassword" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="registerPassword"
              bind:value={password}
              required
              placeholder="Enter your password"
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              bind:value={confirmPassword}
              required
              placeholder="Confirm your password"
            />
          </div>
          <div class="d-flex justify-content-center">
            <Button class="w-50" type="submit" variant="raised">
              <Icon class="material-icons">person_add</Icon>
              <Label>Register</Label>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
