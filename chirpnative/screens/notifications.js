import React from 'react'
import {SafeAreaView,ScrollView} from 'react-native'
import Header from '../components/header'
import { NotificationData } from '../mockdata/notifications'
import Notifications from '../components/notifications'

const AppNotifications = () => {
  return (
    <SafeAreaView>
    <Header title={'Notifications'}/>
      <ScrollView>
      <Notifications data={NotificationData}/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AppNotifications