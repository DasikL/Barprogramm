package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/password")
public class PasswordController {
    @Autowired
    private PasswordService passwordService;

    @GetMapping
    public ResponseEntity<Boolean> checkPassword(@RequestBody String password) {
        return new ResponseEntity<Boolean>(passwordService.checkPassword(password), HttpStatus.OK);
    }
}
