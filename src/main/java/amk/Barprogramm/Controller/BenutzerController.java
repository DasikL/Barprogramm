package amk.Barprogramm.Controller;

import amk.Barprogramm.Documents.Benutzer;
import amk.Barprogramm.Services.BenutzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("/update/{zimmer}/{name}/{alteNummer}")
    public ResponseEntity<Benutzer> updateBenutzer(@PathVariable String zimmer, @PathVariable String name, @PathVariable String alteNummer) {
        return new ResponseEntity<Benutzer>(benutzerService.updateBenutzer(zimmer, name, alteNummer), HttpStatus.OK);
    }

    @DeleteMapping("/{zimmer}/{name}")
    public ResponseEntity<Benutzer> deleteBenutzer(@PathVariable String zimmer, @PathVariable String name) {
        return new ResponseEntity<Benutzer>(benutzerService.deleteBenutzer(zimmer, name), HttpStatus.OK);
    }
}
