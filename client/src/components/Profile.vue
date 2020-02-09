<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>
        <h1>Welcome to your profile</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "signup",
  data: () => ({
    userExists: false,
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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
      this.$recaptcha("login").then(token => {
        console.log(token); // Will print the token
      });
    },
    register() {
      if (this.valid()) {
        this.$store
          .dispatch("REGISTER", {
            userData: {
              fullName: this.username,
              email: this.email,
              password: this.password
            }
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
            this.userExists = true;
          });
      }
    },
    valid() {
      return this.password === this.confirm_password;
    }
  }
};
</script>
