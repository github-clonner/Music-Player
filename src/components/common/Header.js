import React from 'react';
import { Text, View, StatusBar, StyleSheet } from 'react-native';
import { BackIconNav, SearchIconNav } from './';
import { COLORS } from '../../styles/colors';

const Header = (props) => {
    const { 
        left = <BackIconNav />,
        mid = null,
        right = <SearchIconNav />,
        title,
        titleStyle,
        viewStyle
    } = props;

    const main = mid !== null ? mid
        : (<Text style={[styles.title, titleStyle]}>{title}</Text>);

    return (
        <View style={[styles.view, viewStyle]}>
            <StatusBar animated translucent backgroundColor={COLORS.darkPrimary} />
            {left}
            {main}
            <View style={styles.right}>
                {right}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    right: {
        position: 'absolute',
        right: 0,
        width: 55,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    title: {
        color: COLORS.textIcons,
        fontSize: 19,
        fontWeight: 'bold'
    },
    view: {
        alignItems: 'center',
        elevation: 4,
        flexDirection: 'row',
        height: 55,
        marginTop: StatusBar.currentHeight,
        backgroundColor: COLORS.primary,
        
    },
});

export { Header };
