package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/produkt")
@CrossOrigin
@RestController
public class ProduktController {

    @Autowired
    private ProduktService produktService;

    @GetMapping("/aktive")
    public ResponseEntity<List<Produkt>> getAktiveProdukte() {
        return new ResponseEntity<List<Produkt>>(produktService.getAktiveProdukte(), HttpStatus.OK);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Integer>> getProduktIds() {
        return new ResponseEntity<List<Integer>>(produktService.getProduktIds(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Produkt> createProdukt(@RequestBody Produkt produkt) {
        return new ResponseEntity<Produkt>(produktService.createProdukt(produkt), HttpStatus.CREATED);
    }

    @PutMapping("/bestand/{produktId}")
    public ResponseEntity<Integer> changeBestand(@PathVariable int produktId, @RequestBody int bestand) {
        return new ResponseEntity<Integer>(produktService.changeBestand(produktId, bestand), HttpStatus.OK);
    }
}
