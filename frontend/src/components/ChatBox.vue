<template>
    <v-container>
      <v-row>
        <!-- Sender and Receiver Selection using v-cards -->
        <v-col cols="12" md="4">
          <v-card
            v-for="user in filteredUsers"
            :key="user.id"
            class="mb-3"
            @click="selectReceiver(user)"
            :class="{'selected-card': selectedReceiver && selectedReceiver.id === user.id}"
            outlined
          >
            <v-card-title>
              <v-avatar class="mr-3">
                <v-img :src="user.avatar" />
              </v-avatar>
              <div>
                <div class="headline">{{ user.name }}</div>
                <div class="caption">Click to select this user</div>
              </div>
            </v-card-title>
          </v-card>
        </v-col>
  
        <!-- Chat Box Display and Input -->
        <v-col cols="12" md="8">
          <v-card class="pa-3" elevation="2">
            <router-link class="d-flex justify-end" style="text-decoration: none;" to="/dashboard">
                <v-btn color="primary">Back</v-btn>
            </router-link>
            <v-card-title>
              <v-avatar class="mr-3">
                <v-img :src="user.avatar" />
              </v-avatar>
              <div>
                <div class="headline">{{ user.name || 'Loading...' }}</div>
                <div class="caption">You are chatting with:</div>
                <!-- Conditionally render selected receiver's name -->
                <div class="caption">
                  {{ selectedReceiver ? selectedReceiver.name : 'Select a receiver' }}
                </div>
              </div>
            </v-card-title>
            <v-card-subtitle>
              <v-list>
                <v-list-item-group v-if="messages.length > 0">
                  <v-list-item v-for="message in messages" :key="message.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <strong>{{ message.sender_name }}:</strong>
                        <span>{{ message.text }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item v-else>
                  <v-list-item-content>
                    <v-list-item-title>No messages yet...</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-subtitle>
  
            <v-card-actions>
              <v-textarea
                v-model="newMessage"
                label="Type your message"
                rows="2"
                outlined
                dense
              />
              <v-btn @click="sendMessage" :disabled="!newMessage" color="primary">Send</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          id: null,
          name: '',
          avatar: '', // Assuming you want to show user avatars
        },
        users: [],  // Initialize as an empty array
        selectedReceiver: null,
        newMessage: '',
        messages: [],
      };
    },
    created() {
      this.fetchUserData();
      this.fetchUsers();
    },
    computed: {
      filteredUsers() {
        // Return a filtered list of users that excludes the logged-in user
        return this.users.filter(user => user.id !== this.user.id);
      }
    },
    methods: {
      async fetchUserData() {
        try {
          const userResponse = await axios.get('http://localhost:8000/api/me/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          this.user = userResponse.data; // Assuming the response has user data
          console.log('User data:', this.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async fetchUsers() {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/users/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
  
          console.log('API response:', response.data);
  
          // Check if response is successful and contains users data
          if (response.data.status === 'success' && Array.isArray(response.data.data.users)) {
            this.users = response.data.data.users; // Assuming users array is under 'data.users'
            console.log('Fetched users:', this.users);
          } else {
            console.error('API response does not contain valid users array:', response.data);
            this.users = [];
          }
        } catch (error) {
          console.error('Error fetching users:', error);
          this.users = [];
        }
      },
      selectReceiver(user) {
        this.selectedReceiver = user; // Set the selected receiver to the clicked user
      },
      sendMessage() {
        if (!this.selectedReceiver || !this.newMessage) return;
  
        const message = {
          sender_id: this.user.id,
          receiver_id: this.selectedReceiver.id,
          text: this.newMessage,
        };
  
        // Simulate sending the message by pushing it to the messages array
        this.messages.push({
          sender_name: this.user.name,
          text: this.newMessage,
        });
  
        // Clear the input after sending the message
        this.newMessage = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .headline {
    font-size: 1.5em;
    font-weight: bold;
    font-family: "monospace";
  }
  
  .caption {
    font-size: 0.9em;
    color: grey;
  }
  
  /* Highlight selected receiver card */
  .selected-card {
    background-color: #f0f0f0; /* Light grey background for selected card */
    border: 1px solid #1976d2; /* Blue border to indicate selection */
    color: #151515;
  }
  </style>
  