//This object is stored in each session. It contains the DB Model instances for the user and the user's chat.
module.exports = class SessionDocument {
    constructor(mongoUser, mongoChat) {
        this.mongoUser = mongoUser;
        this.mongoChat = mongoChat;
    }
    get context() {
        return this.mongoUser.context;
    }
    set context(newContext) {
        this.mongoUser.context = newContext;
    }
    get remember() {
        return this.mongoUser.remember;
    }
    set remember(newRemember) {
        this.mongoUser.remember = newRemember;
    }
    pushMessage({ messageId, senderId = this.mongoUser.id, date, text }) {
        this.mongoChat.messages.push({
            id: messageId,
            from: this.mongoChat.type === 'private' ? '' : senderId,
            date: date,
            text: text
        });
    }
    async dbSave () {
        await this.mongoChat.save();
        await this.mongoUser.save();
    }
};
