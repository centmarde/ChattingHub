<template>
  <v-container>
    <v-row>
      <!-- Inbox (left sidebar) -->
      <v-col cols="12" md="4">
        <v-card class="mb-3" elevation="2">
          <v-card-title>
            <div class="headline">Availabe Users</div>
          </v-card-title>
          <v-list>
            <v-list-item-group v-if="filteredUsers.length > 0">
              <v-list-item v-for="user in filteredUsers" :key="user.id" @click="selectReceiver(user)">
                <v-list-item-avatar>
                  <v-img :src="user.avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
            <v-list-item v-else>
              <v-list-item-content>
                <v-list-item-title>No conversations available...</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Chat Box (right section) -->
      <v-col cols="12" md="8">
        <v-card v-if="selectedReceiver" class="pa-3" elevation="2">
          <v-card-title>
            <v-avatar class="mr-3">
              <v-img :src="selectedReceiver.avatar" />
            </v-avatar>
            <div>
              <div class="headline">{{ selectedReceiver.name }}</div>
              <div class="caption">Chat with {{ selectedReceiver.name }}</div>
            </div>
            <!-- <router-link class="d-flex justify-end" to="/dashboard" style="text-decoration: none;">
              <v-btn color="primary">Back</v-btn>
            </router-link> -->
          </v-card-title>

          <v-card-subtitle>
            <v-scroll-y class="message-list">
              <v-list>
                <v-list-item-group v-if="messages && messages.length > 0">
                  <v-list-item v-for="message in messages" :key="message.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <v-card class="pa-3 mb-3"> <h4>{{ message.content }}</h4></v-card>
                      </v-list-item-title>
                      <span class="mx-5">{{ message.timestamp }}</span>
                      <span class="mx-5">sent to: {{ message.receiver }}</span>
                      <span class="mx-5">Ensure that your secrets are safe with us.</span>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item v-else>
                  <v-list-item-content>
                    <v-list-item-title>No messages yet...</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-scroll-y>
          </v-card-subtitle>

          <!-- Message Input -->
          <v-card-actions>
            <v-textarea v-model="newMessage" label="Type your message" rows="2" outlined dense />
            <v-btn @click="sendMessage" :disabled="!newMessage" color="primary">Send</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Reply messages -->
     

        <v-card v-else class="pa-3 mt-3" elevation="2">
          <v-card-title>
            <div class="headline">No replies yet</div>
          </v-card-title>
        </v-card>

        <v-card v-else class="pa-3" elevation="2">
          <v-card-title>
            <div class="headline">Select a user to whom you want to whisper.</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="caption">Click on a user from the Inbox to start a chat.Ensure that your secrets are safe with us.</div>
          </v-card-subtitle>
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
        avatar: '',
      },
      users: [],
      selectedReceiver: null,
      newMessage: '',
      messages: [], // Default value is an empty array to avoid undefined errors
      replies: [], // Default value is an empty array to avoid undefined errors
    };
  },
  created() {
    this.fetchUserData();
    this.fetchUsers();
    this.startMessagePolling(); // Start polling for new replies
  },
  computed: {
    filteredUsers() {
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
        this.user = userResponse.data;
        this.fetchMessages();
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
        if (response.data.status === 'success' && Array.isArray(response.data.data.users)) {
          this.users = response.data.data.users;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    selectReceiver(user) {
      this.selectedReceiver = user;
      this.fetchMessages();
      this.replies = []; // Clear previous replies when switching users
    },
    async fetchMessages() {
      if (!this.selectedReceiver) return;
      try {
        const receiverId = this.selectedReceiver.id;

        const response = await axios.get('http://127.0.0.1:8000/chat/api/conversation-messages/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          params: {
            receiver_id: receiverId,
            sender_id: this.user.id,
          },
        });

        this.messages = response.data;
        this.fetchReplies(); // Fetch replies from the selected receiver
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async fetchReplies() {
      if (!this.selectedReceiver) return;
      try {
        const receiverId = this.selectedReceiver.id;

        const response = await axios.get('http://127.0.0.1:8000/chat/api/conversation-messages/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          params: {
            sender_id: receiverId, // Get replies from the selected user
            receiver_id: this.user.id,
          },
        });

        this.replies = response.data; // Store the replies
      } catch (error) {
        console.error('Error fetching replies:', error);
      }
    },
    startMessagePolling() {
      // Polling to fetch new messages every 5 seconds
      setInterval(() => {
        if (this.selectedReceiver) {
          this.fetchMessages();
          this.fetchReplies();
        }
      }, 2000);
    },
    async sendMessage() {
      if (!this.selectedReceiver || !this.newMessage) return;

      const messageData = {
        sender: this.user.id,
        receiver: this.selectedReceiver.id,
        content: this.newMessage,
        timestamp: new Date().toISOString(),
      };

      try {
        const response = await axios.post('http://localhost:8000/chat/api/messages/', messageData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        this.messages.push({
          id: response.data.id,
          sender_name: this.user.name,
          content: this.newMessage,
        });

        this.newMessage = '';
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }
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

.selected-card {
  background-color: #f0f0f0;
  border: 1px solid #1976d2;
  color: #151515;
}

.v-list-item {
  cursor: pointer;
}

.v-card-actions {
  display: flex;
  align-items: center;
}

.v-textarea {
  flex-grow: 1;
  margin-right: 10px;
}

.v-btn {
  align-self: flex-start;
}
.message-list, .reply-list {
  max-height: 100px; /* Adjust height as needed */
  overflow-y: auto;
}
</style>
