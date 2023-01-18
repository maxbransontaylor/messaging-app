import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();

    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired() {
    try {
      const decoded = this.getDecoded();

      if (decoded.exp * 1000 < Date.now()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getDecoded() {
    const token = localStorage.getItem("id_token") || null;
    if (token) {
      return decode(token);
    }
    return { exp: 0 };
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }
}

export default new AuthService();
