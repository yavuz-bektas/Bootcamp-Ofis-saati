<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="firstname"
              :rules="nameRules"
              :counter="10"
              label="First name"
              required
              @keyup.enter="data"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="lastname"
              :rules="nameRules"
              :counter="10"
              label="Last name"
              required
              @keyup.enter="data"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              @keyup.enter="data"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <button @click="dataGet"> Dataları Cek</button>
    {{users}}
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">lastname</th>
            <th class="text-left">mail</th>
          </tr>
        </thead>
        <tbody>
          <tr
          v-for="i in users.users" :key="i._id"
          >
            <td>{{i.firstname}}</td>
            <td>{{i.lastname}}</td>
            <td>{{i.email}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: false,
    firstname: "",
    lastname: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 10 || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    users: []
  }),

  methods: {
    data() {
      let allInfom = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
      };
      axios.post("http://localhost:5000/user", { allInfom }).then((res) => {
        console.log(res.data);
      });
    },
    dataGet(){
      axios.get("http://localhost:5000/userget").then((res) => {
        this.users = res.data;
      });

    }
  },
};
</script>
