import { State } from './types/constants';

class StateComparator {
    /**
     * Compares two states
     * 
     * @param state1 State 1
     * @param state2 State 2
     * @returns true if the two states are the same
     */
    static compare (state1: State, state2: State) {
        return Object.getOwnPropertyNames(state1)
            .map((key: string) => {
                return (state1 as any)[key] === (state2 as any)[key]
            }).every((val) => val)
    }
}

export default StateComparator