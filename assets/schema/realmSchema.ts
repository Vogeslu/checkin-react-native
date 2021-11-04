const userSchema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
        id: 'int',
        data: 'string'
    },
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

export default [userSchema, Setting.schema]
export const schemaVersion = 5
