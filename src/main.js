// TP 1 

const firstName = "Jérémy"

const lastName = "Riverain"

const age = 39

const hasLicense = true

console.log(firstName, lastName, age, hasLicense)

// TP 2

function display() {
  return `${lastName.toUpperCase()} ${firstName}`
}

console.log(display())

// TP 3

class Person {
  constructor(args) {
    this.firstName = args.firstName
    this.lastName = args.lastName
    this.age = args.age
  }

  toString () {
    return `${firstName} ${lastName}, ${age} years old`
  }
}

const person = new Person({firstName: 'Jérémy', lastName: 'Riverain', age: 39})

console.log(person)

console.log(person.toString())

class Child extends Person {
  constructor(args) {
    super(args)
    this.schoolLevel = args.schoolLevel
  }

  toString () {
    return `${super.toString()}, school level: ${this.schoolLevel}`
  }
}

const child = new Child({firstName: 'Foo', lastName: 'Bar', age: 10, schoolLevel: 'CP'})

console.log(child)
console.log(child.toString())


class Adult extends Person {

  #hasLicense 

  constructor(args) {
    super(args)
    this.#hasLicense = args.hasLicense
  }

  toString () {
    return `${super.toString()}, has license: ${this.#hasLicense}`
  }
}

const adult = new Adult({firstName: 'James', lastName: 'Bar', age: 100, hasLicense: true})

console.log(adult)

console.log(adult.toString())