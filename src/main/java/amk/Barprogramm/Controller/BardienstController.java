package amk.Barprogramm.Controller;

import amk.Barprogramm.Documents.Bardienst;
import amk.Barprogramm.Services.BardienstService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/bardienst")
public class BardienstController {

    @Autowired
    private BardienstService bardienstService;

    @CrossOrigin
    @GetMapping("/alle")
    public ResponseEntity<List<Bardienst>> getAlleBardienste() {
        return new ResponseEntity<List<Bardienst>>(bardienstService.getAlleBardienste(), HttpStatus.OK);
    }

    @GetMapping("/month")
    public ResponseEntity<List<Bardienst>> getLastMonth(@RequestParam Integer month, @RequestParam Integer year) {
        return new ResponseEntity<List<Bardienst>>(bardienstService.getSpecificMonth(month, year), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Bardienst> createBardienst(@RequestBody Bardienst bardienst) {
        return new ResponseEntity<Bardienst>(bardienstService.createBardienst(bardienst), HttpStatus.CREATED);
    }

    @GetMapping("/{zimmer}")
    public ResponseEntity<Optional<List<Bardienst>>> getBardienstById(@PathVariable String zimmer) {
        return new ResponseEntity<Optional<List<Bardienst>>>(bardienstService.getBardiensteByZimmer(zimmer), HttpStatus.OK);
    }
}
