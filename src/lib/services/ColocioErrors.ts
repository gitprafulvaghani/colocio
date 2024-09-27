// Base custom Error class
export class ColocioError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ColocioError";
        this.message = message;
    }
}

export class DatabaseError extends ColocioError {
    constructor(message: string) {
        super(message);
        this.name = "ColocioDatabaseError";
        this.message = message;
    }
}

export class AuthenticationError extends ColocioError {
    constructor(message: string) {
        super(message);
        this.name = "ColocioDatabaseError";
        this.message = message;
    }
}

export class AccountError extends ColocioError {
    constructor(message: string) {
        super(message);
        this.name = "ColocioAccountError";
        this.message = message;
    }
}