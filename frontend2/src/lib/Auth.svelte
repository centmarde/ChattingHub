<script>
  import Button, { Label, Icon } from '@smui/button';
  import { navigate } from 'svelte-routing';
  import axios from "axios";
  import { accessToken, userId, isAuthenticated } from "../stores/authStore";
  import { toast } from '@zerodevx/svelte-toast'; // Import SvelteToast and toast
  
  let email = "";
  let password = "";

  const handleLoginSubmit = async () => {
    try {
      // Authenticate the user with the login credentials
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: email,
        password: password,
      });

      const token = response.data.access; // Get the access token
      console.log("Access Token:", token);

      // Update the store with the new token and set isAuthenticated to true
      accessToken.set(token);
      userId.set(null);  // Reset userId in case there's no stored user data
      isAuthenticated.set(true); // Set the user as authenticated

      // Fetch the user details from /api/me/ using the access token
      const userResponse = await axios.get("http://localhost:8000/api/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const id = userResponse.data.id; // Assuming the response contains an 'id' field
      console.log("User ID:", id);

      // Update the store with the new user ID
      userId.set(id);

      // Save the token and user data to localStorage for persistence
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", id);

      // Show success toast
      toast.push("Login successful!", {
        duration: 3000,
        theme: {
          '--toastColor': 'mintcream',
          '--toastBackground': 'rgba(72,187,120,0.9)',
          '--toastBarBackground': '#2F855A'
        }
      });

      navigate('/dashboard');
      return true; // Successful login
    } catch (error) {
      console.error("Login failed:", error);
      
      // Reset the store values in case of failure
      accessToken.set(null);
      userId.set(null);
      isAuthenticated.set(false); // Set authentication state to false

      // Remove invalid token and user ID from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");

      // Show error toast
      toast.push("Login failed. Please try again.", {
        duration: 3000,
        theme: {
          '--toastColor': 'red',
          '--toastBackground': 'rgba(72,187,120,0.9)',
          '--toastBarBackground': '#2F855A'
        }
      });

      return false; // Failed login
    }
  };

  const handleRegisterSubmit = () => {
    alert("Registration form submitted!");
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

<br><br><br>
<div class="form-container">
  <h2 class="text-center">Login</h2>
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
        <Icon class="material-icons">favorite</Icon>
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
              required
              placeholder="Enter your password"
            />
          </div>
          <div class="d-flex justify-content-center">
            <Button class="w-50" type="submit" variant="raised">
              <Icon class="material-icons">favorite</Icon>
              <Label>Login</Label>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
