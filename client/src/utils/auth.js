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
      if (decoded.exp < Date.now()) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getDecoded() {
    return decode(localStorage.getItem("id_token"));
  }

  login(idToken) {
    localStorage.setItem("id_token", idToken);
  }

  logout() {
    localStorage.removeItem("id_token");
  }
}

export default new AuthService();
