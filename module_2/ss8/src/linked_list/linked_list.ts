export class Node<T> {
    data: T;
    next: Node<T> | null = null;

    constructor(data: T) {
        this.data = data;
    }

    getData(): T {
        return this.data;
    }
}

export class LinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;

    private size: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    insertFirstNode(data: T) {
        let node = new Node(data);
        node.next = this.head;
        this.head = node;

        if (!this.tail) {
            this.tail = node
        }
        this.size++;
    }

    insertLastNode(data: T) {
        if (!this.head) {
            this.insertFirstNode(data);
        } else {
            let node = new Node(data);
            if (this.tail) {
                this.tail.next = node;
                this.tail = node;
                this.size++;
            }
        }
    }

    getSize() {
        return this.size;
    }

    get(index: number): Node<T> | null {
        let temp = this.head;
        if (temp && index >= 0 && index < this.size) {
            for (let i = 0; i < index; i++) {
                if (temp) {
                    temp = temp.next;
                }
            }
            return temp;
        } else {
            throw new Error("Nhập không đúng");
        }
    }
}
