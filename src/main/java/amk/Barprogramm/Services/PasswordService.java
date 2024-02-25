package amk.Barprogramm.Services;

import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    public boolean checkPassword(String password) {
        return password.equals("obk1963");
    }
}
