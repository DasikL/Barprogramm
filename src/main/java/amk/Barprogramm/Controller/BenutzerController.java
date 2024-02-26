package amk.Barprogramm.Controller;

import amk.Barprogramm.Documents.Benutzer;
import amk.Barprogramm.Services.BenutzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/benutzer")
public class BenutzerController {
    @Autowired
    BenutzerService benutzerService;

    @PostMapping("/create")
    public ResponseEntity<Benutzer> createBenutzer(@RequestBody Benutzer benutzer) {
        return new ResponseEntity<Benutzer>(benutzerService.createBenutzer(benutzer), HttpStatus.CREATED);
    }

    @GetMapping("/check/{zimmer}/{name}")
    public ResponseEntity<Boolean> checkBenutzer(@PathVariable String zimmer, @PathVariable String name) {
        return new ResponseEntity<Boolean>(benutzerService.checkBenutzer(zimmer, name), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Benutzer>> getAlleBenutzer() {
        return new ResponseEntity<List<Benutzer>>(benutzerService.getAlleBenutzer(), HttpStatus.OK);
    }
}
