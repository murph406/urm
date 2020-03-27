import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Fonts, DeviceWidth, isScreenLarge } from '../theme/styling';
import { SECONDARY, BACKGROUND_LIGHT_GREY, BACKGROUND_GREY } from '../theme/colors';

const numberOfColumns = (isScreenLarge) ? 3 : 2

export function TabBar(props) {
  const { style, tabs, goToPage, activeTab } = props
  return (
    <View style={[styles.tabContainer, style, goToPage]}>
      {tabs.map((tabName, i) => {

        let isActive = activeTab === i

        onPressTab = () => {
          goToPage(i)
        }

        return <TouchableOpacity
          key={tabName}
          activeOpacity={1}
          onPress={onPressTab}
          style={[styles.tab, { borderBottomWidth: (isActive) ? 4 : 0, borderBottomColor: SECONDARY }]}>
          <Text style={[Fonts.headline, { color: (isActive) ? SECONDARY : BACKGROUND_LIGHT_GREY }]}>{tabName}</Text>
        </TouchableOpacity>
      })}
    </View>
  )

}

export function TabRoute(props) {

  const { data, filterButtonOnPress } = props

  onFilterButtonPress = (item) => {
    filterButtonOnPress(item)
  }

  return (
    <View style={{ flex: 1, paddingBottom: 120, }}>
      <FlatList
        style={{ paddingTop: 64, flex: 1, }}
        data={data}
        ListFooterComponent={() => <View style={{ flex: 1, height: 80 }} />}
        numColumns={numberOfColumns}
        keyExtractor={item => item}
        renderItem={({ item, index }) => {
          let text = item
          { (text === 'dairies') ? text = 'dairy' : null }
          { (text === 'bakeries') ? text = 'Baked Goods' : null }
          { (text === 'meatdelis') ? text = 'Deli Meats' : null }
          { (text === 'meatfrozens') ? text = 'Frozen Meats' : null }
          { (text === 'groceryfrozens') ? text = 'Frozen Grocery' : null }
          { (text === 'grocerydelis') ? text = 'Frozen Deli' : null }
          
          return (
            <FilterButton
              data={text}
              onPress={(isSelected) => onFilterButtonPress({ isSelected: isSelected, item: item })} />
          )
        }} />
    </View>
  )
}

export function FilterButton(props) {
  const { data, onPress } = props
  const [isButtonSelected, toggleButton] = useState(false);

  function toggleActiveButton() {
    toggleButton(!isButtonSelected)
    onPress(!isButtonSelected)
  }

  return (
    <TouchableOpacity
      onPress={toggleActiveButton}
      activeOpacity={.7}
      style={[styles.filterButton, { backgroundColor: (isButtonSelected) ? SECONDARY : BACKGROUND_GREY }]}>
      <Text style={[Fonts.subHeadingWhite, { color: (isButtonSelected) ? 'white' : BACKGROUND_LIGHT_GREY, alignSelf: 'center', textTransform: 'capitalize' }]}>{data}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  tabContainer: {
    height: 60,
    flexDirection: 'row',
    paddingTop: 5,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  filterButton: {
    // width: (DeviceWidth - ((numberOfColumns + 2) * 32)) / numberOfColumns,
    flex: 1,
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 4,
    margin: 16,
    borderRadius: 100,
    justifyContent: 'center',
  },
});

