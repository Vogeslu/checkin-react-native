import { PermissionsAndroid, Platform } from 'react-native'
import GeoLocation, { requestAuthorization } from 'react-native-geolocation-service'

export async function requestLocationPermission() {
	try {
		switch (Platform.OS) {
			case 'android':
				{
					const granted = await PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
					)
					return granted === PermissionsAndroid.RESULTS.GRANTED
				}
				break
			case 'ios': {
				const result = await requestAuthorization('whenInUse')
				return result === 'granted'
			}
			default:
				return false
		}
	} catch (e) {
		return false
	}
}

export function getGeoLocation(): Promise<GeoLocation.GeoPosition> {
	return new Promise(async (resolve, reject) => {
		if (await requestLocationPermission()) {
			GeoLocation.getCurrentPosition(
				(position) => {
					resolve(position)
				},
				(error) => {
					reject(error)
				},
				{
					enableHighAccuracy: true,
					timeout: 15000,
					maximumAge: 10000,
				}
			)
		}
	})
}
