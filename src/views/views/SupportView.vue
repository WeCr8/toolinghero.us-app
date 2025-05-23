<template>
  <section class="pt-24 pb-12 px-6 sm:px-12 bg-white dark:bg-gray-900 min-h-screen fade-in">
    <div class="max-w-4xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white">🛟 Support Center</h1>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Need help with Tooling Hero? Browse FAQs, submit a ticket, or explore documentation for
        modules like DANG, DARN, and Admin Dashboard.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <!-- FAQs -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
            📚 Frequently Asked Questions
          </h2>
          <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• How do I generate a tool ID with DANG?</li>
            <li>• Can I use Tooling Hero offline?</li>
            <li>• What does 'onboardingComplete' mean?</li>
            <li>• How do I upgrade to a Pro or Enterprise plan?</li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
            📨 Submit a Support Request
          </h2>
          <p class="text-sm mb-4">
            Can’t find your answer? Reach out to us via email or open a support ticket and we’ll get
            back to you shortly.
          </p>
          <a
            href="mailto:support@toolinghero.us"
            class="inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ✉️ Email Support
          </a>
        </div>
      </div>

      <!-- Docs -->
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Looking for module docs? Visit our
          <a href="/docs" class="text-blue-500 underline">documentation portal</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script logic needed for static support view yet
</script>

<style scoped>
section {
  font-family: 'Inter', sans-serif;
}
</style>
