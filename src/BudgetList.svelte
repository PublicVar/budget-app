<script>
  import { fade } from "svelte/transition";
  import DeleteButton from "./DeleteButton.svelte";
  import EditButton from "./EditButton.svelte";
  import EditForm from "./EditForm.svelte";
  import { budgetItems, INCOME_TYPE } from "./store";

  import Total from "./Total.svelte";

  let itemToEditId = 0;

  function deleteItem(itemId) {
    budgetItems.remove(itemId);
  }

  function startEditItem(itemId) {
    itemToEditId = itemId;
  }

  function handleUpdateItem() {
    itemToEditId = 0;
  }
</script>

<table class="table">
  <thead>
    <tr>
      <th>Categorie</th>
      <th>Nom</th>
      <th class="text-right">Valeur</th>
    </tr>
  </thead>
  <tbody>
    {#each $budgetItems as item (item.id)}
      <tr transition:fade>
        {#if itemToEditId === item.id}
          <td colspan="3">
            <EditForm {...item} onUpdate={handleUpdateItem} />
          </td>
        {:else}
          <td>
            <EditButton on:click={() => startEditItem(item.id)} />
            <DeleteButton on:click={() => deleteItem(item.id)} />
            {#if item.category}
              <span class="badge badge-{item.category}">{item.category}</span>
            {/if}
          </td>
          <td>
            {item.name}
          </td>
          <td class="text-right">
            {INCOME_TYPE.INCOME === item.incomeType ? "+" : "-"}
            {item.value} €
          </td>
        {/if}
      </tr>
    {:else}
      <tr>
        <td colspan="4" class="text-center">Pas encore d'élément.</td>
      </tr>
    {/each}
  </tbody>
</table>

<Total />

<style>
  .table {
    width: 100%;
    margin: 1em 0;
  }
  .table th {
    text-align: left;
    font-size: 1.6em;
    font-weight: 500;
  }
  .table td:first-child {
    width: 33%;
  }
  .table td {
    padding: 0.5em 0;
  }
  .badge {
    border-radius: 5px;
    padding: 0.2em 0.5em;
    background-color: #aaa;
    color: #fff;
  }
  .badge-hobbies {
    background-color: rgb(223, 20, 212);
  }
  .badge-food {
    background-color: rgb(223, 78, 20);
  }
  .badge-transport {
    background-color: rgb(91, 12, 122);
  }
  .badge-house {
    background-color: rgb(21, 122, 12);
  }
  .badge-baby {
    background-color: rgb(202, 155, 0);
  }

  .text-center {
    text-align: center;
  }
  .table .text-right {
    text-align: right;
  }
</style>
