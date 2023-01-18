import axios from "axios";
import { setLoggedUser } from "../redux/actions";
import store from "../redux/store";
async function logoutUser() {
  const user_id = store.getState().loggedUser.user_id;
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.put(
    `/enter/logout`,
    { user_id },
    {
      withCredentials: true,
    }
  );
  if (accessToken) localStorage.removeItem("accessToken");
  await store.dispatch(setLoggedUser({}));

  return response;
}

export default logoutUser;
