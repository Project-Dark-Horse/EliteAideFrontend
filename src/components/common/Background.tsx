import React, { ReactNode } from 'react';
import { View } from 'react-native';
import RadialGradient from 'react-native-radial-gradient';
import { BlurView } from '@react-native-community/blur';
import tw from 'twrnc';

interface BackgroundProps {
    children: ReactNode;
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
    return (
        <View style={tw`flex-1`}>
            <RadialGradient
                style={tw`absolute inset-0`}
                colors={['#4956C7', '#111111', '#111111']}
                center={[330, 90]}
                radius={350} />
            <BlurView
                style={tw`absolute inset-1`}
                blurType="thickMaterialDark"
                blurAmount={100}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.3)" />
            {children}
        </View>
    );
};

export default Background;
