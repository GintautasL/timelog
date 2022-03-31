const BASE_URL = `http://localhost:8080`

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
}
