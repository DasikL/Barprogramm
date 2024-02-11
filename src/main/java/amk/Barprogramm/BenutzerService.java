package amk.Barprogramm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class BenutzerService {

    @Autowired
    private BenutzerRepository benutzerRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Benutzer createBenutzer(Benutzer benutzer) {
        return benutzerRepository.insert(benutzer);
    }

}
