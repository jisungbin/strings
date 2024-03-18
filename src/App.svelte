<!--suppress JSUnresolvedReference -->
<script>
  $: stringNodes = []

  onmessage = (event) => {
    stringNodes = event.data.pluginMessage
  }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .content {
        text-align: left;
    }

    .underline {
        text-decoration-line: underline;
        text-decoration-color: #FE70AC;
    }
</style>

<div class="container">
  {#each stringNodes as node (node.node.id)}
    <div class="content">
      {#each node.value.split('') as char, index}
        {#if node.wrongValueRange.start <= index && index <= node.wrongValueRange.endInclusive}
          <span class="underline">{char}</span>
        {:else}
          {char}
        {/if}
      {/each}
    </div>
  {/each}
</div>
