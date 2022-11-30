/** The action taken in a Calculation */
enum Operation {
    None,
    Add,
    Subtract,
    Multiply,
    Divide
}

/** An arithmetic calculation of tho numbers */
class Calculation {
    constructor(
        public readonly firstNumber: Number,
        public readonly secondNumber: Number,
        public readonly operation: Operation,
        public readonly result: Number
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
