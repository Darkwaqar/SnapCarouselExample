import React, {Component, useRef, useState} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
  ListRenderItem,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles, {colors} from './styles/index.style';
import {ENTRIES1, ENTRIES2} from './static/entries';
import {scrollInterpolators, animatedStyles} from './utils/animations';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

export const example = () => {
  const [slider1ActiveSlide, setSlider1ActiveSlide] =
    useState(SLIDER_1_FIRST_ITEM);
  const _slider1Ref = React.useRef(null);

  const _renderItem = ({item, index}) => {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  };

  const _renderItemWithParallax = ({item, index}, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  };

  const _renderLightItem = ({item, index}) => {
    return <SliderEntry data={item} even={false} />;
  };

  const _renderDarkItem = ({item, index}) => {
    return <SliderEntry data={item} even={true} />;
  };

  const mainExample = (number, title) => {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          ref={_slider1Ref}
          data={ENTRIES1}
          renderItem={_renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => setSlider1ActiveSlide(index)}
        />
        <Pagination
          dotsLength={ENTRIES1.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={_slider1Ref.current}
          tappableDots={!!_slider1Ref.current}
        />
      </View>
    );
  };

  const momentumExample = (number, title) => {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.title}>{`Example ${number}`}</Text>
        <Text style={styles.subtitle}>{title}</Text>
        <Carousel
          data={ENTRIES2}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          activeSlideAlignment={'start'}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          activeAnimationType={'spring'}
          activeAnimationOptions={{
            friction: 4,
            tension: 40,
          }}
        />
      </View>
    );
  };

  const layoutExample = (number, title, type) => {
    const isTinder = type === 'tinder';
    return (
      <View
        style={[
          styles.exampleContainer,
          isTinder ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}>
        <Text
          style={[
            styles.title,
            isTinder ? {} : styles.titleDark,
          ]}>{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isTinder ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isTinder ? ENTRIES2 : ENTRIES1}
          renderItem={isTinder ? _renderLightItem : _renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={type}
          loop={true}
        />
      </View>
    );
  };

  const customExample = (
    number: number,
    title:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined,
    refNumber: number,
    renderItemFunc: ListRenderItem<{
      title: string;
      subtitle: string;
      illustration: string;
    }> &
      ((
        item: {
          item: {title: string; subtitle: string; illustration: string};
          index: number;
        },
        parallaxProps?: AdditionalParallaxProps | undefined,
      ) => React.ReactNode),
  ) => {
    const isEven = refNumber % 2 === 0;

    // Do not render examples on Android; because of the zIndex bug, they won't work as is
    return !IS_ANDROID ? (
      <View
        style={[
          styles.exampleContainer,
          isEven ? styles.exampleContainerDark : styles.exampleContainerLight,
        ]}>
        <Text
          style={[
            styles.title,
            isEven ? {} : styles.titleDark,
          ]}>{`Example ${number}`}</Text>
        <Text style={[styles.subtitle, isEven ? {} : styles.titleDark]}>
          {title}
        </Text>
        <Carousel
          data={isEven ? ENTRIES2 : ENTRIES1}
          renderItem={renderItemFunc}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          scrollInterpolator={
            scrollInterpolators[`scrollInterpolator${refNumber}`]
          }
          slideInterpolatedStyle={animatedStyles[`animatedStyles${refNumber}`]}
          useScrollView={true}
        />
      </View>
    ) : (
      false
    );
  };

  const gradient = () => {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  };

  const example1 = mainExample(
    1,
    'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots',
  );
  const example2 = momentumExample(
    2,
    'Momentum | Left-aligned | Active animation',
  );
  const example3 = layoutExample(3, '"Stack of cards" layout | Loop', 'stack');
  const example4 = layoutExample(4, '"Tinder-like" layout | Loop', 'tinder');
  const example5 = customExample(5, 'Custom animation 1', 1, _renderItem);
  const example6 = customExample(6, 'Custom animation 2', 2, _renderLightItem);
  const example7 = customExample(7, 'Custom animation 3', 3, _renderDarkItem);
  const example8 = customExample(8, 'Custom animation 4', 4, _renderLightItem);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(0, 0, 0, 0.3)'}
          barStyle={'light-content'}
        />
        {gradient()}
        <ScrollView
          style={styles.scrollview}
          scrollEventThrottle={200}
          directionalLockEnabled={true}>
          {example1}
          {example2}
          {example3}
          {example4}
          {example5}
          {example6}
          {example7}
          {example8}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default example;
