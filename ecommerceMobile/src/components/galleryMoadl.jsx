import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {moderateScale} from '../utility/scale';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DefaultColors, FontSize} from '../styles';

const GalleryModel = ({visible, setVisible, OnCamera, OnGallery}) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      deviceWidth={1}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#000000aa',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(!visible);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: DefaultColors.white,
            width: '100%',
            padding: moderateScale(40),
            borderTopEndRadius: moderateScale(16),
            borderTopLeftRadius: moderateScale(16),
          }}>
          <TouchableOpacity onPress={OnGallery}>
            <Icon
              name="image-multiple"
              size={moderateScale(48)}
              style={styles.icon}
              color={DefaultColors.primary}
            />
            <Text style={styles.text}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={OnCamera}>
            <Icon
              name="camera"
              size={moderateScale(48)}
              style={styles.icon}
              color={DefaultColors.primary}
            />
            <Text style={styles.text}>CAMERA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default GalleryModel;

const styles = StyleSheet.create({
  text: {
    fontSize: FontSize.h3,
    fontWeight: 'bold',
    color: DefaultColors.primary,
    alignSelf: 'center',
  },
  icon: {alignSelf: 'center', marginBottom: moderateScale(8)},
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
