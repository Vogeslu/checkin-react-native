export class Station {
	public static schema: Realm.ObjectSchema = {
		name: 'Station',
		primaryKey: 'id',
		properties: {
			id: 'int',
			name: 'string',
			ibnr: 'int',
			latitude: 'int?',
			longitude: 'int?',
			rilIdentifier: 'string?',
		},
	}

	public id: number
	public name: string
	public ibnr: number
	public latitude?: number | null
	public longitude?: number | null
	public rilIdentifier?: string | null

    constructor(id: number, name: string, ibnr: number) {
        this.id = id
        this.name = name
        this.ibnr = ibnr
    }
}

export class User {
	public static schema: Realm.ObjectSchema = {
        name: 'User',
        primaryKey: 'id',
        properties: {
            id: 'int',
            displayName: 'string',
            username: 'string',
            trainDistance: 'int',
            trainDuration: 'int',
            trainSpeed: 'int',
            points: 'int',
            twitterUrl: 'string?',
            mastodonUrl: 'string?',
            privateProfile: 'bool',
            role: 'int',
            home: 'Station?',
            private: 'bool',
            preventIndex: 'bool?',
            dbl: 'int',
            language: 'string?',
        },
	}

	public id: number
    public displayName: string
    public username: string
    public trainDistance: number = 0
    public trainDuration: number = 0
    public trainSpeed: number = 0
    public points: number = 0
    public twitterUrl?: string | null
    public mastodonUrl?: string | null
    public privateProfile: boolean = false
    public userInvisibleToMe?: boolean = false
    public home?: Station | null
    public muted?: boolean | null
    public following?: boolean | null
    public followPending?: boolean | null
    public preventIndex?: boolean | null

    constructor(id: number, displayName: string, username: string) {
        this.id = id
        this.displayName = displayName
        this.username = username
    }
}

export class Setting {
	public static schema: Realm.ObjectSchema = {
        name: 'Setting',
        primaryKey: 'key',
        properties: {
            key: 'string',
            value: 'string',
            valueType: 'string',
        },
	}

	public key: string
	public value: any
	public valueType: string

    constructor(key: string, value: string, valueType: string) {
        this.key = key
        this.value = value
        this.valueType = valueType
    }

    public static getValue<T>(setting: Setting): T {
        let output = setting.value;

        switch(setting.valueType) {
            case "number": output = parseInt(setting.value); break;
            case "object": case "array": output = JSON.parse(setting.value); break;
            case "boolean": output = setting.value === 'true' || setting.value === '1'; break;
        }

        return output as T;
    }

    public static resetValue(value: any, valueType: string): string {
        switch(valueType) {
            case "number": case "boolean": return value.toString(); break;
            case "object": case "array": return JSON.parse(value); break;
        }

        return value as string;
    }
}

export default [User.schema, Station.schema, Setting.schema]
export const schemaVersion = 1
