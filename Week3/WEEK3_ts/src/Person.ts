export class Person {
    public name: string;
    public age: number;
    public occupation: string
    private salary:number

    constructor(name: string, age: number, occupation: string, salary=0 ){
        this.name = name;
        this.age = age;
        this.occupation = occupation
        this.salary = salary

    }

    introduce(): string  {
        return `Hello, my name is ${this.name} and I am a ${this.occupation}. I earn ${this.salary}$`
    }

    incrementAge(): void {
        this.age++;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary
    }

}

 const me = new Person("Thomas",54, "Student")
 console.log(me.introduce())

 console.log(me.age);
 me.incrementAge()
 console.log(me.age);
 me.setSalary(1000)
 console.log(me.getSalary())
 console.log(me.introduce())

