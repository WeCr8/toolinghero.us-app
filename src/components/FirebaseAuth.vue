<template>
  <div class="flex justify-center items-center min-h-screen bg-[#F5F7FA]">
    <div class="p-6 w-full max-w-md bg-white shadow-xl rounded-lg">
      <h1 class="text-2xl font-bold text-center text-[#1B2A41] mb-4">
        Sign in to Tooling Hero
      </h1>
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'FirebaseAuth',
  mounted() {
    const auth = getAuth()
    const uiConfig = {
      signInSuccessUrl: '/dashboard',
      signInOptions: [
        {
          provider: 'google.com',
          scopes: ['profile', 'email']
        },
        {
          provider: 'apple.com'
        },
        {
          provider: 'password'
        }
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      tosUrl: '/terms',
      privacyPolicyUrl: '/privacy'
    }

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth)
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>
