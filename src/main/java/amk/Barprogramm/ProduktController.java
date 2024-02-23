package amk.Barprogramm;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/v1/produkt")
@CrossOrigin
@RestController
public class ProduktController {

    @Autowired
    private ProduktService produktService;

    @GetMapping
    public ResponseEntity<List<Produkt>> getAlleProdukte() {
        return new ResponseEntity<List<Produkt>>(produktService.getAlleProdukte(), HttpStatus.OK);
    }

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

    @PutMapping("/aktiv/{produktId}")
    public ResponseEntity<Boolean> changeAktiv(@PathVariable int produktId, @RequestBody boolean aktiv) {
        return new ResponseEntity<Boolean>(produktService.changeAktiv(produktId, aktiv), HttpStatus.OK);
    }

    @PutMapping("/preis/{produktId}")
    public ResponseEntity<Float> changePreis(@PathVariable int produktId, @RequestBody float preis) {
        return new ResponseEntity<Float>(produktService.changePreis(produktId, preis), HttpStatus.OK);
    }

    @PutMapping("/bild/{produktId}")
    public ResponseEntity<String> changeBild(@PathVariable int produktId, @RequestBody String pfad){
        return new ResponseEntity<String>(produktService.changeBild(produktId, pfad), HttpStatus.OK);
    }

    @PutMapping("/change")
    public ResponseEntity<Produkt> changeProdukt(@RequestBody Produkt produkt) {
        return new ResponseEntity<Produkt>(produktService.changeProdukt(produkt), HttpStatus.OK);
    }
}
