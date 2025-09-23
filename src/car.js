"use strict"

class Car {
    #distanceTraveled = 0;
    #speed = 0;

    get distanceTraveled() {
        return this.#distanceTraveled
    }

    constructor(brand, model, maxSpeed, acceleration) {
        this.brand = brand
        this.model = model
        this.maxSpeed = maxSpeed
        this.acceleration = acceleration
    }

    async start() {
        this.#speed = 0
        this.#distanceTraveled = 0
        console.log(`${this.brand} ${this.model} starts`)
        await this.accelerate()
    }

    async accelerate() {
        this.#speed = Math.min(this.#speed + this.acceleration, this.maxSpeed)
        console.log(`new speed by ${this.brand} ${this.model}: ${this.#speed}`)

        await new Promise((resolve) => {
            setTimeout(() => {
                this.#distanceTraveled += this.#speed / 3600
                resolve()
            }, 1000)
        })

        console.log(`distance traveled by ${this.brand} ${this.model}: ${this.#distanceTraveled}`)
    }

    stop() {
        this.#speed = 0
        this.acceleration = 0
    }



}

export const ferrari12cilindri = new Car('Ferrari', '12cilindri', 190, 20)

export const peugeot206 = new Car('Peugeot', '206', 180, 21)

export const renaultMaster = new Car('Renault', 'Master', 160, 18)

export const fiatPunto = new Car('Fiat', 'Punto', 187, 17)

export const opelCorsa = new Car('Opel', 'Corsa', 176, 15)

export const porscheCayenne = new Car('Porsche', 'Cayenne', 200, 16)

export class Race {
    constructor(firstCar, secondCar) {
        /**
         * @type {Car}
         */
        this.firstCar = firstCar
        /**
         * @type {Car}
         */
        this.secondCar = secondCar
    }

    get #isRaceEnded() {
        return this.firstCar.distanceTraveled >= 1 || this.secondCar.distanceTraveled >= 1
    }

    async play() {
        this.firstCar.start()
        this.secondCar.start()

        while (!this.#isRaceEnded) {
            await Promise.all([this.firstCar.accelerate(), this.secondCar.accelerate()])
        }

        if (this.#winner !== null) {
            console.log(`winner: ${this.#winner?.brand} ${this.#winner?.model}`)
            return;
        }

        console.log('ex aequo')
    }

    get #winner() {
        if (this.firstCar.distanceTraveled > this.secondCar.distanceTraveled) {
            return this.firstCar
        } else if (this.secondCar.distanceTraveled > this.secondCar.distanceTraveled) {
            return this.secondCar
        }
        return null // in case of ex aequo
    }

    /**
     * 
     * @param {Car[]} cars 
     */
    static pickTwoCars(cars) {
        const firstCarIndex = Math.ceil(Math.random() * (cars.length - 1))
        const firstCar = cars[firstCarIndex]
        const newCars = cars.toSpliced(firstCarIndex, 1)

        const secondCar = newCars[Math.ceil(Math.random() * (newCars.length - 1))]

        return [firstCar, secondCar]
    }
}

