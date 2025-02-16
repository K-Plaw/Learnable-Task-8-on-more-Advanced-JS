const readline = require("readline");

// Telephone Class with Observer Pattern
class Telephone {
    constructor() {
        this.phoneNumbers = new Set(); // Store unique phone numbers
        this.observers = []; // List of observers
    }

    // Add a phone number
    AddPhoneNumber(phoneNumber) {
        this.phoneNumbers.add(phoneNumber);
        console.log(`Phone number ${phoneNumber} added.`);
    }

    // Removes a phone number
    RemovePhoneNumber(phoneNumber) {
        if (this.phoneNumbers.has(phoneNumber)) {
            this.phoneNumbers.delete(phoneNumber);
            console.log(`Phone number ${phoneNumber} removed.`);
        } else {
            console.log(`Phone number ${phoneNumber} not found.`);
        }
    }

    // View all phone numbers
    ViewPhonebook() {
        console.log("\n--- Phonebook ---");
        if (this.phoneNumbers.size === 0) {
            console.log("Phonebook is empty.");
        } else {
            this.phoneNumbers.forEach(number => console.log(number));
        }
        console.log("-----------------\n");
    }

    // Dials a phone number and notify observers
    DialPhoneNumber(phoneNumber) {
        if (this.phoneNumbers.has(phoneNumber)) {
            console.log(`Dialing ${phoneNumber}...`);
            this.notifyObservers(phoneNumber);
            console.log("Call has ended");
        } else {
            console.log(`Phone number ${phoneNumber} is not in the directory.`);
        }
    }

    // Observer Pattern Methods
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(phoneNumber) {
        this.observers.forEach(observer => observer.update(phoneNumber));
    }
}

// Observer Class
class Observer {
    constructor(name) {
        this.name = name;
    }

    update(phoneNumber) {
        console.log(`${this.name} received update: ${phoneNumber}`);
    }
}



// Create the readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Create the Telephone instance
const phone = new Telephone();

// Create Observer 1 (Prints phone number)
const observer1 = new Observer("Observer 1");

// Create Observer 2 for "Now dialing (number)"
const observer2 = {
    update: (phoneNumber) => console.log(`Now dialing ${phoneNumber}`)
};

// Attach both observers
phone.addObserver(observer1);
phone.addObserver(observer2);

function askUser() {
    console.log("\nPLAW's Telecom Services - PTS, Nigeria");
    rl.question("Choose an action (add, remove, dial, phonebook, exit): ", (action) => {
        if (action === "exit") {
            console.log("Goodbye!");
            rl.close();
            return;
        }

        if (action === "phonebook") {
            phone.ViewPhonebook();
            askUser(); // Shows the menu again
            return;
        }

        rl.question("Enter phone number: ", (number) => {
            // Validate that the input is a valid number
            if (!/^\d+$/.test(number)) {
                console.log("Invalid phone number. Please enter digits only.");
                askUser();  // Restart the process
                return;
            }

            if (action === "add") {
                phone.AddPhoneNumber(number);
            } else if (action === "remove") {
                phone.RemovePhoneNumber(number);
            } else if (action === "dial") {
                phone.DialPhoneNumber(number);
            } else {
                console.log("Invalid action.");
            }

            askUser(); // Continue prompting the user
        });
    });
}

// Start the user interaction
askUser();
