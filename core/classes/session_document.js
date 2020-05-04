/** This object is stored in each session. It contains the DB Model instances for the user and the user's chat.
* @class SessionDocument - used to save the session inside the database */
class SessionDocument {
    /**
     * @constructor
     * @param {UserSchema} mongoUser - The model that represents the user in the database.
     * @param {ChatSchema} mongoChat - The model that represents the user's chat in the database.
     */
    constructor(mongoUser, mongoChat) {
        /** @private */
        this.mongoUser = mongoUser;
        /** @private */
        this.mongoChat = mongoChat;
    }
    /**
     * Get the user's saved context
     * @returns {string}
     */
    get context() {
        return this.mongoUser.context;
    }
    /**
     * Set the user's saved context
     * @param {string} newContext
     */
    set context(newContext) {
        this.mongoUser.context = newContext;
    }
    /**
     * Get the user's saved remembered information
     * @returns {string}
     */
    get remember() {
        return this.mongoUser.remember;
    }
    /**
     * Set the user's saved remembered information
     * @param {string} newRemember
     */
    set remember(newRemember) {
        this.mongoUser.remember = newRemember;
    }
    /**
     * Push a message to the list of user's' messages (used for analytics)
     * @param {number} messageId
     * @param {number} [senderId=this.mongoUser.id] senderId
     * @param {string} newContext
     */
    pushMessage({ messageId, senderId = this.mongoUser.id, date, text }) {
        this.mongoChat.messages.push({
            id: messageId,
            from: this.mongoChat.type === 'private' ? '' : senderId,
            date: date,
            text: text
        });
    }
    /** Function to save documents to the DB */
    async dbSave () {
        await this.mongoChat.save();
        await this.mongoUser.save();
    }
}

module.exports = SessionDocument;
