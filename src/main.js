// TP 1 

// import { Race, ferrari12cilindri, fiatPunto, opelCorsa, peugeot206, porscheCayenne, renaultMaster } from "./car"

import { filter } from 'lodash'

import dayjs from 'dayjs'

console.log('--- TP 1 ---')

const firstName = "Jérémy"

const lastName = "Riverain"

const age = 39

const hasLicense = true

console.log(firstName, lastName, age, hasLicense)

// TP 2

console.log('--- TP 2 ---')

function display() {
  return `${lastName.toUpperCase()} ${firstName}`
}

console.log(display())

// TP 3

console.log('--- TP 3 ---')

class Person {
  constructor(args) {
    this.firstName = args.firstName
    this.lastName = args.lastName
    this.age = args.age
  }

  toString() {
    return `${firstName} ${lastName}, ${age} years old`
  }
}

const person = new Person({ firstName: 'Jérémy', lastName: 'Riverain', age: 39 })

console.log(person)

console.log(person.toString())

class Child extends Person {
  constructor(args) {
    super(args)
    this.schoolLevel = args.schoolLevel
  }

  toString() {
    return `${super.toString()}, school level: ${this.schoolLevel}`
  }
}

const child = new Child({ firstName: 'Foo', lastName: 'Bar', age: 10, schoolLevel: 'CP' })

console.log(child)
console.log(child.toString())


class Adult extends Person {

  #hasLicense

  constructor(args) {
    super(args)
    this.#hasLicense = args.hasLicense
  }

  toString() {
    return `${super.toString()}, has license: ${this.#hasLicense}`
  }

  get hasLicense() {
    return this.#hasLicense
  }
}

const adult = new Adult({ firstName: 'James', lastName: 'Bar', age: 100, hasLicense: true })

console.log(adult)

console.log(adult.toString())

// TP 3 - Prototype

// function Person (args) {
//     this.firstName = args?.firstName
//     this.lastName = args?.lastName
//     this.age = args?.age
// }

// const person = new Person({firstName: 'Jérémy', lastName: 'Riverain', age: 39})

// console.log(person)

// Person.prototype.toString = function () {
//   return `${this.firstName} ${this.lastName}, ${this.age} years old`
// }

// console.log(person.toString())

// function Child(args) {
//   this.schoolLevel = args.schoolLevel
//   Person.call(this, args)
// }

// Child.prototype = new Person()

// Child.prototype.toString = function() {
//   return `${Person.prototype.toString.call(this)}, at school in ${this.schoolLevel}`
// }

// const child = new Child({firstName: 'Foo', lastName: 'Bar', age: 6, schoolLevel: 'CP'})

// console.log(child)

// console.log(child.toString())

// TP 4

console.log('--- TP 4 ---')

const persons = [person, child, adult]

for (const person of persons) {
  console.log(person)
}

console.log('display even elements')

for (let index = 0; index < persons.length; index++) {
  if (index % 2 === 0) {
    console.log(persons[index])
  }

}

// // TP 5

// console.log('--- TP 5 ---')

// async function displayPersons(persons) {
//   for (let index = 0; index < persons.length; index++) {
//     await new Promise((resolve) => {
//       setTimeout(function () {
//         const person = persons[index];
//         console.log(person)
//         resolve()
//       }, 1000)
//     })
//   }
// }

// (async () => {
//   await displayPersons(persons)
// })();


// // TP 6

// console.log('--- TP 6 ---')

// async function displayPersonsWithException(persons) {
//   for (let index = 0; index < persons.length; index++) {

//     try {
//       await new Promise((resolve, reject) => {
//         setTimeout(function () {
//           const person = persons[index];
//           if (person instanceof Child) {
//             reject('child found')
//           }
//           console.log(`tp6, ${person}`)
//           resolve()


//         }, 1000)
//       })
//     } catch (error) {
//       console.error(error)
//     }

//   }
// }

// (async () => {
//   await displayPersonsWithException(persons)
// })();

// TP 7

console.log('=== TP 7 ===')

/**
 * @param {Person} person 
 */
function isAdult(person) {
  return person.age >= 18
}

/**
 * @param {Person[]} persons 
 */
function findAdults(persons) {
  return persons.filter(isAdult)
}

/**
 * @param {Person[]} persons 
 */
function lodashFindAdults(persons) {
  return filter(persons, isAdult)
}

console.log(findAdults(persons))
console.log(lodashFindAdults(persons))

/**
 * 
 * @param {Person[]} persons 
 */
function groupByLicense(persons) {
  const map = new Map()

  map.set(true, persons.filter(p => p instanceof Adult && p.hasLicense))
  map.set(false, persons.filter(p => !(p instanceof Adult) || !p.hasLicense))
  return map
}

console.log(groupByLicense(persons))

/**
 * 
 * @param {Person[]} persons 
 */
function incrementAge(persons) {
  return persons.forEach((p) => {
    p.age += 1
  })
}

const newPersons = structuredClone(persons)

incrementAge(newPersons)

console.log(newPersons)

/**
 * 
 * @param {Person} person 
 */
function findBirthDate(person) {
  const now = dayjs()
  const birthDate = now.subtract(person.age, 'year')
  return birthDate
}

console.log(findBirthDate(person))

/**
 * 
 * @param {Person[]} persons 
 */
function bonus(persons) {
  return persons.filter(p => p.firstName.length > 4).reduce((prev, curr, index, values) => {
    const sum = prev + curr.age
    if (values.length - 1 == index) {
      return sum / values.length
    }
    return sum
  }, 0)
}

console.log(bonus(persons))

// // TP 8

// console.log('=== TP 8 ===')

//   ; (async () => {
//     const race = new Race(...Race.pickTwoCars([fiatPunto, porscheCayenne, renaultMaster, ferrari12cilindri, opelCorsa, peugeot206]))
//     await race.play()
//   })()