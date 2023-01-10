import React from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
const isAndroid = Platform.OS === 'android';

const BecomeTalented = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const Z_INDEX = 0;
  const {assets, colors, sizes, gradients} = useTheme();

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: Z_INDEX}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t('becomeTalented.title')}
            </Text>
          </Image>
        </Block>
        {/* login form */}
        <Block
          keyboard
          behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Block paddingHorizontal={sizes.sm}>
                <Text h5 bold marginBottom={sizes.s}>
                  1. {t('becomeTalented.terms.introduction')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.introductionText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  2. {t('becomeTalented.terms.intellectualPropertyRights')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.intellectualPropertyRightsText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  3. {t('becomeTalented.terms.licenseToUseApplication')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.licenseToUseApplicationText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  4. {t('becomeTalented.terms.acceptableUse')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.acceptableUseText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  5. {t('becomeTalented.terms.userContent')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.userContentText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  6. {t('becomeTalented.terms.indemnity')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.indemnityText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  7.{' '}
                  {t('becomeTalented.terms.breachesOfTheseTermsAndConditions')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t(
                    'becomeTalented.terms.breachesOfTheseTermsAndConditionsText',
                  )}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  8. {t('becomeTalented.terms.variation')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.variationText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  9. {t('becomeTalented.terms.ourService')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.ourServiceText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  10. {t('becomeTalented.terms.eligibility')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.eligibilityText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  11. {t('becomeTalented.terms.clientObligations')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.clientObligationsText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  12. {t('becomeTalented.terms.freelancerObligations')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.freelancerObligationsText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  13. {t('becomeTalented.terms.disputeResolution')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.disputeResolutionText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  14. {t('becomeTalented.terms.termination')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.terminationText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  15. {t('becomeTalented.terms.liability')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.liabilityText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  16. {t('becomeTalented.terms.governingLaw')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.governingLawText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  17. {t('becomeTalented.terms.entireAgreement')}
                </Text>
                <Text h5 marginBottom={sizes.s} style={{textAlign: 'justify'}}>
                  {t('becomeTalented.terms.entireAgreementText')}
                </Text>
                <Text h5 bold marginBottom={sizes.s}>
                  © {t('becomeTalented.terms.ourDetailsText.companyName')}
                  {'\n'}
                  {t('becomeTalented.terms.ourDetailsText.registeredAddress')}
                </Text>
                <Text p marginBottom={sizes.s}>
                  {t('becomeTalented.terms.dateOfTerms')}
                </Text>
                <Button gradient={gradients.primary}>
                  <Text h5 white>
                    {t('becomeTalented.terms.submit')}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default BecomeTalented;
