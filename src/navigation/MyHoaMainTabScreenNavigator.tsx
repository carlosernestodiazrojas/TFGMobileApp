import ProfilesTabScreen from '@/screens/user-profile/ProfilesTabScreen';
import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonZonesTabScreen from '../screens/common-zones/CommonZonesTabScreen';
import SpecialAssessmentsTabScreen from '../screens/special-assessments/SpecialAssessmentsTabScreen';
import { colors, globalStyles, tabStyles } from '../styles';

type TabType = 'assessments' | 'commonZones' | 'profiles';

interface Tab {
    id: TabType;
    title: string;
    component: React.ComponentType;
}

const tabs: Tab[] = [
    { id: 'assessments', title: 'Derramas', component: SpecialAssessmentsTabScreen },
    { id: 'commonZones', title: 'Zonas Comunes', component: CommonZonesTabScreen },
    { id: 'profiles', title: 'Autoridad', component: ProfilesTabScreen },
];

export default function MyHoaMainTabsScreen() {
    const [activeTab, setActiveTab] = useState<TabType>('assessments');

    const renderActiveComponent = () => {
        const activeTabData = tabs.find(tab => tab.id === activeTab);
        if (activeTabData) {
            const Component = activeTabData.component;
            return <Component />;
        }
        return null;
    };

    return (
        <SafeAreaView style={globalStyles.container}>

            <View style={[globalStyles.paddingHorizontal, globalStyles.paddingVertical, globalStyles.borderBottom, { backgroundColor: colors.white }]}>
                <Text style={globalStyles.headerTitle}>Comunidad</Text>
            </View>

            <View style={tabStyles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[
                            tabStyles.tab,
                            activeTab === tab.id && tabStyles.activeTab
                        ]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <Text style={[
                            tabStyles.tabText,
                            activeTab === tab.id && tabStyles.activeTabText
                        ]}>
                            {tab.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={globalStyles.flex1}>
                {renderActiveComponent()}
            </View>
        </SafeAreaView>
    );
}

