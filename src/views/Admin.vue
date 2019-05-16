<template>
	<div class="admin">
		<v-toolbar-title class="text-uppercase blue--text">
			<h1>
				<span class="font-weight-light display-1">User</span>
				<span class="display-1"> List</span>
			</h1>
			<v-divider color="grey"></v-divider>
			<v-divider color="grey"></v-divider>
		</v-toolbar-title>
			<v-container class="my-5">
				<v-card flat class="pa-3" v-for="user in users" :key="user.email">
					<v-layout row wrap>
						<v-flex xs6 sm4 md2>
							<div class="caption grey--text">Email</div>
							<div>{{ user.email }}</div>
						</v-flex>
						<v-flex xs6 sm4 md2>
							<div class="caption grey--text">User ID</div>
							<div>{{ user.uid }}</div>
						</v-flex>
						<v-flex xs6 sm4 md2>
							<div class="caption grey--text">Admin</div>
							<div>{{ user.admin }}</div>
						</v-flex>
					</v-layout>
				</v-card>
		</v-container>
	</div>
</template>

<script>
  import { db } from '../firebase';

  export default {
    data() {
      return {
        users: []
      }
    },
    created() {
      db.collection('users').onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            this.users.push({
              ...change.doc.data(),
              id: change.doc.id
            })
          }
        })
      })
    },
  }
</script>
