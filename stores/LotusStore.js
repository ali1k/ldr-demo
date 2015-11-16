import {BaseStore} from 'fluxible/addons';

class LotusStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.cleanAll();
    }
    lookupLotus(payload) {
        this.suggestions = payload.suggestions;
        this.isComplete = 1;
        this.emitChange();
    }
    cleanAll() {
        this.suggestions = {};
        this.isComplete = 1;
    }
    startTask () {
        this.isComplete = 0;
        this.emitChange();
    }
    getState() {
        return {
            suggestions: this.suggestions,
            isComplete: this.isComplete
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.suggestions = state.suggestions;
    }
}

LotusStore.storeName = 'LotusStore'; // PR open in dispatchr to remove this need
LotusStore.handlers = {
    'START_TASK_LOTUS': 'startTask',
    'LOTUS_SEARCH_SUCCESS': 'lookupLotus'
};

export default LotusStore;
