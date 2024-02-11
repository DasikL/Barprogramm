package amk.Barprogramm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BarprogrammApplication {

    public static void main(String[] args) {
        SpringApplication.run(BarprogrammApplication.class, args);
    }

    @GetMapping("/")
    public String apiRoot() {
        return "<h1>Barprogramm API</h1> " +
                "<p>API for the bar program of the AMK</p>" +
                "<p>Endpoints:</p>" +
                " <ul> <li>/api/v1/bardienst/alle</li>" +
                " <li>/api/v1/bardienst/create</li>" +
                " <li>/api/v1/bardienst/{zimmer}</li>" +
                " <li>/api/v1/benutzer/create</li> </ul>";
    }
}
