import { writable, derived } from "svelte/store";

export const categories = [
  {
    id: "hobbies",
    label: "Loisirs",
    color: "rgb(223, 20, 212)",
  },
  {
    id: "food",
    label: "Nourriture",
    color: "rgb(223, 78, 20)",
  },
  {
    id: "transport",
    label: "Transport",
    color: "rgb(91, 12, 122)",
  },
  {
    id: "house",
    label: "Maison",
    color: "rgb(21, 122, 12)",
  },
  {
    id: "baby",
    label: "Bébé",
    color: "rgb(202, 155, 0)",
  },
];

export const INCOME_TYPE = {
  INCOME: "income",
  EXPENSE: "expense",
};

const defaultItem = [
  {
    id: generateId(),
    name: "Pharmacie",
    value: 50,
    incomeType: INCOME_TYPE.EXPENSE,
    category: "house",
  },
  {
    id: generateId(),
    name: "Plein carburant",
    value: 150,
    incomeType: INCOME_TYPE.EXPENSE,
    category: "transport",
  },
];

const { subscribe, update } = writable(defaultItem);

// Store
export const budgetItems = {
  add: ({ name, incomeType, value, category }) => {
    update((budgetItem) => [
      ...budgetItem,
      { id: generateId(), name, incomeType, value, category },
    ]);
  },
  remove: (itemId) =>
    update((budgetItems) => budgetItems.filter((item) => item.id !== itemId)),
  updateItem: (updateItem) =>
    update((budgetItems) =>
      budgetItems.map((item) => (updateItem.id === item.id ? updateItem : item))
    ),
  subscribe,
};

// Derivated
export const globalTotal = derived(budgetItems, ($budgetItems) =>
  $budgetItems.reduce((total, item) => {
    if (INCOME_TYPE.INCOME === item.incomeType) {
      return total + parseFloat(item.value);
    }
    return total - parseFloat(item.value);
  }, 0)
);

export const totalExpenses = derived(budgetItems, ($budgetItems) =>
  $budgetItems.reduce((total, item) => {
    if (INCOME_TYPE.INCOME !== item.incomeType) {
      return total - parseFloat(item.value);
    }
    return total;
  }, 0)
);

export const totalIncome = derived(budgetItems, ($budgetItems) =>
  $budgetItems.reduce((total, item) => {
    if (INCOME_TYPE.INCOME === item.incomeType) {
      return total + parseFloat(item.value);
    }
    return total;
  }, 0)
);

export const expensesPieData = derived(budgetItems, ($budgetItems) =>
  $budgetItems.reduce(
    (stats, item) => {
      const index = stats.labels.indexOf(item.category);

      if (INCOME_TYPE.EXPENSE === item.incomeType) {
        if (index > -1) {
          stats.data[index] += item.value;
          return {
            labels: stats.labels,
            backgroundColor: stats.backgroundColor,
            data: stats.data,
          };
        } else {
          return {
            labels: [...stats.labels, item.category],
            backgroundColor: [
              ...stats.backgroundColor,
              categories.find((cat) => cat.id === item.category).color,
            ],
            data: [...stats.data, item.value],
          };
        }
      }
    },
    {
      labels: [],
      backgroundColor: [],
      data: [],
    }
  )
);

// Utilities
function generateId() {
  return Date.now() + "" + Math.random();
}
