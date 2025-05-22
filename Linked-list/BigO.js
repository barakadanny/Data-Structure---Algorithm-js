console.log(`
  Big O Notation Comparison: Linked List vs Arrays
  ----------------------------------------------------
  | Operation        | Linked List | Arrays          |
  |------------------|-------------|-----------------|
  | Push             | O(1)        | O(1)*           |
  | Pop              | O(n)        | O(1)            |
  | Shift            | O(1)        | O(n)            |
  | Unshift          | O(1)        | O(n)            |
  | Insert (middle)  | O(n)        | O(n)            |
  | Delete (middle)  | O(n)        | O(n)            |
  | Lookup by Index  | O(n)        | O(1)            |
  | Lookup by Value  | O(n)        | O(n)            |
  ----------------------------------------------------
  *: O(1) amortized when space available, O(n) when resizing needed
  `);

/* 
 Which data structure is better?
  It depends on the use case. what you need to do with the data.
*/
