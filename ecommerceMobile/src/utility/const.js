import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export const handleGallery = async () => {
  const options = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        resolve(null);
      } else if (response.error) {
        reject(response.error);
      } else {
        const responsedData = response?.assets?.[0];
        const fileSizeLimit = 1 * 1024 * 1000;
        if (responsedData?.fileSize > fileSizeLimit) {
          Alert.alert('File size exceeds 1MB. Please select a smaller file.'),
            reject(
              new Error('File size exceeds 1MB. Please select a smaller file.'),
            );
        } else {
          const base64DataURI =
            responsedData?.base64 && responsedData?.type
              ? `data:${responsedData.type};base64,${responsedData.base64}`
              : responsedData?.base64;

          const data = {
            uri: responsedData?.uri,
            base64: base64DataURI,
            type: responsedData?.type,
            name: responsedData?.fileName,
            size: responsedData?.fileSize,
            height: responsedData?.height,
            width: responsedData?.width,
          };
          resolve(data);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const handleCamera = async () => {
  const options = {
    mediaType: 'photo',
    quality: 0.5,
    includeBase64: true,
  };

  return new Promise(async (resolve, reject) => {
    try {
      const response = await launchCamera(options);

      if (response.didCancel) {
        resolve(null);
      } else if (response.error) {
        reject(response.error);
      } else {
        const responsedData = response?.assets?.[0];
        const fileSizeLimit = 1 * 1024 * 1024;
        if (responsedData?.fileSize > fileSizeLimit) {
          Alert.alert('File size exceeds 1MB. Please select a smaller file.'),
            reject(
              new Error('File size exceeds 1MB. Please select a smaller file.'),
            );
        } else {
          const base64DataURI =
            responsedData?.base64 && responsedData?.type
              ? `data:${responsedData.type};base64,${responsedData.base64}`
              : responsedData?.base64;

          const data = {
            uri: responsedData?.uri,
            base64: base64DataURI,
            type: responsedData?.type,
            name: responsedData?.fileName,
            size: responsedData?.fileSize,
            height: responsedData?.height,
            width: responsedData?.width,
          };
          resolve(data);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
