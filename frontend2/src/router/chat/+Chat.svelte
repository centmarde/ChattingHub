<script lang="ts">
    import Button from '@smui/button';
    import TopNav from '../../lib/TopNav.svelte';
    import AuthGuard from "../../auth/AuthGuard.svelte";
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { userId } from '../../stores/authStore';
  
    // Define the User type
    interface User {
      id: number;
      name: string;
      avatar: string;
    }
  
    let user: User = {
      id: 0,
      name: '',
      avatar: ''
    };
    let users: User[] = [];
    let selectedReceiver: User | null = null;
    let messages: any[] = [];
    let isLoading = true;
    let decryptedMessages: any[] = [];
  
    // Decrypt the content (dummy decryption for the sake of the example)
    function decryptMessage(content: string): string {
      // Implement your decryption logic here. This is just a placeholder.
      return atob(content); // Base64 decode (assuming the content is base64 encoded)
    }
  
    // Fetch list of users
    async function fetchUsers() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
  
        if (response.data.status === 'success' && Array.isArray(response.data.data.users)) {
          const storedUserId = localStorage.getItem('userId');
          if (storedUserId) {
            const userId = parseInt(storedUserId);
            // Filter users: Exclude the logged-in user and ensure all have a valid id
            users = response.data.data.users
              .filter((u: { id: number; }) => u.id !== userId && u.id !== undefined);
          }
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        isLoading = false;
      }
    }
  
    // Select a receiver for the chat
    function selectReceiver(user: User) {
      selectedReceiver = user;
      fetchMessages(); // Fetch messages specific to the selected receiver
    }
  
    // Fetch messages for the selected receiver
    async function fetchMessages() {
      if (!selectedReceiver) return;
      try {
        const receiverId = selectedReceiver.id;
        const response = await axios.get('http://127.0.0.1:8000/chat/api/messages-by-sender/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
          params: { sender_id: receiverId }
        });
  
        messages = response.data;
       
       
      } catch (error) {
       
      }
    }
  
    // Initialize data on mount
    onMount(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        user.id = parseInt(storedUserId);
      }
      fetchUsers();
  
      const polling = setInterval(() => {
        if (selectedReceiver) {
          fetchMessages();
        }
      }, 5000);
  
      return () => clearInterval(polling);
    });
  </script>
  
  <style>
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
  
    .headline {
      font-size: 1.5em;
      font-weight: bold;
      font-family: "monospace";
      margin-bottom: 20px;
    }
  
    .caption {
      font-size: 0.9em;
      color: grey;
    }
  
    .user-card {
      background-color: #f9f9f9;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 15px;
      display: flex;
      align-items: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s;
    }
  
    .user-card:hover {
      background-color: #e1f5fe;
    }
  
    .user-card img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
    }
  
    .chat-box {
      display: flex;
      flex-direction: column;
      height: 500px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  
    .chat-header {
      background-color: #1976d2;
      color: white;
      padding: 15px;
      border-radius: 10px 10px 0 0;
      display: flex;
      align-items: center;
    }
  
    .chat-header img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  
    .chat-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background-color: #f1f1f1;
    }
  
    .message {
      margin-bottom: 15px;
      background-color: #ffffff;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  
    .message .sender {
      font-weight: bold;
      color: #1976d2;
    }
  
    .message .content {
      margin-top: 5px;
    }
  
    .message .timestamp {
      font-size: 0.8em;
      color: grey;
      margin-top: 5px;
    }
  
    .loading {
      text-align: center;
      font-size: 1.2em;
      color: #777;
    }
  
    .no-messages {
      text-align: center;
      font-size: 1.2em;
      color: #999;
    }
  
    .button-container {
      padding: 15px;
    }
  
    .intro-text {
      text-align: center;
      font-size: 1.2em;
      color: #555;
    }
  
  </style>
  
  <TopNav />
  <AuthGuard>
    <div class="container">
      <div class="row">
        <!-- Inbox (left sidebar) -->
        <div class="col-md-4">
          <div class="card mb-3">
            <div class="card-body">
              <h3 class="headline">Available Users</h3>
              {#if isLoading}
                <p class="loading">Loading users...</p>
              {:else if users.length > 0}
                <div>
                  {#each users as user (user.id)}
                    <div on:click={() => selectReceiver(user)} class="user-card">
                      <img src={user.avatar} alt={user.name} />
                      <span>{user.name}</span>
                    </div>
                  {/each}
                </div>
              {:else}
                <p class="no-messages">No users available...</p>
              {/if}
            </div>
          </div>
        </div>
  
        <!-- Chat Box (right section) -->
        <div class="col-md-8">
          {#if selectedReceiver}
            <div class="chat-box">
              <div class="chat-header">
                <img src={selectedReceiver.avatar} alt={selectedReceiver.name} />
                <div>
                  <h4>{selectedReceiver.name}</h4>
                  <p class="caption">Chat with {selectedReceiver.name}</p>
                </div>
              </div>
              <div class="chat-messages">
                {#if messages.length > 0}
                  {#each messages as message (message.timestamp)}
                    <div class="message">
                      <div class="sender">{message.sender}</div>
                      <div class="content">{message.content}</div>
                      <div class="timestamp">{message.timestamp}</div>
                    </div>
                  {/each}
                {:else}
                  <p class="no-messages">No messages yet...</p>
                {/if}
              </div>
            </div>
          {:else}
            <div class="card">
              <div class="card-body intro-text">
                <p>Select a user to have their private messages delivered to you!</p>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </AuthGuard>
  