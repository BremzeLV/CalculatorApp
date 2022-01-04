import React, { Component, ReactElement } from 'react'

import { Box, VStack, HStack, Button, Heading, Text } from "native-base"

import { Calculations, CalculatorScreenState, InputStep } from './Calculator.types';

export default class CalculatorScreen extends Component {
    state: CalculatorScreenState = {
        input: {
            [InputStep.First]: '0',
            [InputStep.Second]: '0',
            [InputStep.Answer]: '0',
        },
        inputStep: InputStep.First,
        calculation: undefined,
    }

    onInputChange = (value: string): void => {
        const input = this.state.input[this.state.inputStep]

        if (input === '0') {
            this.setState((prevState: CalculatorScreenState) => ({
                ...prevState,
                input: {
                    ...prevState.input,
                    [prevState.inputStep]: value
                }
            }));
            return
        }

        this.setState((prevState: CalculatorScreenState) => ({
            ...prevState,
            input: {
                ...prevState.input,
                [prevState.inputStep]: input + value
            }
        }));
    }

    onInputClear = (): void => {
        this.setState({
            input: {
                [InputStep.First]: '0',
                [InputStep.Second]: '0',
                [InputStep.Answer]: '0'
            },
            inputStep: InputStep.First,
            calculation: undefined
        })
    }

    onCalculationChange = (calculation: Calculations): void => {
        // if we want to continue after the answer
        if(this.state.inputStep === InputStep.Answer) {
            this.setState((prevState: CalculatorScreenState) => ({
                calculation,
                input: {
                    [InputStep.First]: prevState.input[InputStep.Answer],
                    [InputStep.Second]: '0',
                    [InputStep.Answer]: '0',
                },
                inputStep: InputStep.Second,
            }))
        }

        this.setState({
            calculation,
            inputStep: InputStep.Second,
        });
    }

    onCalculation = (): void => {
        const { input, calculation } = this.state

        let endResult = 0
        const parsedInput0 = parseFloat(input[InputStep.First])
        const parsedInput1 = parseFloat(input[InputStep.Second])

        switch (calculation) {
            case Calculations.Plus:
                endResult = parsedInput0 + parsedInput1
                break;
            case Calculations.Minus:
                endResult = parsedInput0 - parsedInput1
                break;
            case Calculations.Multiply:
                endResult = parsedInput0 * parsedInput1
                break;
            case Calculations.Divide:
                endResult = parsedInput0 / parsedInput1
                break;
        }

        this.setState((prevState: CalculatorScreenState) => ({
            ...prevState,
            input: {
                ...prevState.input,
                [InputStep.Answer]: endResult.toString()
            },
            inputStep: InputStep.Answer,
            calculation: undefined
        }))
    }

    onNumberSwitch = (): void => {
        if (
            this.state.inputStep === InputStep.First ||
            this.state.inputStep === InputStep.Second
        ) {
            const input = this.state.input[this.state.inputStep]

            this.setState((prevState: CalculatorScreenState) => ({
                ...prevState,
                input: {
                    ...prevState.input,
                    [prevState.inputStep]: (parseFloat(input) * (-1)).toString()
                }
            }));
        }
    }

    render(): ReactElement {
        const { input, inputStep, calculation } = this.state
        return (
            <Box m="6">
                <Heading style={{ textAlign: 'right' }}>{input[inputStep]}</Heading>
                <VStack space={2} w="100%">
                    <HStack space={2}>
                        <Button w='1/3' onPress={() => this.onInputChange('1')}>1</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('2')}>2</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('3')}>3</Button>
                    </HStack>
                    <HStack space={2}>
                        <Button w='1/3' onPress={() => this.onInputChange('4')}>4</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('5')}>5</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('6')}>6</Button>
                    </HStack>
                    <HStack space={2}>
                        <Button w='1/3' onPress={() => this.onInputChange('7')}>7</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('8')}>8</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('9')}>9</Button>
                    </HStack>
                    <HStack space={2}>
                        <Button w='1/3' onPress={() => this.onNumberSwitch()}>+/-</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('0')}>0</Button>
                        <Button w='1/3' onPress={() => this.onInputChange('.')}>.</Button>
                    </HStack>
                    <HStack space={2}>
                        <Button
                            w='1/3'
                            variant={calculation === Calculations.Plus ? 'subtle' : 'solid'}
                            onPress={() => this.onCalculationChange(Calculations.Plus)}
                        >
                            +
                        </Button>
                        <Button
                            w='1/3'
                            variant={calculation === Calculations.Minus ? 'subtle' : 'solid'}
                            onPress={() => this.onCalculationChange(Calculations.Minus)}
                        >
                            -
                        </Button>
                        <Button
                            w='1/3'
                            variant={calculation === Calculations.Multiply ? 'subtle' : 'solid'}
                            onPress={() => this.onCalculationChange(Calculations.Multiply)}
                        >
                            *
                        </Button>
                    </HStack>
                    <HStack space={2}>
                        <Button
                            w='1/3'
                            variant={calculation === Calculations.Divide ? 'subtle' : 'solid'}
                            onPress={() => this.onCalculationChange(Calculations.Divide)}
                        >
                            /
                        </Button>
                        <Button w='1/3' onPress={() => this.onCalculation()} colorScheme="secondary">
                            =
                        </Button>
                        <Button w='1/3' onPress={this.onInputClear}>Clear</Button>
                    </HStack>
                </VStack>
            </Box>
        )
    }
}