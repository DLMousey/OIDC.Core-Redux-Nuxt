<script setup lang="ts">
const colourMode = useColorMode();
const imgSrc = ref(`/wordmark-light-theme.png`);
//
// definePageMeta({
//   middleware: ['auth']
// })

const authState = useAuth();
</script>

<template>
  <div class="container">
    <aside class="aside">
      <div class="header">
        <NuxtLink to="/">
          <img :src="imgSrc" alt="OIDC.Core word mark" />
        </NuxtLink>
      </div>
      <nav class="nav">
        <span class="nav-heading">Menu</span>
        <ul>
          <li>
            <NuxtLink to="/applications">
              <Icon name="duo-icons:app" />
              Applications
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/scopes">
              <Icon name="duo-icons:clipboard" />
              Scopes
            </NuxtLink>
          </li>
          <li>
            <a href="#">
              <Icon name="duo-icons:user-card" />
              Access Tokens
            </a>
          </li>
          <li>
            <a href="#">
              <Icon name="duo-icons:user" />
              Settings
            </a>
          </li>
          <li>
            <NuxtLink to="/users">
              <Icon name="duo-icons:user" />
              Users
            </NuxtLink>
          </li>
          <li>
            <a href="#">
              <Icon name="duo-icons:chip" />
              Developers
            </a>
          </li>
          <li v-if="!authState">
            <NuxtLink to="/login">
              <Icon name="duo-icons:user" />
              Log in
            </NuxtLink>
          </li>
          <li v-if="authState">
            <NuxtLink to="/logout">
              <Icon name="duo-icons:user-card" />
              Log out
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
@import url('~/assets/scss/main.scss');

.container {
  height: 100%;
  display: flex;
}

.main {
  width: 100%;
  height: 100%;
  background: #FFF;
}

.aside {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 300px;
  background: #FFF;
  border-right: 1px solid #EBEBEB;

  .header {
    flex-basis: 10%;
    padding: 40px;
    img {
      max-width: 100%;
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding-left: 40px;
    margin-top: 40px;

    &-heading {
      font-weight: 400;
      color: #AAA;
      margin-bottom: 12px;
    }

    ul {
      display: flex;
      flex-direction: column;

      li {
        transition: background 0.2s ease-out, padding-left 0.3s cubic-bezier(.47,1.64,.41,.8);
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;

        a {
          padding: 12px 12px 12px 0;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: black;

          .iconify {
            margin-right: 8px;
          }
        }

        &:hover {
          background: #FF575F;
          padding-left: 24px;
        }

        & > .link-active {
          background: #FF575F;
          padding-left: 24px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;

          &:hover {
            padding-left: 0;
          }
        }
      }
    }
  }
}
</style>