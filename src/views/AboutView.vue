<template>
  <section class="pt-24 pb-20 px-6 sm:px-12 bg-white dark:bg-gray-900 min-h-screen fade-in">
    <div class="max-w-5xl mx-auto space-y-12">
      <header class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">📘 About Tooling Hero</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tooling Hero is the all-in-one digital twin platform built for smarter tool tracking,
          lifecycle management, and asset intelligence across industries.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
        <!-- DANG -->
        <div
          class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            ⚙️ DANG Generator
          </h2>
          <p class="text-gray-700 dark:text-gray-200">
            Automatically create smart tool descriptions, naming conventions, and digital IDs using
            AI. Standardizes data across ERPs, CAM systems, and databases.
          </p>
        </div>

        <!-- DARN -->
        <div
          class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            📊 DARN Tracker
          </h2>
          <p class="text-gray-700 dark:text-gray-200">
            Lifecycle logging for every asset. Track usage, location, operator, and condition with
            BLE, RFID, and GPS integrations.
          </p>
        </div>

        <!-- Blockchain -->
        <div
          class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            🔗 Blockchain Proof
          </h2>
          <p class="text-gray-700 dark:text-gray-200">
            Use VeChain and Arweave to mint permanent digital twins, ensuring immutable ownership,
            audit trails, and trust.
          </p>
        </div>

        <!-- Suite Support -->
        <div
          class="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md border dark:border-gray-700"
        >
          <h2 class="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
            🧰 Suite-Based Access
          </h2>
          <p class="text-gray-700 dark:text-gray-200">
            Whether you're a CNC machinist, field electrician, landscaper, or teacher — Tooling Hero
            configures itself to your workflow using tailored suites and modules.
          </p>
        </div>
      </div>

      <footer class="text-center pt-10">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Tooling Hero is developed by <strong>WeCr8 Solutions LLC</strong>. Designed to empower
          teams of 1 to 1,000+ with tool intelligence.
        </p>
        <router-link
          to="/"
          class="text-blue-600 dark:text-blue-400 mt-4 inline-block hover:underline"
        >
          ← Return to Modules
        </router-link>
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
// No logic needed yet — static info page
</script>
