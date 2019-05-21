<template>
	<nav>
		<v-toolbar flat app>
			<v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title class="text-uppercase grey--text">
				<span class="font-weight-light"><router-link to="/">We</router-link></span>
				<span><router-link to="/">Perform</router-link></span>
			</v-toolbar-title>
			<v-btn flat color="grey" to="/performers">
				<span>Search</span>
			</v-btn>
			<v-btn flat color="grey" to="/bookings">
				<span>Bookings</span>
			</v-btn>
			<v-btn flat color="grey" to="/about">
				<span>About</span>
			</v-btn>
			<!--<v-btn flat color="grey" to="/admin">-->
				<!--<span>Admin</span>-->
			<!--</v-btn>-->
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-btn flat color="grey" to="/profile">
				<span>Profile</span>
			</v-btn>
      <template v-if="user">
        <Signout/>
      </template>
      <template v-else>
        <PopupRegister/>
        <PopupLogin/>
      </template>
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
				<p></p>
				<PopupPerformer/>
			</v-list>
		</v-navigation-drawer>
	</nav>
</template>

<script>
	import PopupPerformer from '../views/PopupPerformer';
	import PopupRegister from '../views/PopupRegister';
	import PopupLogin from '../views/PopupLogin';
  import Signout from '../views/Signout';
  import { mapState } from 'vuex';

	export default {
		components: { PopupRegister, PopupLogin, Signout, PopupPerformer },
		data() {
			return {
				drawer: false,
				links: [
					{ icon: 'home', text: 'Home', route: '/' },
					{ icon: 'info', text: 'About', route: '/about' },
					{ icon: 'list', text: 'User List', route: '/admin' },
					{ icon: 'people', text: 'Performers', route: '/performers' },
					{ icon: 'shopping_cart', text: 'Bookings', route: '/bookings' }
				]
			}
		},
    computed: mapState([
      'user'
    ]),
    methods: {
    }
	}
</script>

<style scoped>
	a {
		text-decoration: none;
		color: grey;
	}
</style>
