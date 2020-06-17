class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} falando...`);
    }
}

class Dog extends Animal {
    constructor(name, type) {
        super(name);
        this.type = type;
    }

    speak() {
        console.log(`${this.name}(${this.type}) latindo...`);
    }
}

const animal = new Animal("Gato");
const dog = new Dog("Marley", "viralata");
dog.speak();
