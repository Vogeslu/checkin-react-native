import { Setting } from "../assets/schema/realmSchema";
import { Theme } from "../assets/styles/stylesBase"

export type Settings = {
    theme: string
    token?: string | null
    userId?: number | null
    userLastUpdated?: number | null
}

export const defaultSettings: Settings = {
    theme: 'dark'
}

export function loadSettings(realm: Realm): Settings {
    const loadedSettings = realm.objects<Setting>(Setting.schema.name)
    const settings = { ...defaultSettings }

    for(const setting of loadedSettings) {
        switch(setting.key) {
            case 'theme': settings.theme = Setting.getValue<string>(setting); break
            case 'token': settings.token = Setting.getValue<string>(setting); break
            case 'user-id': settings.userId = Setting.getValue<number>(setting); break
            case 'user-last-updated': settings.userLastUpdated = Setting.getValue<number>(setting); break
        }
    }

    console.log(`[Settings] Loaded ${ loadedSettings.length } settings from database`, loadedSettings.map(v => v.key))
    
    return settings
}

export function saveSettings(settings: Settings, realm: Realm) {
    let settingsSaved = 0
    let settingsDeleted = 0

    realm.write(() => {
        for(const [key,value] of Object.entries(settings)) {
            let setting: Setting | null = null
            let databaseKey: string | null = null

            switch(key) {
                case 'theme': databaseKey = 'theme'; if(value != null) setting = new Setting('theme', Setting.resetValue(value, 'string'), 'string'); break
                case 'token': databaseKey = 'token'; if(value != null) setting = new Setting('token', Setting.resetValue(value, 'string'), 'string'); break
                case 'userId': databaseKey = 'user-id'; if(value != null) setting = new Setting('user-id', Setting.resetValue(value, 'number'), 'number'); break
                case 'userLastUpdated': databaseKey = 'user-last-updated'; if(value != null) setting = new Setting('user-last-updated', Setting.resetValue(value, 'number'), 'number'); break
            }

            if(value == null && databaseKey) {
                const toDelete = realm.objectForPrimaryKey('Setting', databaseKey)
                if(toDelete) {
                    realm.delete(toDelete)
                    settingsDeleted++
                } 
            }

            if(setting != null) {
                realm.create('Setting', setting, 'modified')
                settingsSaved++
            }
        }
    })

    console.log(`[Settings] Saved ${settingsSaved} settings in database and deleted ${settingsDeleted}`)
}