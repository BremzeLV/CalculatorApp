export enum Calculations { 
    Plus, 
    Minus,
    Divide,
    Multiply
}

export enum InputStep {
    First,
    Second,
    Answer
}

export interface CalculatorScreenState {
    input: {
        [InputStep.First]: string,
        [InputStep.Second]: string,
        [InputStep.Answer]: string
    }
    inputStep: InputStep
    calculation: Calculations | undefined
}