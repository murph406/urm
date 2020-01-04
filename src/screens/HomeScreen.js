import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import TabBar from '../ui-elements/tab-bar';
import TextBoxFeature from '../components/text-box-feature';

import { BACKGROUND_GREY } from '../theme/colors';


class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      screens: [
        { title: 'Announcements', screenToSend: 'announcements', feature: '0', featureLabel: 'Alerts', subtitle: 'On the go news' },
        { title: 'New Items', screenToSend: 'newList', feature: '0', featureLabel: 'Items', subtitle: 'New to catologue' },
      ],
    }
  }

  componentDidMount() {
  }


  navigate = (screen) => () => {
    this.props.navigation.navigate(screen);
  }

  render() {

    let { screens } = this.state

    return (
      <View style={styles.container} >
        <TabBar text="Home" hasBackButton={false} />

        <FlatList
          style={{ paddingTop: 16 }}
          data={screens}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View>
              <TextBoxFeature
                data={item}
                title={item.title}
                subtitle={item.subtitle}
                featureText={item.feature}
                featureLabel={item.featureLabel}
                onPress={this.navigate(item.screenToSend)}
              />
            </View>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_GREY,
  },
})

export default HomeScreen;
