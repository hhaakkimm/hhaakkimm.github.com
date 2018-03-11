#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

#define NAME_SIZE	256

// structure for one node in the linked list
typedef struct node_struct {
	int age;
	char name[NAME_SIZE];
	struct node_struct *next;
    struct node_struct *previous;
} Node;

// enumerated type for valid operations
typedef enum operation_enum {
	NEW = 1, FIND, DISPLAY_ASC, DISPLAY_DESC, QUIT
} Operation;

/*
 * Insert a node into a single linked list.  The list is maintained in
 * ascending order by age.  If there are multiple nodes with the same age,
 * the node is inserted before the first node with the same age.  If the new
 * node is inserted before the first node in the list, head_ptr is changed
 * to point to the new node.  Input pointers are assumed to be non-null.
 *
 * Parameters:
 *		in/out: head_ptr - pointer to a pointer to the first node in the list
 *		in: node - the node to insert into the list
 *
 * Returns n/a
 */
void insert_node(Node **head_ptr, Node **last_ptr, Node *node)
{
	if(!(*head_ptr)) {
		// list is empty
		*head_ptr = node;
        *last_ptr = node;
		return;
	}

	Node *current = *head_ptr;
	Node *prev = NULL;

	// Find the first node whose age is greater or equal to the age in the insertion node
	while(current && node->age > current->age) {
        prev = current;
		current = current->next;
	}

	if(!current) {
		// node goes at the end of the list
		prev->next = node;
        node->previous = prev;
        *last_ptr = node;
		return;
	}

	// insert the after previous and before current
	if(prev) {
		// node goes somewhere in the middle of the list
        prev->next = node;
        current->previous = node;
		node->next = current;
        node->previous = prev;
	} else {
		// node goes before the first node in the list
		node->next = current;
        current->previous = node;
		*head_ptr = node;
	}

	return;
}

/*
 * Find the first node in the list with the specified age.  Assumes the list is
 * in ascending order by age.
 *
 * Parameters:
 *		in: head - pointer to the first node in the list
 *		in: age - age to search for
 *
 * Returns: Pointer to the first node in the list that matches the age.  Returns
 *			NULL if not found.
 */
Node *find_node(Node *head, const int age)
{
	Node *np = head;
	while(np && np->age != age) {
		np = np->next;
	}

	if(!np) {
		fprintf(stdout, "%d not found\n\n", age);
	}
	return np;
}

/*
 * Display a node.
 *
 * Parameters:
 *		in: node - the node to display
 *
 * Returns n/a
 */
void display_node(Node *node)
{
	fprintf(stdout, "%d, %s", node->age, node->name);
	return;
}

/*
 * Display a linked list in order as indicated by the parameter.
 *
 * Parameters:
 *		in: head - first node in the list
 *		in: op - the operation (one of DISPLAY_ASC or DISPLAY_DESC)
 *
 * Returns n/a
 */
void display_list(Node *head, Node *last, Operation op)
{
	Node *current;
	if(op == DISPLAY_ASC) {
		for (current = head; current; current = current->next) {
			display_node(current);
		}
	} else {
        for (current = last; current; current = current->previous) {
			display_node(current);
		}
	}

	return;
}

/*
 * Create a new node.  The "next" member is initialized to NULL, other members are
 * set according to the parameters.
 *
 * Parameters:
 *		in: age - the value to store in the age field of the node
 *		in: name - the name to store in the name field of the node
 *
 * Returns a pointer to a Node.  Node.next is intialized to NULL
 */
Node *new_node(const int age, const char *name)
{
	Node *new = (Node *)malloc(sizeof(Node));
	if (!new) {
		fprintf(stderr, "Unable to allocate memory for new node\n");
		return NULL;
	}

	new->age = age;
	strncpy(new->name, name, NAME_SIZE);
	new->next = NULL;
    new->previous = NULL;
	return new;
}

/*
 * Get user input including an operation and data associated with that operation, if any.
 *
 * Parameters:
 * 		out: operation - the operation the user wants
 *		out: age if the operation was insert or find, else undefined
 *		out: name if the operation was insert or find, else undefined
 *
 * The name parameter must be a pointer to memory sufficiently large to hold NAME_SIZE
 * characters (including null character at the end).
 *
 * Returns: false if success, else true
 */
bool get_operation(Operation *operation, int *age, char *name)
{
	const char prompt[] = "Enter an option:\n\t1) Add node\n\t2) Find node\n\t3) display ascending\n\t4) display descending\n\t5) Quit\n-> ";
	char input[NAME_SIZE];

	bool invalid_operation = true;
	while (invalid_operation) {

		fprintf(stdout, prompt);

		// get the option number from the user's input
		int op;
		if (fgets(input, NAME_SIZE, stdin) && sscanf(input, "%d", &op) == 1) {
			*operation = op;
			switch(op) {
				case NEW:
					// Need both age and name
					fprintf(stdout, "Age: ");
					if (!fgets(input, NAME_SIZE, stdin) || sscanf(input, "%d", age) != 1) {
						fprintf(stdout, "Age must be an integer\n");
						break;
					}
					fprintf(stdout, "Name: ");
					if (!fgets(name, NAME_SIZE, stdin)) {
						fprintf(stderr, "Error reading name from stdin\n");
						break;
					}
					invalid_operation = false;
					break;

				case FIND:
					// Only need age
					fprintf(stdout, "Age: ");
					if (!fgets(input, NAME_SIZE, stdin) || sscanf(input, "%d", age) != 1) {
						fprintf(stdout, "Age must be an integer\n");
						break;
					}
					invalid_operation = false;
					break;

				case DISPLAY_ASC:
				case DISPLAY_DESC:
					// no additional information needed
					invalid_operation = false;
					break;

				case QUIT:
					return true;

				default:
					fprintf(stdout, "Invalid option\n\n");
					break;
			} // end switch
		} else {
			fprintf(stdout, "Invalid option\n");
		}
	} // end while

	return false;
}

/*
 * Repeatedly prompt the user for an operation and perform the operation.
 *
 * Parameters: n/a
 *
 * Returns:
 *		0 on success, else 1
 */
int main(void)
{
	Node *head = NULL;		// pointer to the first node in the linked list
    Node *last = NULL;
	Node *node;
	Operation op;
	int age;
	char name[NAME_SIZE];

	while (!get_operation(&op, &age, name)) {

		switch(op) {
			case NEW:
				// Create a new node and insert it into the list
				node = new_node(age, name);
				insert_node(&head, &last, node);
				break;

			case FIND:
				// Display all nodes containing the specified age
				node = find_node(head, age);
				while(node && node->age == age) {
					display_node(node);
					node = node->next;
				}
				break;

			case DISPLAY_ASC:
			case DISPLAY_DESC:
				// Display the entire linked list in the specified order
				display_list(head, last, op);
				break;

			case QUIT:
				return 0;

			default: break;		// don't need, but here to avoid compiler warning
		} // end switch
	} // end while

	// if we get here, it's because there was an error reading input
	return 1;
}
