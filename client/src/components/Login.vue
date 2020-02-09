<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-alert
              color="error"
              :value="error"
              icon="close"
            >The username or the password are incorrect.</v-alert>
            <v-card-text>
              <v-text-field v-model="email" name="email" label="Email" type="text"></v-text-field>

              <v-text-field v-model="password" name="password" label="Password" type="password"></v-text-field>
            </v-card-text>
            <v-divider light></v-divider>
            <v-card-actions>
              <v-btn to="/" rounded color="indigo" dark>Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn rounded color="primary" dark @click.prevent="login()">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  created() {
    axios
      .get("https://api.ipify.org?format=json")
      .then(res => {
        this.$store.state.user.ip = res.data.ip;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: () => ({
    email: "",
    password: "",
    error: false
  }),

  methods: {
    recaptcha() {
      return this.$recaptcha("login").then(token => {
        this.$store.state.user.captchaToken = token;
        console.log("token", token); // Will print the token
      });
    },
    fetchRequestCount() {
      return this.$store
        .dispatch("COUNTREQUEST", {
          ip: this.$store.state.user.ip,
          action: "login"
        })
        .then(({ data, status }) => {
          this.$store.state.user.requestCount = data.count;
        });
    },
    login() {
      this.fetchRequestCount().then();
      if (Number(this.$store.state.user.requestCount) > 3)
        this.recaptcha().then(); //invisible recaptcha
      this.$store
        .dispatch("LOGIN", {
          credentials: { email: this.email, password: this.password },
          strategy: "email",
          userRequestData: {
            userip: this.$store.state.user.ip,
            captchaToken: this.$store.state.user.captchaToken
          }
        })
        .then(success => {
          this.$router.push("/profile");
        })
        .catch(error => {
          this.error = true;
        });
    }
  }
};
</script>
