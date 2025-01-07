module.exports =  class generateQueryForUserRequest{
    id;
    email;
    constructor(model) {
        this.id = model._id;
        this.email=model.email
    }
}
