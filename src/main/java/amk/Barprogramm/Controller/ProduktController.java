package amk.Barprogramm.Controller;

import amk.Barprogramm.Documents.Produkt;
import amk.Barprogramm.Services.ProduktService;
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

    @GetMapping("/{produktId}")
    public ResponseEntity<Produkt> getProduktById(@PathVariable int produktId) {
        return new ResponseEntity<Produkt>(produktService.getProduktById(produktId), HttpStatus.OK);
    }

    @DeleteMapping("/{produktId}")
    public ResponseEntity<Produkt> deleteProdukt(@PathVariable int produktId) {
        return new ResponseEntity<Produkt>(produktService.deleteProdukt(produktId), HttpStatus.OK);
    }

    @PutMapping("/change")
    public ResponseEntity<Produkt> changeProdukt(@RequestBody Produkt produkt) {
        return new ResponseEntity<Produkt>(produktService.changeProdukt(produkt), HttpStatus.OK);
    }
}
