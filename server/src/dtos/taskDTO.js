export default class TaskDTO {
    id;
    name;
    email;
    text;
    status;
    wasUpdated;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.text = model.text;
        this.status = model.status;
        this.wasUpdated = model.wasUpdated;
    }
}