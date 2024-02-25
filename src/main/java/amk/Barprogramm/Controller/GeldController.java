package amk.Barprogramm.Controller;


import amk.Barprogramm.Services.GeldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/api/v1/geld")
public class GeldController {

    @Autowired
    private GeldService geldService;

    @PostMapping
    public ResponseEntity<Double> setGeld(@RequestBody Double geld) {
        return new ResponseEntity<Double>(geldService.setGeld(geld), org.springframework.http.HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Double> getGeld() {
        return new ResponseEntity<Double>(geldService.getGeld(), org.springframework.http.HttpStatus.OK);
    }

}
