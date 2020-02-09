<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="blue">
            <v-toolbar-title>Signup form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-alert :value="formerror" color="error" icon="warning">{{error_msg}}</v-alert>

              <v-text-field
                name="fullname"
                v-model="fullName"
                label="Full Name"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                name="email"
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                name="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                v-model="password"
              ></v-text-field>

              <v-text-field
                name="password"
                label="Confirm Password"
                :rules="[rules.required]"
                type="password"
                v-model="confirm_password"
                :error="!valid()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider light></v-divider>

          <v-card-actions>
            <v-btn to="/login" rounded color="black" dark>Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn rounded color="success" @click.prevent="register();">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "signup",
  created() {
    axios
      .get("https://api.ipify.org?format=json")
      .then(res => {
        this.$store.state.ip = res.data.ip;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: () => ({
    formerror: false,
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    error_msg: "",
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    recaptcha() {
      return this.$recaptcha("login").then(token => {
        this.$store.state.captchaToken = token;
        console.log("token", token); // Will print the token
      });
    },
    fetchRequestCount() {
      return this.$store
        .dispatch("COUNTREQUEST", {
          ip: this.$store.state.ip,
          action: "signup"
        })
        .then(({ data, status }) => {
          this.$store.state.requestCount = data.count;
        });
    },
    register() {
      if (this.valid()) {
        this.fetchRequestCount().then();
        if (Number(this.$store.state.requestCount) > 3) this.recaptcha().then(); //invisible recaptcha
        this.$store
          .dispatch("REGISTER", {
            userData: {
              fullName: this.fullName,
              email: this.email,
              password: this.password
            },
            userRequestData: {
              userip: this.$store.state.ip,
              captchaToken: this.$store.state.captchaToken
            },
            strategy: "email"
          })
          .then(({ status }) => {
            this.$store.commit("SET_NOTIFICATION", {
              display: true,
              text:
                "Your account has been successfully created! you can now login.",
              alertClass: "danger"
            });
            this.$router.push("/login");
          })
          .catch(error => {
            this.formerror = true;
            this.error_msg = error.message.replace("%s is", "");
          });
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>
