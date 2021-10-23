const Station = {
    name: 'Station',
    primaryKey: 'id',
    properties: {
        name: 'string',
        ibnr: 'int',
        id: 'int',
        latitude: 'int?',
        longitude: 'int?',
        rilIdentifier: 'string?'
    }
}

const User = {
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
        language: 'string?'
    }
}

const Setting = {
    name: 'Setting',
    primaryKey: 'key',
    properties: {
        key: 'string',
        value: 'string',
        valueType: 'string'
    }
}

export default [User, Station, Setting]
export const schemaVersion = 7