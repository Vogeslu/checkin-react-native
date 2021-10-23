import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import Status from '../../components/status';
import { dashboardGlobal } from '../../lib/traewelling/categories/extra';
import { Status as StatusType } from '../../lib/traewelling/types/extraTypes';
import { DashboardResponse } from '../../lib/traewelling/types/responseTypes';
import { useApp } from '../../provider/appProvider';

export default function GlobalDashboardScreen() {
	const { theme, colors, token } = useApp()

	const [refreshing, setRefreshing] = useState(false)
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)

    const navigation = useNavigation()

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            const response = await dashboardGlobal(token!)
            setDashboard(response)
        } catch(e) {
            console.log(e)
        }
    }

	const onRefresh = useCallback(async () => {
		setRefreshing(true)

        await loadDashboard()

		setRefreshing(false)
	}, [])

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
        />
    )
}