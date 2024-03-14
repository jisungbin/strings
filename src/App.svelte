<script>
  let title = "Title";
  let description = "Description";
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .title,
    .description {
        text-align: left;
    }

    .underline {
        text-decoration-line: underline;
        text-decoration-color: #FE70AC;
    }
</style>

<div class="container">
  <div class="title">{title}</div>
  <div class="description">
    {#each description.split('') as char}
      {#if char === "t" || char === "i" || char === "o" || char === "n"}
        <span class="underline">{char}</span>
      {:else}
        {char}
      {/if}
    {/each}
  </div>
</div>
