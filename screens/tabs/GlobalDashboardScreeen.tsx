import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import Status from '../../components/status';
import { dashboardGlobal } from '../../lib/traewelling/categories/extra';
import { DashboardResponse } from '../../lib/traewelling/types/responseTypes';
import { useApp } from '../../provider/appProvider';
import { token } from '../../temp';

export default function GlobalDashboardScreen() {
	const { theme, colors } = useApp()

    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
    const navigation = useNavigation()

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        const response = await dashboardGlobal(token)
        setDashboard(response)
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.baseBackground }}>
            { dashboard && dashboard.data.map((item, index) => (
                <Status key={item.id} status={ item } onPress={ () => navigation.navigate('StatusDetail', { status: item }) } />
            )) }
        </ScrollView>
    )
}