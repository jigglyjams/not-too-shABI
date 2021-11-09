<script>
  import { getABIevents, getTopic, getTransaction } from './utils/getabi.js';
  let contractAddress = "";
  let options = [];
  let abi = "click fetch";
  let selected;
  let topic = "";
  let error = "";
  let example = "";

  async function handleClick(e) {
    try {
      [abi, options] = await getABIevents(contractAddress);
    } catch {
      error = "Bad address";
      contractAddress = "";
    }
  }

  function handleSelect(e) {
    try {
      topic = getTopic(e);
    } catch {
      topic = "";
    }
  }

  function clearValues() {
    error = "";
    topic = "";
    example = "";
    abi = "click fetch";
    options = [];
  }

  async function getExample() {
    example = await getTransaction(contractAddress, abi, options[selected], topic);
    console.log(example);
  }
</script>

<input on:change="{() => clearValues()}" bind:value={contractAddress}>
<p><button on:click={handleClick}>fetch ABI</button></p>


{#if error.length}
<p id="error">Error: {error}</p>
{/if}

<details>
  <summary>View ABI</summary>
  <pre>{JSON.stringify(abi, null, 2)}</pre>
</details>

{#if options.length}
<p>events:</p>
<p>
  <select bind:value={selected} on:change={handleSelect(options[selected])}>
  {#each options as o}
    <option value={options.indexOf(o)}>
      {o.name}
    </option>
    {/each}
  </select>
</p>
{/if}

{#if topic.length}
<p>topic:</p>
<pre>{topic}</pre>
<p><button on:click={getExample}>get latest example</button></p>
{/if}

{#if example != ""}
<a target="_blank" href="{`https://etherscan.io/tx/${example.transactionHash}`}">etherscan</a>
<pre>{JSON.stringify(example,null,2)}</pre>
{/if}

<style>
  input { 
    width:500px;
  }

  button, summary {
    color: #62f0a9;
  }

  #error {
    color: rgb(228, 88, 88);
  }

  pre, summary {
    width:500px;
    text-align: left;
    font-size: 11px;
    max-width: 500px;
    max-height: 500px;
  }

</style>
