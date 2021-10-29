import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, FlatList, RefreshControl, ScrollView, View } from 'react-native'
import MapView from 'react-native-maps';
import Status from '../../components/status';
import { dashboardGlobal } from '../../lib/traewelling/categories/extra';
import { getPolyline } from '../../lib/traewelling/categories/status';
import { Polyline, Status as StatusType } from '../../lib/traewelling/types/extraTypes';
import { DashboardResponse, PolylineResponse } from '../../lib/traewelling/types/responseTypes';
import { useApp } from '../../provider/appProvider';

export default function OnTheWayScreen() {
	const { theme, colors, token, mapStyles } = useApp()

	const { width, height } = Dimensions.get('window')
	const [refreshing, setRefreshing] = useState(false)
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)

    const [polylines, setPolylines] = useState<{ [key: string]: Polyline[] } | null>(null)

    const navigation = useNavigation()

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const response = await dashboardGlobal(token!)
            setDashboard(response)

            const statusIds: number[] = []

            response.data.forEach((status) => statusIds.push(status.id))

            const polylinesResponse = await getPolyline(token!, statusIds)
            console.log(polylinesResponse)
        } catch(e) {
            console.log(e)
        }
    }

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

        await loadDashboard()

		setRefreshing(false)
	}, [])

    const { centerLatitude, centerLongitude } = useMemo<{ centerLatitude: number; centerLongitude: number }>(() => {
		if (!polylines) return { centerLatitude: 0, centerLongitude: 0 }
		
        const keys = Object.keys(polylines);

        if(keys.length === 0 || (keys.length === 1 && polylines[keys[0]].length === 0)) return { centerLatitude: 0, centerLongitude: 0 }
        if (keys.length === 1 && polylines[keys[0]].length === 1) return { centerLatitude: polylines[keys[0]][0][0], centerLongitude: polylines[keys[0]][0][1] }

		let x = 0
		let y = 0
		let z = 0

        let total = 0;

        for(const polyline of Object.values(polylines))
            for (const [_latitude, _longitude] of polyline) {
                const latitude = (_latitude * Math.PI) / 180
                const longitude = (_longitude * Math.PI) / 180

                x += Math.cos(latitude) * Math.cos(longitude)
                y += Math.cos(latitude) * Math.sin(longitude)
                z += Math.sin(latitude)

                total++;
            }

		x = x / total
		y = y / total
		z = z / total

		const centralLongitude = Math.atan2(y, x)
		const centralSquareRoot = Math.sqrt(x * x + y * y)
		const centralLatitude = Math.atan2(z, centralSquareRoot)

		return {
			centerLatitude: (centralLatitude * 180) / Math.PI,
			centerLongitude: (centralLongitude * 180) / Math.PI,
		}
	}, [polylines])

	const { longitudeDelta, latitudeDelta } = useMemo<{ longitudeDelta: number; latitudeDelta: number }>(() => {
		let minX: number, maxX: number, minY: number, maxY: number

		if (polylines && Object.keys(polylines).length > 0 && polylines[Object.keys(polylines)[0]].length > 0) {
			;((point) => {
				minX = point[0]
				maxX = point[0]
				minY = point[1]
				maxY = point[1]
			})(polylines[Object.keys(polylines)[0]][0])

            for(const polyline of Object.values(polylines))
                polyline.map(([latitude, longitude]) => {
                    minX = Math.min(minX, latitude)
                    maxX = Math.max(maxX, latitude)
                    minY = Math.min(minY, longitude)
                    maxY = Math.max(maxY, longitude)
                })

			const deltaX = maxX - minX
			const deltaY = maxY - minY

			return {
				longitudeDelta: deltaX,
				latitudeDelta: (deltaY * height) / width,
			}
		}

		return {
			longitudeDelta: 0,
			latitudeDelta: 0,
		}
	}, [polylines, height, width])

    const renderStatusItem = ({item}: {item: StatusType}) => (
        <Status status={ item } onPress={ () => navigation.navigate('StatusDetail', { status: item }) } />
    )

    return (
        <FlatList 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={{ flex: 1, backgroundColor: colors.baseBackground }}
            data={ dashboard?.data ?? [] }
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderStatusItem}
            ListHeaderComponent={
                <>
                    {polylines ? (
                        <MapView
                            customMapStyle={mapStyles}
                            region={{
                                latitude: centerLatitude,
                                longitude: centerLongitude,
                                latitudeDelta: latitudeDelta,
                                longitudeDelta: longitudeDelta,
                            }}
                            style={{ height: 200 }}>
                        </MapView>
                    ) : (
                        <View style={{ height: 200 }} />
                    )}
                </>
            }
        />
    )
}