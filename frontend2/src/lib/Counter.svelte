<script>
  let email = "";
  let password = "";

  const handleLoginSubmit = () => {
    alert(`Email: ${email}, Password: ${password}`);
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

<br> <br> <br>
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
    <button type="submit" class="btn btn-primary w-100">Login</button>
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
          <button type="submit" class="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  </div>
</div>