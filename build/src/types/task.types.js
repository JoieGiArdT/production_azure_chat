"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTask = void 0;
class SchemaTask {
    constructor(externalId, typeTask, sequenceTask) {
        this.task = {
            external_id: externalId,
            type_task: typeTask,
            timestamp: null,
            status: 'PENDING',
            sequence_task: sequenceTask
        };
    }
}
exports.SchemaTask = SchemaTask;
