package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/benutzer")
public class BenutzerController {
    @Autowired
    BenutzerService benutzerService;

    @PostMapping("/create")
    public ResponseEntity<Benutzer> createBenutzer(@RequestBody Benutzer benutzer) {
        return new ResponseEntity<Benutzer>(benutzerService.createBenutzer(benutzer), HttpStatus.CREATED);
    }
}
