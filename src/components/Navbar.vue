<template>
	<nav>
		<v-toolbar flat app>
			<v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light">We</span>
				<span>Perform</span>
			</v-toolbar-title>
			<v-btn flat color="grey" to="/">
				<span>Home</span>
			</v-btn>
			<v-btn flat color="grey" to="/about">
				<span>About</span>
			</v-btn>
			<v-btn flat color="grey" to="/performers">
				<span>Performers</span>
			</v-btn>
			<v-btn flat color="grey" to="/admin">
				<span>Admin</span>
			</v-btn>
			<v-btn flat color="grey" to="/register">
				<span>Register</span>
			</v-btn>
		</v-toolbar>

		<v-navigation-drawer app v-model="drawer" class="black">
			<v-list>
				<v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
					<v-list-tile-action>
						<v-icon class="white--text">{{ link.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,
				links: [
					{ icon: 'home', text: 'Home', route: '/' },
					{ icon: 'info', text: 'About', route: '/about' },
					{ icon: 'person', text: 'User List', route: '/admin' },
					{ icon: 'person', text: 'Performers', route: '/performers' }
				]
			}
		}
	}
</script>

<style scoped>

</style>
