import axios from "axios";
import { setLoggedUser } from "../redux/actions";
import store from "../redux/store";
async function logoutUser() {
  const accessToken = localStorage.getItem("accessToken");
  const response = await axios.put(
    `/enter/logout`,
    { accessToken },
    {
      withCredentials: true,
    }
  );
  localStorage.removeItem("accessToken");
  await store.dispatch(setLoggedUser({}));
  console.log(response.data.status);
}

export default logoutUser;
