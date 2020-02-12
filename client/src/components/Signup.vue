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

          <vue-recaptcha
            v-if="showCaptcha"
            @verify="onVerify"
            sitekey="6LfOH9cUAAAAAHpngbrjSjMVnBqKjtdGDPukAJ8z"
            :loadRecaptchaScript="true"
          ></vue-recaptcha>

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
import VueRecaptcha from "vue-recaptcha";
import { mapGetters } from "vuex";
export default {
  name: "signup",
  components: { VueRecaptcha },
  created() {
    axios
      .get("https://api.ipify.org?format=json")
      .then(res => {
        this.$store.state.ip = res.data.ip;
        this.$store
          .dispatch("COUNTREQUEST", {
            ip: this.$store.state.ip,
            action: "signup"
          })
          .then(({ data, status }) => {
            console.log(data.count);
            if (data.count > 3) this.showCaptcha = true;
          });
      })
      .catch(err => {
        console.log(err);
      });
  },
  data: () => ({
    formerror: false,
    showCaptcha: false,
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
    error_msg: "",
    captchaToken: "",
    rules: {
      required: value => !!value || "Required",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    }
  }),
  methods: {
    onVerify(response) {
      this.captchaToken = response;
    },
    register() {
      if (this.valid()) {
        this.$store
          .dispatch("REGISTER", {
            userData: {
              fullName: this.fullName,
              email: this.email,
              password: this.password
            },
            userRequestData: {
              userip: this.$store.state.ip,
              captchaToken: this.captchaToken
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
