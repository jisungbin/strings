<!--suppress JSUnresolvedReference -->
<script>
  $: stringNodes = []

  onmessage = (event) => {
    stringNodes = event.data.pluginMessage
  }

  function focusOnNode(node) {
    parent.postMessage({pluginMessage: {'type': 'focus-node', 'value': node.node}}, '*')
  }

  function quickFix(node) {
    parent.postMessage({pluginMessage: {'type': 'quick-fix', 'value': node}}, '*')
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .content {
    background-color: var(--figma-color-bg-secondary);
    border-radius: 5px;
    padding: 8px;
    text-align: left;
  }

  .top-divier {
    margin-top: 8px;
  }

  .bottom-divier {
    margin-top: 6px;
  }

  .string-id {
    font-weight: bold;
    font-size: 13px;
    color: var(--figma-color-text-component);
  }

  .string-value {
    font-size: 18px;
    color: var(--figma-color-text);
  }

  .wrong-underline {
    text-decoration-line: underline;
    color: var(--figma-color-text-danger);
  }

  .wrong-description {
    font-size: 14px;
    color: var(--figma-color-text-danger);
  }
</style>

<div class="container">
  {#each stringNodes as node (node.node.id)}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="content" on:click={() => focusOnNode(node)}>
      <span class="string-id">{node.id}</span>
      <div class="top-divier"/>
      <span class="string-value">
        {#each node.value.split('') as char, index}
          {#if (node.wrongValueRange?.start <= index) && index <= node.wrongValueRange?.endInclusive}
            <span class="wrong-underline">{char}</span>
          {:else}
            {char}
          {/if}
        {/each}
      </span>
      <div class="bottom-divier"/>
      <span class="wrong-description" on:click={() => quickFix(node)}>{node.wrongDescription ?? ""}</span>
    </div>
  {/each}
</div>
