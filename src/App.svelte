<script>
  import ABIevents from './ABIevents.svelte';
</script>

<main>
  <h1>not too shABI</h1>
  <ABIevents/>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 500px;
    margin: 0 auto;
  }
  
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>