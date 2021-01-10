import * as Google from 'expo-google-app-auth';

export const googleLogIn = async () => {
  try {
    const {type, accessToken, user} = await Google.logInAsync({
      androidStandaloneAppClientId:
        '751416532737-lfq87f6uv639hqueufs22jbq85fdppjj.apps.googleusercontent.com',
      androidClientId:
        '751416532737-neh8l29ha2k6o3n0n0rh9pp9j1f2gvvb.apps.googleusercontent.com',
      clientId:
        '751416532737-lfq87f6uv639hqueufs22jbq85fdppjj.apps.googleusercontent.com',
    });
    if (type === 'success') {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {Authorization: `Bearer ${accessToken}`},
        },
      );
      console.log('Complete google resp; ', user, userInfoResponse);
      const {name, photoUrl, id, email} = user;
      const {
        headers: {
          map: {expires},
        },
      } = userInfoResponse;
      const obj = {
        user: {
          name: name,
          email: email,
          id: id,
          photo: {
            url: photoUrl,
          },
          token: accessToken,
          expires: expires,
        },
      };
      return obj;
    }
    return null;
  } catch (error) {
    return null;
  }
};
