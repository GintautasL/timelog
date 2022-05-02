const BASE_URL = `https://quiet-malabi-b14b26.netlify.app/`

export const urls = {
  login: `${BASE_URL}/login`,
  getMyActivities: `${BASE_URL}/user/activities`,
  register: `${BASE_URL}/users`,
  logout: `${BASE_URL}/logout`,
  myProfile: `${BASE_URL}/user`,
  editMyProfile: `${BASE_URL}/user`,
  userGetSingleActivity: `${BASE_URL}/activity/:id`,
  createActivity: `${BASE_URL}/activity`,

  getUsers: `${BASE_URL}/users`,
  getUser: `${BASE_URL}/users/:id`,
  getUsersActivities: `${BASE_URL}/users/:id/activities`,
  getUsersStatistics: `${BASE_URL}/users/:id/statistics`,
  adminGetSingleActivity: `${BASE_URL}/activities/:id`,
  adminConfirmActivity: `${BASE_URL}/activities/:id/confirm`,
}
