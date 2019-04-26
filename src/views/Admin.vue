<template>
	<div class="admin">
		<h1 class="subheading grey--text">User List</h1>
		<v-container class="my-5">
			<v-card flat class="pa-3" v-for="user in users" :key="user.username">
				<v-layout row wrap>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Username</div>
						<div>{{ user.username }}</div>
					</v-flex>
					<v-flex xs6 sm4 md2>
						<div class="caption grey--text">Full Name</div>
						<div>{{ user.fullname }}</div>
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
import db from '@/firebase'

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
				if (change.type === 'added'){
					this.users.push({
						...change.doc.data(),
						id: change.doc.id
					})
				}
			})
		})
	}
}
</script>
