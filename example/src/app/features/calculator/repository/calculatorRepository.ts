import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
class CalculatorRepository implements CalculatorRepository {
    save(): Promise<void> {
        return Promise.resolve();
    }
}

export { CalculatorRepository };