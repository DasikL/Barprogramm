package amk.Barprogramm.Controller;

import amk.Barprogramm.Services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/password")
public class PasswordController {
    @Autowired
    private PasswordService passwordService;

    @PostMapping
    public ResponseEntity<Boolean> checkPassword(@RequestBody String password) {
        return new ResponseEntity<Boolean>(passwordService.checkPassword(password), HttpStatus.OK);
    }
}
