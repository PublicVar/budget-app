<script>
  import { budgetItems, categories } from "./store";

  //subscribe to store
  $budgetItems;

  let selectedCategory;
  let incomeType = "expense";
  let name;
  let value = 0;

  function handleSubmit() {
    if (isValid()) {
      budgetItems.add({
        category: selectedCategory,
        incomeType,
        name,
        value,
      });

      selectedCategory = "";
      incomeType = "expense";
      name = "";
      value = 0;
    }
  }

  function isValid() {
    return name && value;
  }

  function handleSelectIncome() {
    if (!name || "" === name) {
      name = "Salaire";
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="type">
    <input
      type="radio"
      id="addBudgetItemIncomeType"
      name="income-type"
      bind:group={incomeType}
      value={"income"}
      on:change={handleSelectIncome}
    />
    <label for="addBudgetItemIncomeType">Revenus</label>
    <input
      type="radio"
      id="addBudgetItemCreditType"
      name="credit-type"
      bind:group={incomeType}
      value={"expense"}
    />
    <label for="addBudgetItemExpenseType">Dépenses</label>
  </div>
  <label for="budgetItemName">Nom</label>
  <input type="text" name="name" id="addBudgetItemName" bind:value={name} />
  <label for="addBudgetItemAmount">Valeur</label>
  <div class="amount">
    <input
      type="number"
      id="addBudgetItemAmount"
      name="amount"
      placeholder="0.00"
      bind:value
    />
    <div class="currency">€</div>
  </div>

  <label for="addBudgetItemCategory">Type</label>
  <select bind:value={selectedCategory} name="type" id="addBudgetItemCategory">
    <option selected />
    {#each categories as category (category.id)}
      <option value={category.id}>{category.label}</option>
    {/each}
  </select>
  <div class="button-container">
    <button type="submit">Ajouter</button>
  </div>
</form>

<style>
  .type {
    padding: 0.5em 0;
  }

  .type input {
    width: auto;
  }
  .type label,
  .type input {
    display: inline-block;
    padding: 0 0.25em 0 0.5em;
    height: auto;
  }

  .type input:checked + label {
    font-weight: bold;
  }
  input,
  select {
    width: 100%;
    height: 2em;
    font-size: 1.5em;
  }
  label {
    margin: 0.5em 0;
  }
  .amount {
    display: flex;
  }
  .currency {
    font-size: 3em;
    padding-left: 10px;
  }
  button {
    margin: 0.7em 0;
    padding: 1em 0;
    width: 100%;
    background-color: rgb(82, 55, 236);
    color: #fff;
  }
  .button-container {
    display: flex;
    justify-content: center;
  }
</style>
