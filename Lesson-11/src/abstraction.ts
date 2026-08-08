export interface IContact {
    name: string;
    email: string;
    getContactCard(): string;
}

export abstract class Contact implements IContact {
    private static instanceCount = 0;

    public static get contactCount(): number {
        return Contact.instanceCount;
    }

    protected constructor(
        public readonly name: string,
        public readonly email: string
    ) {
        Contact.instanceCount++;
    }

    public abstract getContactCard(): string;

    protected formatHeader(): string {
        return `${this.name} <${this.email}>`;
    }
}

export class PersonContact extends Contact {
    public constructor(name: string, email: string, private readonly phone: string) {
        super(name, email);
    }

    public getContactCard(): string {
        return `${this.formatHeader()}\nPhone: ${this.phone}`;
    }
}

export class CompanyContact extends Contact {
    public constructor(name: string, email: string, private readonly catchPhrase: string) {
        super(name, email);
    }

    public getContactCard(): string {
        return `${this.formatHeader()}\nSlogan: "${this.catchPhrase}"`;
    }
}
