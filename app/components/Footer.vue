<template>
  <footer class="bg-white border-t border-stroke mt-12">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
      <div class="text-sm text-footer-text">© {{ year }} Marjolène Lasne</div>
      <div class="flex items-center space-x-4 mt-4 md:mt-0">
        <a href="#" aria-label="Instagram" class="text-primary hover:text-accent">Instagram</a>
        <a href="#" aria-label="Facebook" class="text-primary hover:text-accent">Facebook</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
