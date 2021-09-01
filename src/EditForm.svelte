<script>
  import { categories, budgetItems } from "./store";

  export let id;
  export let name;
  export let incomeType;
  export let value;
  export let category;
  export let onUpdate;

  function updateItem() {
    budgetItems.updateItem({
      id,
      name,
      incomeType,
      value,
      category,
    });
    onUpdate();
  }
</script>

<div class="flex items-center">
  <input
    class="mr-1"
    type="radio"
    id="addBudgetItemIncomeType"
    name="income-type"
    bind:group={incomeType}
    value={"income"}
  />
  <label class="mr-3" for="addBudgetItemIncomeType">Revenus</label>
  <input
    class="mr-1"
    type="radio"
    id="addBudgetItemCreditType"
    name="credit-type"
    bind:group={incomeType}
    value={"expense"}
  />
  <label class="mr-3" for="addBudgetItemExpenseType">Dépenses</label>
</div>
<div class="grid grid-cols-3 gap-4">
  <div>
    <label for="addBudgetItemCategory">Type</label>
    <select
      bind:value={category}
      name="type"
      id="addBudgetItemCategory"
      class="w-full"
    >
      <option selected />
      {#each categories as theCategory (theCategory.id)}
        <option value={theCategory.id} selected={category === theCategory.id}
          >{theCategory.label}</option
        >
      {/each}
    </select>
  </div>
  <div style="position: relative;">
    <label for="budgetItemName">Nom</label>
    <input
      class="w-full"
      type="text"
      name="name"
      id="addBudgetItemName"
      bind:value={name}
    />
  </div>
  <div>
    <label for="addBudgetItemAmount">Valeur</label>
    <div>
      <input
        class="w-full"
        type="number"
        id="addBudgetItemAmount"
        name="amount"
        placeholder="0.00"
        bind:value
      />
    </div>
  </div>
</div>
<div>
  <button
    class="transition px-3 py-1 bg-blue-400 hover:bg-blue-600 text-white border-none"
    type="button"
    on:click={updateItem}>Modifier</button
  >
</div>
