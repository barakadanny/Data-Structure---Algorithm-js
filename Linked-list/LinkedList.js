class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    const newNode = new Node(value);
    this.head = newNode;
    this.tail = this.head;
    this.length = 1;
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let previous = this.head;
    let current = this.head;

    while (current.next) {
      previous = current;
      current = current.next;
    }
    this.tail = previous;
    this.tail.next = null;
    this.length--;

    if (this.length == 0) {
      this.head = null;
      this.tail = null;
    }
    return current;
  }

  unshift(value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  shift() {
    if (!this.head) return undefined;
    let current = this.head;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
    current.next = null;
    return current;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    let temp = this.head;
    for (let i = 0; i < index; i++) {
      temp = temp.next;
    }
    return temp;
  }

  /*
   * Sets the value of the node at the specified index.
   * If the index is out of bounds, it returns false.
   * If the node exists, it updates its value and returns true.
   * @param {number}
   * @param {*} value - The value to set at the specified index.
   * @returns {boolean} - Returns true if the value was set, otherwise false.
   */
  set(index, value) {
    let nodeIndex = this.get(index);
    if (nodeIndex) {
      nodeIndex.value = value;
      return true;
    }
    return false;
  }

  /*
   * Inserts a new node at the specified index.
   * If the index is out of bounds, it returns false.
   * If the index is equal to the length, it calls push to add the new node at the end.
   * If the index is 0, it calls unshift to add the new node at the beginning.
   * Otherwise, it finds the node at the index - 1, sets the new node's next pointer,
   * and updates the next pointer of the previous node.
   */
  insert(index, value) {
    if (index < 0 || index > this.length) return false;

    if (index === this.length) return this.push(value);
    if (index === 0) return this.unshift(value);

    const newNode = new Node(value);
    const temp = this.get(index - 1);

    newNode.next = temp.next;
    temp.next = newNode;
    this.length++;
    return true;
  }

  /*
   * Removes a node at the specified index.
   * If the index is out of bounds, it returns null.
   * If the index is 0, it calls shift to remove the head.
   * If the index is the last node, it calls pop to remove the tail.
   * Otherwise, it finds the node at the index - 1, removes the next pointer,
   * and decrements the length of the list.
   * @param {number}
   * @returns {LinkedList|null} - Returns the modified linked list or null if index is invalid.
   */
  remove(index) {
    if (index < 0 || index >= this.length) return null;

    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }
    const temp = this.get(index - 1);
    delete temp.next;
    this.length--;
    return this;
  }

  /*
   * Reverses the linked list in place.
   * It swaps the head and tail, and then iterates through the list,
   * reversing the direction of the next pointers.
   */
  reverse() {
    const head = this.head;
    const tail = this.tail;
    this.head = tail;
    this.tail = head;
    let previous = null;
    let current = this.tail;
    let following = this.tail;
    while (current !== null) {
      following = following.next;
      current.next = previous;
      previous = current;
      current = following;
    }

    return this;
  }

  /*
   * Finds the middle node of the linked list.
   * It uses two pointers, slow and fast, to traverse the list.
   * The slow pointer moves one step at a time, while the fast pointer moves two steps.
   * When the fast pointer reaches the end, the slow pointer will be at the middle node.
   * @returns {Node|null} - Returns the middle node if it exists, otherwise null.
   */
  findMiddleNode() {
    if (!this.head) return null;
    let slowPointer = this.head;
    let fastPointer = this.head;
    while (fastPointer !== null && fastPointer.next !== null) {
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next.next;
    }
    return slowPointer;
  }

  /*
   * Detects if the linked list has a loop using Floyd's Cycle-Finding Algorithm.
   * It uses two pointers, slow and fast, to traverse the list at different speeds.
   * If they meet at some point, it indicates a loop exists.
   * @param {Node} head - The head of the linked list.
   * @returns {boolean} - Returns true if a loop is detected, otherwise false.
   * @example
   * const list = new LinkedList(1);
   * list.push(2);
   * list.push(3);
   * list.head.next.next.next = list.head; // Creates a loop
   * console.log(list.hasLoop()); // Output: true
   */
  hasLoop() {
    if (!this.head) return false;
    let slowPointer = this.head;
    let fastPointer = this.head;
    while (fastPointer !== null && fastPointer.next !== null) {
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next.next;
      if (slowPointer == fastPointer) {
        return true;
      }
    }
    return false;
  }

  /*
   * Finds the kth node from the end of the linked list.
   * It uses two pointers, slow and fast, to traverse the list.
   * The fast pointer moves k steps ahead, and then both pointers move together until the fast pointer reaches the end.
   * The slow pointer will be at the kth node from the end.
   * @param {number}
   * @returns {Node|null} - Returns the kth node from the end if it exists, otherwise null.
   * @example
   * const list = new LinkedList(1);
   * list.push(2);
   * list.push(3);
   * list.push(4);
   * console.log(list.findKthFromEnd(2)); // Output: Node with value 3
   */
  findKthFromEnd(k) {
    if (!this.head) return null;
    let slowPointer = this.head;
    let fastPointer = this.head;
    for (let i = 0; i < k; i++) {
      fastPointer = fastPointer.next;
    }
    while (fastPointer !== null) {
      fastPointer = fastPointer.next;
      slowPointer = slowPointer.next;
    }
    return slowPointer;
  }
}
