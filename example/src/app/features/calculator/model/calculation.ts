import { Freezed } from "ts-bloc";

/** The action taken in a Calculation */
enum Operation {
    None = "none",
    Add = "add",
    Subtract = "subtract",
    Multiply = "multiply",
    Divide = "divide"
}

/** An arithmetic calculation of tho numbers */

@Freezed
class Calculation {
    constructor(
        public readonly firstNumber: number,
        public readonly secondNumber: number,
        public readonly operation: Operation,
        public readonly result: number
    ) {
        Object.freeze(this);
    }

    /** Instantiate a Calculation object from a JSON */
    static fromJson(json: Map<String, any>): Calculation {
        return new Calculation(
            Number(json.get("firstNumber")),
            Number(json.get("secondNumber")),
            _fromStringMakeOperation(json.get("operation")),
            Number(json.get("result"))
        );
    }

    copyWith(
        {
            operation,
            firstNumber,
            secondNumber,
            result
        }: {
            operation?: Operation;
            firstNumber?: number;
            secondNumber?: number;
            result?: number;
        } = {},
    ) {
        return new Calculation(
            firstNumber || this.firstNumber,
            secondNumber || this.secondNumber,
            operation || this.operation,
            result || this.result,
        );
    }

}
/** Instantiate Operation from a String */
function _fromStringMakeOperation(operation: String): Operation {
    switch (operation) {
        case "add":
            return Operation.Add;
        case "subtract":
            return Operation.Subtract;
        case "multiply":
            return Operation.Multiply;
        case "divide":
            return Operation.Divide;
        default:
            return Operation.None;
    }
}

export { Operation, Calculation };