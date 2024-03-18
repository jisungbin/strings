<script lang="ts">
  import type {StringNode} from './StringNode.ts'

  let stringNodes: ReadonlyArray<StringNode>
  $: stringNodes = []

  onmessage = (event: MessageEvent<StringNode[]>) => {
    stringNodes = event.data
    console.log(`Received ${stringNodes.length} string nodes: ${stringNodes.map((node) => node.id).join(', ')}`)
  }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .title,
    .content {
        text-align: left;
    }

    .underline {
        text-decoration-line: underline;
        text-decoration-color: #FE70AC;
    }
</style>

<div class="container">
  <div class="title">strings!</div>
  {#each stringNodes as node (node.node.id)}
    {#each node.value.split('') as char, index}
      <div class="content">
        {#if node.wrongValueRange.start <= index && index <= node.wrongValueRange.endInclusive}
          <span class="underline">{char}</span>
        {:else}
          {char}
        {/if}
      </div>
    {/each}
  {/each}
</div>
